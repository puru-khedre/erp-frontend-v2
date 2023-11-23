import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleAdminSubmit(e) {
    e.preventDefault();

    if (!adminEmail.match(emailPattern)) {
      setError("Enter proper email");
      return;
    }
    setError("");
    try {
      alert("admin login successfull");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-2xl mx-auto md:w-1/2 rounded-2xl shadow-xl border  border-gray-200/70 px-10 py-6">
        <h1 className="mb-4 text-2xl text-center font-semibold text-gray-700 dark:text-gray-200">
          Admin Login
        </h1>
        <hr className="my-4" />
        <form
          onSubmit={handleAdminSubmit}
          className="flex gap-3 flex-col items-stretch"
        >
          <div className=" py-2">
            <label className="text-gray-600" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className="outline-none border border-gray-200 rounded-md p-2 mt-1 focus-visible:ring-4 ring-indigo-200 focus-visible:border-indigo-400 w-full"
              type="email"
              name="email"
              placeholder="enter your email"
              id="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div className=" py-2">
            <label className="text-gray-600" htmlFor="password">
              Password
            </label>
            <br />
            <input
              className="outline-none border border-gray-200 rounded-md p-2 mt-1 focus-visible:ring-4 ring-indigo-200 focus-visible:border-indigo-400 w-full"
              type="password"
              name="password"
              placeholder="enter your password"
              id="password"
              value={adminPassword}
              required
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>

          {error !== "" && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md p-2"
          >
            Log in
          </button>

          <hr className="my-4" />

          <p className="">
            <Link
              className="font-medium text-indigo-600 hover:underline"
              to="/forgot-password"
            >
              Forgot your password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
