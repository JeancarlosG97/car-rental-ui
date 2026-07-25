import { useState } from 'react';
import './App.css'

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(email);
    console.log(password);

  return (
      <div className="app">
        <div className="login-card">
          <h1>Car Rental System</h1>

          <div className="form-group">
            <label>Email</label>
            <input type="email"
                   placeholder="Enter email"
                   value={email}
                   onChange={ (e) => setEmail(e.target.value)} />
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

            <button>Login</button>
        </div>
      </div>
  );
}

export default App;
``