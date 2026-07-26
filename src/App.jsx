import {useState} from 'react';
import axios from 'axios';
import './App.css'

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            console.log("before req");
            const response = await axios.post(
                'https://carrental-26hx.onrender.com/auth/login',
                {
                    email: email,
                    password: password
                }
            );
            console.log("after req");
            console.log(response.data);
        } catch (error) {
            console.log("ERROR");

            if(error.respose) {
                console.log("Status:", error.respose.status);
                console.log("Data:", error.respose.data);
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