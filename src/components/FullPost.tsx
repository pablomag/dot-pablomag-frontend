import React, { useEffect } from "react";
import Moment from "react-moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faClock,
    faCommentAlt,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import { ScrollToTopOnMount } from "../common/scrollToTop";
import { initializeStickyTitles } from "../common/stickyTitles";
import { initializeCodeCopy } from "../common/copyToClipboard";
import { parsePostElement } from "../common/postElementParser";
import { highlightCode } from "../common/highlightCode";
import { like } from "../common/like";

import { IMG_SERVICE_URL } from "../constants";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const comment = (slug: string) => {
    console.log(`[Feature temporarily disabled] Add comment to post: ${slug}`);
    const element = document.querySelector(".disqus-comment-count");
    const options: ScrollIntoViewOptions = {
        block: "start",
        behavior: "smooth",
    };

    if (element) {
        element.scrollIntoView(options);
    }
};

const handleLike = (post: any) => {
    try {
        like(post).then((response: any) => {
            if (response.status === "success") {
                const likeCount = document.querySelector(".likes-count");

                post.likes = post.likes + 1;

                likeCount!.innerHTML = post.likes;

                setLike(true);
            }
        });
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

const setLike = (liked: boolean) => {
    const like = document.querySelector(".sidebar-icon-like");
    if (liked) {
        like!.classList.add("liked");
    }
};

const addToBookmark = (slug: string) => {
    console.log(`[Feature not yet implemented] Adding to bookmark: ${slug}`);
};

const shareToTwitter = (slug: string) => {
    console.log(`[Feature not yet implemented] Sharing to twitter: ${slug}`);
};

const shareToFacebook = (slug: string) => {
    const postUrl = `http://www.pablomag.com/post/${slug}`;
    const facebookUrl = `https://www.facebook.com/dialog/share?
						app_id=510098482868255
						&display=popup
						&href=${postUrl}
						&redirect_uri=${postUrl}`;

    window.open(
        facebookUrl,
        "Facebook share",
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=700,width=600"
    );
    console.log(
        `[Feature is experimental] Sharing to facebook: ${facebookUrl}`
    );
};

const initializePost = () => {
    initializeStickyTitles();
    initializeCodeCopy();
    highlightCode();
};

const FullPost = ({ data }: any) => {
    const { data: postData, post, liked } = data;

    useEffect(() => {
        initializePost();
        setLike(liked);
    }, [post, liked]);

    return (
        <div className="post">
            <ScrollToTopOnMount />
            <div className="hero">
                <picture>
                    <source
                        media="(min-width: 720px)"
                        srcSet={`${IMG_SERVICE_URL}/images/desktop/${post.image}`}
                    />
                    <img
                        src={`${IMG_SERVICE_URL}/images/mobile/${post.image}`}
                        alt={post.title}
                    />
                </picture>
            </div>

            <div className="right-sidebar">
                <div className="tags-wrapper">
                    {post.tags.map((tag: any) => (
                        <p key={tag} className="sidebar-tags">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>

            <div className="sticky-title">
                <h1 className="post-title">{post.title}</h1>
            </div>

            <div className="post-content">
                {postData.map((element: any) => {
                    return parsePostElement(element);
                })}
            </div>

            <div className="comments">
                <h1>Comments</h1>
                <p>Comments are temporarily disabled</p>
            </div>

            <div className="left-sidebar">
                <div className="post-date">
                    <h3>
                        <FontAwesomeIcon
                            icon={faClock}
                            className="clock-icon"
                        />
                        <Moment
                            className="moment-date"
                            locale="en"
                            format="MMMM DD, YYYY"
                        >
                            {post.createdAt}
                        </Moment>
                    </h3>
                </div>
                <div className="post-author">
                    <div className="hero-profile">
                        <div className="img-wrapper">
                            <img
                                src={post.author.picture}
                                alt={post.author.name}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <p className="hero-name">{post.author.name}</p>
                    </div>
                </div>
                <div className="post-stats">
                    <div className="sidebar-links sidebar-links__comments">
                        <i className="comments-count">{post.comments}</i>
                        <FontAwesomeIcon
                            icon={faCommentAlt}
                            className="sidebar-icon sidebar-icon-comment"
                            onClick={() => comment(post.slug)}
                        />
                    </div>
                    <div className="sidebar-links sidebar-links__likes">
                        <i className="likes-count">{post.likes}</i>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="sidebar-icon sidebar-icon-like"
                            onClick={() => handleLike(post)}
                        />
                    </div>
                    <div className="sidebar-links sidebar-links__bookmark">
                        <FontAwesomeIcon
                            icon={faBookmark}
                            className="sidebar-icon sidebar-icon-bookmark"
                            onClick={() => addToBookmark(post.slug)}
                        />
                    </div>
                    <div className="sidebar-links sidebar-links__twitter">
                        <i
                            className="fab fa-twitter sidebar-icon"
                            onClick={() => shareToTwitter(post.slug)}
                        ></i>
                    </div>
                    <div className="sidebar-links sidebar-links__facebook">
                        <FontAwesomeIcon
                            icon={faFacebookSquare}
                            className="sidebar-icon sidebar-icon-facebook"
                            onClick={() => shareToFacebook(post.slug)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullPost;
