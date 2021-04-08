import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    home: {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
    },
    homeDoors: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    homeDoorsActivateLeft: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#000",
        transformOrigin: "right",
        transition: "transform .45s",
        "&:hover": {
            transform: "perspective(2600px) rotateY(-10deg)",
        },
    },
    homeDoorsActivateRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#000",
        transformOrigin: "left",
        transition: "transform .45s",
        "&:hover": {
            transform: "perspective(2600px) rotateY(10deg)",
        },
    },
    homeTitleContainer: {
        position: "absolute",
        display: "flex",
        top: "0",
        justifyContent: "center",
        width: "100%",
        zIndex: "100",
    },
    image: {
        marginLeft: "15px",
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.home}>
            <div className={classes.homeTitleContainer}>
                <Paper variant="outlined" elevation={3}>
                    <Typography variant="h1" component="h1">
                        Screen-a-boo
                    </Typography>
                    <Typography variant="h4" component="h4" align="center">
                        A fun way to talk to your little ones
                    </Typography>
                </Paper>
            </div>
            <Grid md={6} className={classes.homeDoors}>
                <Link
                    to="/toddlerroom"
                    className={classes.homeDoorsActivateLeft}
                    style={{
                        backgroundColor: "#5EA0FF",
                        textDecoration: "none",
                        color: "#000",
                    }}
                >
                    <Typography variant="h2" component="h2">
                        Join as a toddler
                    </Typography>
                </Link>
            </Grid>
            <Grid md={6} className={classes.homeDoors}>
                <Link
                    to="/adultroom"
                    className={classes.homeDoorsActivateRight}
                    style={{
                        backgroundColor: "#FF5E5E",
                        textDecoration: "none",
                        color: "#000",
                    }}
                >
                    <Typography variant="h2" component="h2">
                        Join as an adult
                    </Typography>
                </Link>
            </Grid>
        </Paper>
    );
};

export default Home;
