import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Loader from "./common/loader";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

import LatestPosts from "./components/LatestPosts";
import SinglePost from "./components/SinglePost";

import AppContextProvider, { AppContext } from "./contexts/AppContext";

function App() {
    const context = useContext(AppContext);

    const { state } = context!;
    const { loading } = state;

    if (!loading) {
        return (
            <React.Fragment>
                <Header></Header>

                <Switch>
                    <Route
                        path="/latest"
                        render={() => <LatestPosts />}
                    />
                    <Route path="/post/:slug" component={SinglePost} />
                    <Route
                        path="/posts/:year?/:month?"
                        component={LatestPosts}
                    />
                    <Route path="/404" component={NotFound} />
                    <Redirect exact from="/" to="/latest" />
                    <Redirect to="/404" />
                </Switch>

                <Footer></Footer>
            </React.Fragment>
        );
    } else {
        return <Loader></Loader>;
    }
}

export default () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    );
};
