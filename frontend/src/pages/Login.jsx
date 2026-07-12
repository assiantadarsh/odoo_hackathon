import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const token = localStorage.getItem("assetflow_token");

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "manager@assetflow.com",
    password: "123456",
  });

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    let registeredUsers = [];

    try {
      registeredUsers = JSON.parse(
        localStorage.getItem("assetflow_users") || "[]",
      );
    } catch {
      registeredUsers = [];
    }

    const demoManager = {
      id: 1,
      name: "Priya Sharma",
      email: "manager@assetflow.com",
      password: "123456",
      role: "Asset Manager",
      department: "Administration",
      status: "Active",
    };

    const allUsers = [demoManager, ...registeredUsers];

    const matchedUser = allUsers.find(
      (user) =>
        user.email.toLowerCase() === email &&
        user.password === password,
    );

    if (!matchedUser) {
      toast.error("Invalid email address or password.");
      return;
    }

    if (matchedUser.status === "Inactive") {
      toast.error("Your account is inactive. Please contact an administrator.");
      return;
    }

    const loggedInUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role || "Employee",
      department: matchedUser.department || "",
      status: matchedUser.status || "Active",
    };

    localStorage.setItem("assetflow_token", `demo-token-${Date.now()}`);

    localStorage.setItem(
      "assetflow_user",
      JSON.stringify(loggedInUser),
    );

    toast.success(`Welcome, ${loggedInUser.name}`);

    navigate("/dashboard", {
      replace: true,
    });
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="hidden bg-[#714b67] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">AssetFlow</h1>

          <p className="mt-2 text-white/70">
            Enterprise Asset Management
          </p>
        </div>

        <div>
          <h2 className="max-w-lg text-5xl font-bold leading-tight">
            Manage assets, bookings, and maintenance from one platform.
          </h2>

          <p className="mt-5 max-w-lg text-lg text-white/75">
            Track every organizational asset without spreadsheets.
          </p>
        </div>

        <p className="text-sm text-white/60">
          AssetFlow ERP System
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#714b67] lg:hidden">
            AssetFlow
          </h1>

          <h2 className="mt-6 text-3xl font-bold text-gray-900 lg:mt-0">
            Welcome back
          </h2>

          <p className="mt-2 text-gray-500">
            Sign in to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#714b67] focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-[#714b67] focus:ring-4 focus:ring-purple-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Show or hide password"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#714b67] px-4 py-3 font-semibold text-white transition hover:bg-[#5e3e56]"
            >
              Sign in
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="mt-4 w-full rounded-xl border border-[#714b67] px-4 py-3 font-semibold text-[#714b67] transition hover:bg-purple-50"
          >
            Create Employee Account
          </button>

          <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">
              Demo Asset Manager
            </p>

            <p className="mt-2">
              Email: <strong>manager@assetflow.com</strong>
            </p>

            <p className="mt-1">
              Password: <strong>123456</strong>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;