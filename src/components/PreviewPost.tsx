import React, { useEffect } from "react";
import Moment from "react-moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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
                <picture>
                    <source
                        media="(min-width: 720px)"
                        srcSet={`${IMG_SERVICE_URL}/images/desktop/${data.image}`}
                    />
                    <img
                        src={`${IMG_SERVICE_URL}/images/mobile/${data.image}`}
                        alt={data.title}
                    />
                </picture>
            </div>
            <div className="post-date">
                <h3>
                    <FontAwesomeIcon icon={faClock} className="clock-icon" />
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
