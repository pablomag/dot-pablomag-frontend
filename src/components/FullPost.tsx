import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";

import { initializeStickyTitles } from "../common/stickyTitles";
import { initializeCodeCopy } from "../common/copyToClipboard";
import { highlightCode } from "../common/highlightCode";
import { like } from "../common/like";

//import Comments from './Comments';

import { IMG_SERVICE_URL } from "../constants";

import { updateCommentCount } from "../services/postService";

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
}

const addToBookmark = (slug: string) => {
    console.log(`[Feature not yet implemented] Adding to bookmark: ${slug}`);
};

const shareToTwitter = (slug: string) => {
    console.log(`[Feature not yet implemented] Sharing to twitter: ${slug}`);
};

const shareToFacebook = (slug: string) => {
    // TODO: figure out how to post with title and image, maybe after we have this hosted properly
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
    console.log(`[Feature is experimental] Sharing to facebook: ${facebookUrl}`);
};

const syncCommentCount = ({ post } :any) => {
    const element = document.querySelector(".disqus-comment-count");

    let comments = "";

    if (element !== null) {
        let retryNumber = 0;

        const interval = setInterval(() => {
            retryNumber++;

            if (comments === "" && retryNumber < 50) {
                comments = element.innerHTML;
            } else {
                const commentCount = comments.split(" ", 1);

                clearInterval(interval);

                if (post.comments !== commentCount) {
                    post.comments = commentCount;
                    updateCommentCount(post._id, post.comments);
                }
            }
        }, 2000);
    }
};

const initializePost = (post: any) => {
    syncCommentCount(post);
    initializeStickyTitles();
    initializeCodeCopy();
    highlightCode();
};

const FullPost = ({ data }: any) => {
    const { post, liked } = data;

    useEffect(() => {
        initializePost(post);
        setLike(liked);
    }, [post, liked]);

    return (
        <div className="post">
            <div className="hero">
                <img
                    src={`${IMG_SERVICE_URL}/images/${post.image}`}
                    alt={post.title}
                />
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

            {ReactHtmlParser(post.content)}

            <div className="comments">
                <h1>Comments</h1>
                <p>Comments are temporarily disabled</p>
                {/*
					// Comments disabled temporarily
					<Comments data={post}></Comments>
				*/}
            </div>

            <div className="left-sidebar">
                <div className="post-date">
                    <h3>
                        <i className="far fa-clock clock-icon"></i>
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
                        <i
                            className="far fa-comment-alt sidebar-icon"
                            onClick={() => comment(post.slug)}
                        ></i>
                    </div>
                    <div className="sidebar-links sidebar-links__likes">
                        <i className="likes-count">{post.likes}</i>
                        <i
                            className="far fa-thumbs-up sidebar-icon sidebar-icon-like"
                            onClick={() => handleLike(post)}
                        ></i>
                    </div>
                    <div className="sidebar-links sidebar-links__bookmark">
                        <i
                            className="far fa-bookmark sidebar-icon"
                            onClick={() => addToBookmark(post.slug)}
                        ></i>
                    </div>
                    <div className="sidebar-links sidebar-links__twitter">
                        <i
                            className="fab fa-twitter sidebar-icon"
                            onClick={() => shareToTwitter(post.slug)}
                        ></i>
                    </div>
                    <div className="sidebar-links sidebar-links__facebook">
                        <i
                            className="fab fa-facebook-square sidebar-icon"
                            onClick={() => shareToFacebook(post.slug)}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullPost;
