import React from "react";
import ReactHtmlParser from "react-html-parser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const SUBTITLE = "SUBTITLE";
const TEXT = "TEXT";
const TIP = "TIP";
const CODE = "CODE";

interface postData {
    _id: string;
    post: string;
    type: string;
    value: string;
    order: number;
    __v: number;
}

const subtitle = (element: postData) => {
    return (
        <div className="subtitle" key={element.order}>
            <p className="post-subtitle">{element.value}</p>
        </div>
    );
};

const text = (element: postData) => {
    return (
        <div className="text" key={element.order}>
            <p className="post-text">{ReactHtmlParser(element.value)}</p>
        </div>
    );
};

const tip = (element: postData) => {
    return (
        <div className="tip" key={element.order}>
            <p className="post-note">{ReactHtmlParser(element.value)}</p>
        </div>
    );
};

const code = (element: postData) => {
    return (
        <div className="code code-block" key={element.order}>
            <i className="code-block-copy">
                <FontAwesomeIcon icon={faCopy} className="copy-icon-disabled" />
            </i>
            <pre>
                <code>{element.value.trim()}</code>
            </pre>
        </div>
    );
};

export function parsePostElement(element: postData) {
    switch (element.type) {
        case SUBTITLE:
            return subtitle(element);
        case TEXT:
            return text(element);
        case TIP:
            return tip(element);
        case CODE:
            return code(element);
        default:
            return false;
    }
}
