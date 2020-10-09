import React from "react";

const Footer = () => {

	return (
		<footer>
			<div className="first-paragraph">
				<div className="powered-by">
					<p>powered by</p>
				</div>
				<div className="icons">
					<i className="fab fa-node-js"></i><i className="fab fa-js"></i><i className="fab fa-react"></i>
				</div>
			</div>

			<div className="second-paragraph">
				<div className="copyright">
					<p>Copyright © 2019-2020, Developed by @pablomag, thank you for visiting. All Rights Reserved.</p>
				</div>
				<div className="terms-of-service">
					<p>Personal blog where I store things I find interesting from social networks and other sites</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
