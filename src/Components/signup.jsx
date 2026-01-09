import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginHome.css";
import User from "../assets/user.png";
import Pass from "../assets/pass.webp";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signupError, setSignupError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const credentials = { username, password };
        console.log(credentials);
        try {
            const response = await fetch("http://localhost:5002/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const message = await response.text();
                console.log("Signup successful:", message);
                navigate("/login");
            } else {
                const error = await response.text();
                setSignupError(error || "Signup failed");
            }
        } catch (error) {
            setSignupError("Server error");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={User} alt="" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={Pass} alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="submitContainer" onClick={handleSignup}>
                    <button className="submit">Sign Up</button>
                </div>
                {signupError && <div className="error">{signupError}</div>}
            </div>
        </div>
    );
};

export default Signup;
