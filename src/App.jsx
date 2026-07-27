import {useState} from 'react';
import axios from 'axios';
import './App.css'

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            const response = await axios.post(
                'https://carrental-26hx.onrender.com/auth/login',
                {
                    email: email,
                    password: password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "role",
                response.data.role
            );

            console.log("Token Saved");

        } catch (error) {
            console.log("ERROR");

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }
            console.log(error);
        }
    }
    
    return (
        <div className="app">
            <div className="login-card">
                <h1>Car Rental System</h1>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                           placeholder="Enter email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default App;
``