import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";

import { IMG_SERVICE_URL } from "../constants";

import { initializeStickyTitles } from "../common/stickyTitles";

const PreviewPost = (props: { data: any }) => {
    const { data } = props;

    useEffect(() => {
        initializeStickyTitles();
    }, []);

    return (
        <div className="post post--to-back">
            <div className="hero">
                <img
                    src={`${IMG_SERVICE_URL}/images/${data.image}`}
                    alt={data.title}
                />
            </div>

            <div className="right-sidebar">
                <div className="tags-wrapper"></div>
            </div>

            <div className="sticky-title">
                <h1 className="post-title">{data.title}</h1>
            </div>

            {ReactHtmlParser(data.content)}

            <div className="left-sidebar">
                <div className="post-date">
                    <h3>
                        <i className="far fa-clock clock-icon"></i>
                        <Moment
                            className="moment-date"
                            locale="en"
                            format="MMMM DD, YYYY"
                        >
                            {data.createdAt}
                        </Moment>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PreviewPost;
