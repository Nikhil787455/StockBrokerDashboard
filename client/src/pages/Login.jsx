
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem("userEmail", email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
          Stock Broker
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Client Dashboard Login
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-5"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <div className="flex justify-between mt-5">
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>

          <Link
            to="/forgot-password"
            className="text-red-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;