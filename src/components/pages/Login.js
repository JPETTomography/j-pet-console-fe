import { CONTACT_MAIL } from "../../const";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PasswordInput from "../partials/PasswordInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append("username", username);
    formDetails.append("password", password);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SOURCE}/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formDetails,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Authentication failed!");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setLoading(false);
        navigate("/experiments");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex-1 flex justify-center items-center p-4">
        <section className="grid gap-16 w-full max-w-lg">
          <img
            src="/images/logos/logo-full-v.svg"
            alt="J-PET logotype"
            className="w-20"
          />

          <h1 className="text-center">Login</h1>
          <form onSubmit={handleSubmit} className="grid gap-8">
            <div className="grid gap-2 focus-within:text-sky-700 group/input">
              <label
                htmlFor="login"
                className="max-w-max hover:text-sky-700 transition-colors duration-300"
              >
                Login
              </label>
              <input
                type="text"
                id="login"
                name="login"
                onChange={(e) => setUsername(e.target.value)}
                className="p-4 rounded border border-slate-300 group-hover/input:border-sky-700 focus:outline-sky-700 text-slate-800 transition-colors duration-300"
              />
            </div>
            <div className="grid gap-2">
              <PasswordInput setPassword={setPassword} />

              <a
                href={`mailto:${CONTACT_MAIL}`}
                className="max-w-max ml-auto text-xs text-slate-700 hover:text-slate-900 hover:underline focus:outline-offset-4 transition-colors duration-300"
              >
                Forgot password
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="p-4 rounded bg-sky-700 hover:bg-sky-900 focus:outline-sky-700 focus:outline-offset-4 text-white font-medium disabled:bg-slate-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
          <p className="text-center">
            You don’t have an account yet?
            <br />
            Please contact with our{" "}
            <a
              href={`mailto:${CONTACT_MAIL}`}
              className="text-sky-600 hover:text-sky-800 font-semibold focus:outline-offset-4 transition-colors duration-300"
            >
              administration
            </a>
            .
          </p>
        </section>
      </div>
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/login-bg.png"
          })`,
        }}
        className="hidden lg:block overflow-hidden bg-cover bg-top bg-no-repeat"
      ></div>
    </div>
  );
};

export default Login;
