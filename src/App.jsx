import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cars, setCars] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const token = localStorage.getItem("token");

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

            await getCars();
            setErrorMessage('');
            setLoggedIn(true);

            console.log("Token Saved");

        } catch (error) {

            console.log("ERROR");

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }
            setErrorMessage("Invalid email or password");

            console.log(error);
        }
    }

    async function getCars() {
        try {

            const response = await axios.get(
                'https://carrental-26hx.onrender.com/cars',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCars(response.data);

        } catch (error) {

            console.log(error);
        }
    }

    if (loggedIn) {
        return (
            <div className="cars-page">
                <div className="cars-container">

                    <h1>Available Cars</h1>

                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="car-card"
                        >
                            <h3>{car.make} {car.model}</h3>
                            <p>Year: {car.year}</p>
                            <p>Price Per Day: ${car.pricePerDay}</p>
                        </div>
                    ))}

                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="login-card">

                <h1>Car Rental System</h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;