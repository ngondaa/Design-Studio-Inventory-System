"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (responseData.message === "success") {
        console.log("Login successful:", responseData);

        if (email === "admin@gmail.com") {
          router.push("/pages/administrator/home");
        } else {
          router.push("/pages/client/subscriptions");
        }
      } else if (responseData.message === "error") {
        console.error("Authentication error:", responseData.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect email/password combination",
        });
      } else {
        console.error("Login failed:", response.statusText);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed: " + response.statusText,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error during login: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-80">
      <div className="mx-auto mt-8 w-full max-w-lg max-w-lg overflow-hidden rounded-lg bg-white shadow-md xl:max-w-2xl">
        <div className="px-6 py-8">
          <div className="text-center">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                {/* Add loading spinner or message here */}
              </div>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or log in with
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="../registration"
              className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Dont have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
