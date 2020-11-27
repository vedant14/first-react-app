import React, { useState, useEffect, useContext } from "react";
import Post from "../components/Post";
import {UserContext} from '../context/UserContext'

export default ({ match, history }) => {
	const { id } = match.params;
	const {user, setUser} = useContext(UserContext)
	console.log("user", user)
	console.log("setUser", setUser)

	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);
	const [edit, setEdit] = useState(false);
	const [description, setDescription] = useState("");

	const fetchPost = async () => {
		const response = await fetch(`http://localhost:1337/posts/${id}`);
		const data = await response.json();
		setPost(data);
		setDescription(data.description);
		setLoading(false);
	};

	const handleEditSubmit = async (event) => {
		event.preventDefault();
		console.log("handleEditSubmit");
		const response = await fetch(`http://localhost:1337/posts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				description,
			}),
		});
		const data = await response.json();
		fetchPost();
	};

	const handleDelete = async () => {
		const response = await fetch(`http://localhost:1337/posts/${id}`, {
			method: "DELETE",
		});
		const data = await response.json();
		history.push("/");
	};
	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<div>
			{loading && <p>Loading...</p>}
			{!loading && (
				<React.Fragment>
					{post.id && (
						<React.Fragment>
							<Post
								description={post.description}
								likes={post.likes}
								url={post.image && post.image.url}
								key={post.id}
							/>
							<button onClick={handleDelete}>
								Delete this post
							</button>
							<button onClick={() => setEdit(true)}>
								Edit This Post
							</button>
							{edit && (
								<form onSubmit={handleEditSubmit}>
									<input
										value={description}
										onChange={(event) =>
											setDescription(event.target.value)
										}
										placeholder="New Description"
									/>
									<button>Confirm</button>
								</form>
							)}
						</React.Fragment>
					)}
					{!post.id && <p> 404 - Post not found </p>}
				</React.Fragment>
			)}
		</div>
	);
};
