import React, { useEffect, useContext } from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import { Link } from "react-router-dom";

import { SocketContext } from "./Context";
import Curtain from "./components/Curtain";
import Toy from "./components/Toy";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: "flex",
        height: "6rem",
        backgroundColor: "#5EA0FF",
        justifyContent: "space-between",
        flexDirection: "row",
        color: "#fff",
        padding: "1rem",
        fontFamily: "'Bubblegum Sans', cursive",
        [theme.breakpoints.down("xs")]: {
            width: "90%",
        },
    },
}));

const ToddlerRoom = () => {
    const classes = useStyles();

    const { setStarted, isBlackOut, isGainAttention } = useContext(
        SocketContext
    );

    useEffect(() => {
        setStarted(true);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {isBlackOut && <Curtain />}
            {isGainAttention && <Toy />}
            <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
            >
                <Link
                    to="/"
                    className={classes.homeDoorsActivateLeft}
                    style={{
                        backgroundColor: "#5EA0FF",
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
        </>
    );
};

export default ToddlerRoom;
