import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import toyPic from "../assets/toy.png";
import toySound from "../assets/toy-sound.mp3";

const useStyles = makeStyles((theme) => ({
    toyContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "initial",
        zIndex: "20000",
    },
}));

const Toy = () => {
    const classes = useStyles();

    const playingMessage = useRef(false);

    useEffect(() => {
        playSound();
    }, []);

    const playSound = () => {
        const sound = new Audio(toySound);

        if (!playingMessage.current) {
            sound.play();
            playingMessage.current = true;
        }
        sound.onended = () => {
            playingMessage.current = false;
        };
    };

    return (
        <div className={classes.toyContainer}>
            <img className="toy" src={toyPic} alt="Baby toy" />
        </div>
    );
};

export default Toy;
