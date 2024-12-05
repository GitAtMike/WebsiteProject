import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegistering
      ? "http://localhost:8888/register"
      : "http://localhost:8888/login";

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (isRegistering) {
        alert("Registration successful! You can now log in.");
        setIsRegistering(false);
      } else {
        // Login successful
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        alert("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>
          {isRegistering ? "Register to use the app" : "Login to use the app"}
        </h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        <p>
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login here" : "Register here"}
          </span>
        </p>
      </form>
      <button type="button" className="back-button" onClick={goHome}>
        &#8592; Back to Home
      </button>
    </main>
  );
}

export default Login;
