import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 text-center">
          Welcome back 👋
        </h1>
      </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <form className="space-y-4 m-5 flex flex-col justify-center items-center">
          <div className="w-full my-3">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="w-full my-3">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password <span className="text-orange-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full my-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Sign in
          </button>
          <div>
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
