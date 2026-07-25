
import './App.css'

function App() {
  return (
      <div className="app">
        <div className="login-card">
          <h1>Car Rental System</h1>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button>Login</button>
        </div>
      </div>
  );
}

export default App;
``