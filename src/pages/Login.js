import React, { useState } from "react";

export default () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try{

			const response = await fetch("http://localhost:1337/auth/local", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					identifier: email,
					password,
				}),
			});

			const data = await response.json();
			if (data.message) {
				setError(data.message[0].messages[0].message);
				return; //stop execution
			}
		}catch(err){
			setError('Something went wrong' + err)
		}
	};
	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={(event) =>{ 
						setError('')
						setEmail(event.target.value)}
					}
				/>
				<input
					type="password"
					value={password}
					onChange={(event) =>{ 
						setError('')
						setPassword(event.target.value)}
					}
				/>
				<button>Login</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};
