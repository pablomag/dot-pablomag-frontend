import React, { useEffect } from "react";

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
                    <h1 className="header-title">
                        <object
                            data="/dot-pablomag.svg"
                            type="image/svg+xml"
                            aria-label=".pablomag"
                            className="logo-svg"
                        ></object>
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
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Header;
