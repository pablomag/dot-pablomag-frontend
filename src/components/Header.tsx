import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { ReactComponent as Logo } from "../dot-pablomag.svg";

import { initializeNavigation } from "../common/navigation";

import { APP_TITLE } from "../constants";

const handleOpenBurgerMenu = () => {
    console.log("burger menu clicked");
};

const Header = () => {
    useEffect(() => {
        initializeNavigation();
    }, []);

    return (
        <React.Fragment>
            <header>
                <div className="header-title">
                    <h1>
                        <Logo aria-label=".pablomag" className="logo-svg" />
                        {APP_TITLE}
                    </h1>
                </div>

                <div className="main-navigation">
                    <nav>
                        <ul>
                            <li>LATEST</li>
                            <li>TECH</li>
                            <li>ART</li>
                            <li>GAMES</li>
                            <li>PROFILE</li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="burger-wrapper">
                <div
                    className="burger init"
                    onClick={() => handleOpenBurgerMenu()}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Header;
