import React from "react";

const API_URL = "http://localhost:1337";
const formatImageUrl = (url) => `${API_URL}${url}`;

export default ({ description, likes, id, url }) => {
	return (
		<div className="Post">
			<img
				className="Post_Image"
				src={formatImageUrl(url)}
				alt="Vedant"
			/>
			<h4> {description}</h4>
			<p> Likes: {likes}</p>
		</div>
	);
};
