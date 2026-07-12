import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const confirmPassword = form.confirmPassword.trim();

    if (!name) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!form.department) {
      toast.error("Please select your department.");
      return;
    }

    if (!password) {
      toast.error("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    let existingUsers = [];

    try {
      existingUsers = JSON.parse(
        localStorage.getItem("assetflow_users") || "[]",
      );
    } catch {
      existingUsers = [];
    }

    const emailAlreadyExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email,
    );

    if (emailAlreadyExists || email === "manager@assetflow.com") {
      toast.error("An account with this email address already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      department: form.department,
      password,
      role: "Employee",
      status: "Active",
    };

    localStorage.setItem(
      "assetflow_users",
      JSON.stringify([...existingUsers, newUser]),
    );

    toast.success("Your employee account has been created successfully.");

    navigate("/login", {
      replace: true,
    });
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#714b67] focus:ring-4 focus:ring-purple-100";

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
            Create your employee account and start managing resources.
          </h2>

          <p className="mt-5 max-w-lg text-lg text-white/75">
            Every new account is created with the Employee role. Additional
            roles can only be assigned by an administrator.
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
            Create an account
          </h2>

          <p className="mt-2 text-gray-500">
            Register as an employee to access AssetFlow.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department
              </label>

              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a department</option>
                <option value="IT">IT</option>
                <option value="Operations">Operations</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Marketing">Marketing</option>
                <option value="Administration">Administration</option>
              </select>
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className={`${inputClass} pr-12`}
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Show or hide confirm password"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
              <p className="text-sm font-medium text-[#714b67]">
                Default role: Employee
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Administrator, Asset Manager, and Department Head roles can only
                be assigned by an administrator.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#714b67] px-5 py-3 font-semibold text-white transition hover:bg-[#5e3e56]"
            >
              Create account
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-4 w-full rounded-xl border border-[#714b67] px-4 py-3 font-semibold text-[#714b67] transition hover:bg-purple-50"
          >
            Already have an account? Sign in
          </button>
        </div>
      </section>
    </main>
  );
}

export default Signup;
