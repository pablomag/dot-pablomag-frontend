import React, { useEffect } from "react";
import Moment from "react-moment";

import { IMG_SERVICE_URL } from "../constants";

import { initializeStickyTitles } from "../common/stickyTitles";
import { highlightCode } from "../common/highlightCode";

const PreviewPost = (props: { data: any }) => {
    const { data } = props;

    useEffect(() => {
        initializeStickyTitles();
        highlightCode();
    }, []);

    return (
        <div className="post post--preview">
            <div className="hero">
                <img
                    srcSet={`${IMG_SERVICE_URL}/images/mobile/${data.image} 720w,
                            ${IMG_SERVICE_URL}/images/desktop/${data.image} 1920w`}
                    sizes="(max-width: 720px) 720px, 1920px"
                    src={`${IMG_SERVICE_URL}/images/mobile/${data.image}`}
                    alt={data.title}
                />
            </div>
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
            <div className="sticky-title">
                <h1 className="post-title">{data.title}</h1>
            </div>
        </div>
    );
};

export default PreviewPost;
