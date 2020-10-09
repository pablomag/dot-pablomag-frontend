import React, { useReducer, useEffect } from "react";

import { AppReducer, types } from "../reducers/AppReducer";

import Loader from "../common/loader";
import FullPost from "./FullPost";

const SinglePost = (prop: any) => {
    const { match } = prop.props;

    const slug = match.params.slug;

    const [state, dispatch] = useReducer(AppReducer, {});

    const { loading, data } = state;

    useEffect(() => {
        dispatch({ type: types.loadPost, slug, dispatch });
    }, [dispatch, slug]);

    if (loading) {
        return <Loader></Loader>;
    } else {
        if (!data) {
            return <h3>Error, post not found</h3>;
        } else {
            if (data.error) {
                return <h1>Error while loading post</h1>;
            } else {
                return (
                    <main>
                        <div className="main">
                            <FullPost key={slug} data={data}></FullPost>
                        </div>
                    </main>
                );
            }
        }
    }
};

export default (props: any) => {
    return <SinglePost props={props} />;
};
