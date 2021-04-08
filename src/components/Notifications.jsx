import React, { useContext } from "react";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        top: "50%",
    },
}));

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    const classes = useStyles();

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <Paper className={classes.container}>
                    <h1>{call.name} Call incoming</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={answerCall}
                    >
                        Answer
                    </Button>
                </Paper>
            )}
        </>
    );
};

export default Notifications;
