import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default () => {
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);
	const [error, setError] = useState("");

	const { user } = useContext(UserContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!user) {
			setError("Please log in");
			return;
		}

		if (!description) {
			setError("Please add a description");
			return;
		}
		if (!file) {
			setError("Please attach a file");
			return;
		}

		const formData = new FormData();
		formData.append("data", JSON.stringify({ description }));
		formData.append("files.image", file);

		try {
			const response = await fetch("http://localhost:1337/posts", {
				method: "Post",
				headers: {
					Authorization: `Bearer ${user.jwt}`,
				},
				body: formData,
			});
			const data = await response.json();
		} catch (err) {
			console.log("Exception ", err);
		}
	};
	return (
		<div className="Create">
			<h1>Create</h1>
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<input
					placeholder="description"
					value={description}
					onChange={(event) => {
						setError("");
						setDescription(event.target.value);
					}}
				/>
				<input
					type="file"
					placeholder="Upload file"
					onChange={(event) => {
						setError("");
						setFile(event.target.files[0]);
					}}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
};
