import React, { useContext, useEffect } from "react";
import { Typography, AppBar, Container } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import ToysIcon from "@material-ui/icons/Toys";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import { Link } from "react-router-dom";

import { SocketContext } from "./Context";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: "flex",
        height: "6rem",
        backgroundColor: "#FF5E5E",
        justifyContent: "space-between",
        flexDirection: "row",
        color: "#fff",
        padding: "1rem",
        fontFamily: "'Bubblegum Sans', cursive",
        [theme.breakpoints.down("xs")]: {
            width: "90%",
        },
    },
    buttonContainer: {
        position: "absolute",
        top: "85%",
        left: "85%",
        width: "initial",
    },
    button: {
        backgroundColor: "#4CAF50",
        color: "white",
        marginLeft: "12px",
    },
    curtain: {
        backgroundColor: "#FF5E5E",
    },
}));

const AdultRoom = () => {
    const classes = useStyles();

    const {
        isBlackOut,
        setIsBlackOut,
        setStarted,
        isGainAttention,
        setIsGainAttention,
    } = useContext(SocketContext);

    useEffect(() => {
        setStarted(true);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
            >
                <Link
                    to="/"
                    className={classes.homeDoorsActivateLeft}
                    style={{
                        backgroundColor: "#FF5E5E",
                        textDecoration: "none",
                        color: "#fff",
                    }}
                >
                    <Typography
                        variant="h2"
                        align="left"
                        style={{
                            fontFamily: "'Bubblegum Sans', cursive",
                        }}
                    >
                        Screen-a-boo
                    </Typography>
                </Link>
                <Sidebar>
                    <Notifications />
                </Sidebar>
            </AppBar>
            <VideoPlayer />
            <Container className={classes.buttonContainer}>
                <ToggleButton
                    value="check"
                    selected={isBlackOut}
                    onChange={() => {
                        setIsBlackOut(!isBlackOut);
                    }}
                    className={(classes.button, classes.curtain)}
                >
                    <CallToActionIcon
                        fontSize="large"
                        style={{
                            color: "#fff",
                        }}
                    />
                </ToggleButton>
                <ToggleButton
                    value="check"
                    selected={isGainAttention}
                    onChange={() => {
                        setIsGainAttention(true);
                    }}
                    disabled={isGainAttention}
                    className={classes.button}
                >
                    <ToysIcon fontSize="large" />
                </ToggleButton>
            </Container>
        </>
    );
};

export default AdultRoom;
