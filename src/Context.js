import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [started, setStarted] = useState(false);
    const [me, setMe] = useState("");
    const [callerId, setCallerId] = useState("");
    const [isBlackOut, setIsBlackOut] = useState(false);
    const [isGainAttention, setIsGainAttention] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket.on("me", (id) => setMe(id));

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        socket.on("blackOut", (data) => {
            console.log("Incoming blackout data:", data);
            setIsBlackOut(data);
        });

        socket.on("gainAttention", (data) => {
            console.log("Incoming gainAttention data:", data);
            setIsGainAttention(data);
        });
    }, []);

    useEffect(() => {
        blackOut(callerId);

        if (isGainAttention) {
            gainAttention(callerId);
        }

        return () => {
            setInterval(() => {
                setIsGainAttention(false);
            }, 5000);
        };
        // eslint-disable-next-line
    }, [isBlackOut, isGainAttention]);

    useEffect(() => {
        if (started) {
            console.log("Started!!!");

            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    setStream(currentStream);

                    myVideo.current.srcObject = currentStream;
                });
        }
    }, [started]);

    const blackOut = (id) => {
        console.log("Blockout request is: ", isBlackOut);
        socket.emit("blackOut", { targetCaller: id, isBlackOut: isBlackOut });
    };

    const gainAttention = (id) => {
        console.log("gainAttention is requested: ", isGainAttention);
        socket.emit("gainAttention", {
            targetCaller: id,
            isGainAttention: isGainAttention,
        });
    };

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on("signal", (data) => {
            setCallerId(call.from);
            socket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        setCallerId(id);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name,
            });
        });

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall,
                blackOut,
                isBlackOut,
                setIsBlackOut,
                setStarted,
                isGainAttention,
                setIsGainAttention,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
