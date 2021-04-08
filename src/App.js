import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import AdultRoom from "./AdultRoom";
import ToddlerRoom from "./ToddlerRoom";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/adultroom" component={AdultRoom} />
                <Route path="/toddlerroom" component={ToddlerRoom} />
                <Route component={Error} />
            </Switch>
        </div>
    );
};

export default App;
