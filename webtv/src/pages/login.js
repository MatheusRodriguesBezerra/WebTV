import { useState } from "react";
import { useAuth } from "../constexts/AuthProvider";

export function Login(){
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    
    const auth = useAuth();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("pleae provide a valid input");
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmitEvent}>
            <div>
                <label htmlFor="user-email">Email:</label>
                <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="example@yahoo.com"
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-email">
                    Please enter a valid username. It must contain at least 6 characters.
                </div>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-password">
                    your password should be more than 6 character
                </div>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default Login;