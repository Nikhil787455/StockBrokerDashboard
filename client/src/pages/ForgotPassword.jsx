import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex(
      (user) => user.email === email
    );

    if (index === -1) {
      alert("User not found");
      return;
    }

    users[index].password = newPassword;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Password Updated");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600">
      <div className="bg-white p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold mb-5">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 mb-4"
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <button
          onClick={handleReset}
          className="w-full bg-indigo-600 text-white p-3 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;