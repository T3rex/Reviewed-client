import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { navbarTheme } from "flowbite-react";

let signupSchema = object({
  name: string().required("First name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .required("Password is required"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const handleSingup = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      data
    );
    console.log(response);
  };

  const onSubmit = (date) => {
    console.log(date);
    handleSingup(date);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 text-center">
          Sign up for free 🤗
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
          You will get 2 video and 10 text testimonial credits for FREE!
        </p>
      </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <form className="space-y-4 m-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              First Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              {...register("name", { required: true })}
            />
          </div>

          <div className="my-5">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              {...register("email", { required: true })}
              required
            />
          </div>

          <div className="my-5">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password <span className="text-orange-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              {...register("password", { required: true })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full my-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Sign up
          </button>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
