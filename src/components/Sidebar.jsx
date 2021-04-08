import React, { useState, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
    },
    gridContainer: {
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
        },
    },
    container: { width: "50%" },
    margin: {},
    padding: {},
    paper: {
        padding: "10px 20px",
        border: "2px solid black",
    },
}));

const Sidebar = ({ children }) => {
    const { me, callAccepted, callEnded, leaveCall, callUser } = useContext(
        SocketContext
    );
    const [idToCall, setIdToCall] = useState("");
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off">
                <CopyToClipboard text={me} className={classes.margin}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<Assignment fontSize="large" />}
                    >
                        {me}
                    </Button>
                </CopyToClipboard>
                <TextField
                    label="ID to call"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                    fullWidth
                    style={{
                        backgroundColor: "#fff",
                    }}
                />
                {callAccepted && !callEnded ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PhoneDisabled fontSize="large" />}
                        fullWidth
                        onClick={leaveCall}
                        className={classes.margin}
                    >
                        Hang Up
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Phone fontSize="large" />}
                        fullWidth
                        onClick={() => callUser(idToCall)}
                        className={classes.margin}
                    >
                        Call
                    </Button>
                )}
            </form>
            {children}
        </div>
    );
};

export default Sidebar;
