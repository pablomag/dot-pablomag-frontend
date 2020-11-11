import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNodeJs, faJs, faReact } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer>
            <div className="first-paragraph">
                <div className="powered-by">
                    <p>powered by</p>
                </div>
                <div className="icons">
                    <FontAwesomeIcon icon={faNodeJs} />
                    <FontAwesomeIcon icon={faJs} />
                    <FontAwesomeIcon icon={faReact} />
                </div>
            </div>

            <div className="second-paragraph">
                <div className="copyright">
                    <p>
                        Copyright © 2019-2020, Developed by @pablomag, thank you
                        for visiting. All Rights Reserved.
                    </p>
                </div>
                <div className="terms-of-service">
                    <p>
                        Personal blog where I store things I find interesting
                        from social networks and other sites
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
