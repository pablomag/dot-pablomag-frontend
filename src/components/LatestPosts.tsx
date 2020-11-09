import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../common/loader";
import PreviewPost from "./PreviewPost";

import { AppReducer, types } from "../reducers/AppReducer";

const LatestPosts = () => {
    const [state, dispatch] = useReducer(AppReducer, {});

    const { loading, data } = state;

    const showMore = false;

    useEffect(() => {
        dispatch({ type: types.loadPosts, dispatch });
    }, [dispatch]);

    if (loading) {
        return (
            <main>
                <Loader></Loader>
            </main>
        );
    } else {
        if (!data) {
            return <h3>Error, post not found</h3>;
        } else {
            if (data.error) {
                return <h1>Error while loading post</h1>;
            } else {
                return (
                    <main className="overflow-hidden">
                        <div className="main">
                            {data.map((post: any) => (
                                <React.Fragment key={post.slug}>
                                    <div className="post-container--more">
                                        <PreviewPost data={post}></PreviewPost>
                                    </div>
                                    <div className="post--readmore">
                                        <Link
                                            to={{
                                                pathname: `/post/${post.slug}`,
                                            }}
                                        >
                                            + read full post
                                        </Link>
                                    </div>
                                </React.Fragment>
                            ))}
                            {showMore && (
                                <p onClick={() => dispatch({})}>Load more</p>
                            )}
                            <div className="no-more-posts">
                                <div className="wrapper">
                                    <h1>Sorry...</h1>
                                    <p>There are no more posts</p>
                                </div>
                            </div>
                        </div>
                    </main>
                );
            }
        }
    }
};

export default LatestPosts;
