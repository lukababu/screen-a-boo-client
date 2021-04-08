import React, { useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
    videoContainer: {
        display: "flex",
        width: "100vw",
        height: "calc(100vh - 6rem)",
        justifyContent: "flex-end",
    },
    video: {
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            width: "300px",
        },
    },
    gridContainer: {},
    paper: {
        padding: "10px",
        border: "2px solid black",
        margin: "10px",
    },
    selfVideoContainer: {
        position: "absolute",
        padding: "1rem",
    },
    guestVideo: {
        height: "100%",
        objectFit: "fill",
        width: "100%",
    },
}));

const VideoPlayer = ({ hidden }) => {
    const { callAccepted, myVideo, userVideo, callEnded, stream } = useContext(
        SocketContext
    );
    const classes = useStyles();

    return (
        <div className={classes.videoContainer}>
            {stream && (
                <Grid
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.selfVideoContainer}
                >
                    <video
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        className={classes.video}
                    />
                </Grid>
            )}
            {callAccepted && !callEnded && (
                <Grid item xs={12} md={12}>
                    <video
                        playsInline
                        ref={userVideo}
                        autoPlay
                        className={classes.guestVideo}
                    />
                </Grid>
            )}
        </div>
    );
};

export default VideoPlayer;
