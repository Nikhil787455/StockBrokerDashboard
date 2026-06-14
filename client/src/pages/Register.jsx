import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (user) => user.email === email
    );

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({
      name,
      email,
      password,
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold mb-5">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;