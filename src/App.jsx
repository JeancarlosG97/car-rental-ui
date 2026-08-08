import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cars, setCars] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState('cars');
    const [rentalDays, setRentalDays] = useState({});
    const role = localStorage.getItem("role");
    const token = localStorage.getItem('token');
    const [newCar, setNewCar] = useState({
        make: '',
        model: '',
        year: '',
        pricePerDay: ''
    });

    async function handleLogin() {
        try {

            const response = await axios.post(
                'https://carrental-26hx.onrender.com/auth/login',
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                'token',
                response.data.token
            );

            localStorage.setItem(
                'role',
                response.data.role
            );

            await getCars();

            setErrorMessage('');
            setLoggedIn(true);

        } catch (error) {

            setErrorMessage(
                'Invalid email or password'
            );

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
            console.log("Cars:");
            console.log(response.data);
            setCars(response.data);

        } catch (error) {

            console.log(error);

        }
    }

    async function getMyRentals() {
        try {

            const response = await axios.get(
                'https://carrental-26hx.onrender.com/rentals/my',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRentals(response.data);

        } catch (error) {

            console.log(error);

        }
    }

    async function rentCar(carId, days) {

        try {

            const response = await axios.post(
                `https://carrental-26hx.onrender.com/rentals/${carId}/${days}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            await getMyRentals();

            alert('Rental created successfully!');

        } catch (error) {

            console.log(error);

        }
    }

    async function returnCar(rentalId) {

        try {

            await axios.put(
                `https://carrental-26hx.onrender.com/rentals/${rentalId}/return`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            await getMyRentals();

            alert('Vehicle returned successfully!');

        } catch (error) {

            console.log(error);

        }
    }

    async function addCar() {

        try {

            await axios.post(
                'https://carrental-26hx.onrender.com/cars',
                {
                    make: newCar.make,
                    model: newCar.model,
                    year: Number(newCar.year),
                    pricePerDay: Number(newCar.pricePerDay)
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            await getCars();

            setNewCar({
                make: '',
                model: '',
                year: '',
                pricePerDay: ''
            });

            alert('Vehicle added successfully!');

        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {

        if (loggedIn) {
            getCars();
        }

    }, [loggedIn]);

    if (loggedIn) {
        return (
            <div className="cars-page">
                <div className="cars-container">

                    <div className="nav-bar">

                        <button
                            className={
                                currentPage === 'cars'
                                    ? 'active-tab'
                                    : ''
                            }
                            onClick={() => setCurrentPage('cars')}
                        >
                            Cars
                        </button>

                        <button
                            className={
                                currentPage === 'rentals'
                                    ? 'active-tab'
                                    : ''
                            }
                            onClick={async () => {
                                await getMyRentals();
                                setCurrentPage('rentals');
                            }}
                        >
                            My Rentals
                        </button>

                        {role === "ADMIN" && (
                            <button
                                className={
                                    currentPage === 'fleet'
                                        ? 'active-tab'
                                        : ''
                                }
                                onClick={() => setCurrentPage('fleet')}
                            >
                                Fleet
                            </button>
                        )}

                        <button
                            onClick={() => {

                                localStorage.removeItem('token');
                                localStorage.removeItem('role');

                                setCars([]);
                                setRentals([]);

                                setLoggedIn(false);
                                setCurrentPage('cars');

                            }}
                        >
                            Logout
                        </button>

                    </div>

                    {currentPage === 'fleet' && role === 'ADMIN' && (
                        <>
                            <h1>Fleet Management</h1>

                            <div className="car-card">

                                <h3>Add Vehicle</h3>

                                <input
                                    type="text"
                                    placeholder="Make"
                                    value={newCar.make}
                                    onChange={(e) =>
                                        setNewCar({
                                            ...newCar,
                                            make: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Model"
                                    value={newCar.model}
                                    onChange={(e) =>
                                        setNewCar({
                                            ...newCar,
                                            model: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Year"
                                    value={newCar.year}
                                    onChange={(e) =>
                                        setNewCar({
                                            ...newCar,
                                            year: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Price Per Day"
                                    value={newCar.pricePerDay}
                                    onChange={(e) =>
                                        setNewCar({
                                            ...newCar,
                                            pricePerDay: e.target.value
                                        })
                                    }
                                />

                                <button onClick={addCar}>
                                    Add Car
                                </button>

                            </div>

                            <h2 style={{ color: "white" }}>
                                Current Fleet
                            </h2>

                            {cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="car-card"
                                >
                                    <h3>
                                        {car.make} {car.model}
                                    </h3>

                                    <p>Year: {car.year}</p>

                                    <p>
                                        Price Per Day: ${car.pricePerDay}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}

                    {currentPage === 'cars' && (
                        <>
                            <h1>Available Cars</h1>

                            {cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="car-card"
                                >
                                    <h3>
                                        {car.make} {car.model}
                                    </h3>

                                    <p>
                                        Year: {car.year}
                                    </p>

                                    <p>
                                        Price Per Day: $
                                        {car.pricePerDay}
                                    </p>

                                    <label>
                                        Rental Days
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            rentalDays[car.id] || 1
                                        }
                                        onChange={(e) =>
                                            setRentalDays({
                                                ...rentalDays,
                                                [car.id]:
                                                e.target.value
                                            })
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            rentCar(
                                                car.id,
                                                rentalDays[car.id] || 1
                                            )
                                        }
                                    >
                                        Rent Car
                                    </button>
                                </div>
                            ))}
                        </>
                    )}

                    {currentPage === 'rentals' && (
                        <>
                            <h1>My Rentals</h1>

                            {rentals.length === 0 && (
                                <p>
                                    No rentals found.
                                </p>
                            )}

                            {rentals.map((rental) => (
                                <div
                                    key={rental.rentalID}
                                    className="car-card"
                                >
                                    <h3>
                                        {rental.carMake}{' '}
                                        {rental.carModel}
                                    </h3>

                                    <p>
                                        <strong>Rental ID:</strong>{' '}
                                        {rental.rentalID}
                                    </p>

                                    <p>
                                        <strong>Rental Date:</strong>{' '}
                                        {rental.rentalDate}
                                    </p>

                                    <p>
                                        <strong>Return Date:</strong>{' '}
                                        {rental.returnDate}
                                    </p>

                                    <p>
                                        <strong>Price:</strong> $
                                        {rental.price}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{' '}
                                        {rental.returned
                                            ? 'Returned'
                                            : 'Active'}
                                    </p>

                                    {!rental.returned && (
                                        <button
                                            onClick={() =>
                                                returnCar(
                                                    rental.rentalID
                                                )
                                            }
                                        >
                                            Return Car
                                        </button>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

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
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
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