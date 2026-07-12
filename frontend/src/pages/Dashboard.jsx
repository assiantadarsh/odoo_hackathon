import {
  Boxes,
  CalendarDays,
  CheckCircle2,
  LogOut,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  let user = {
    name: "User",
    role: "Employee",
  };

  try {
    const storedUser = localStorage.getItem("assetflow_user");

    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = {
      name: "User",
      role: "Employee",
    };
  }

  function handleLogout() {
    localStorage.removeItem("assetflow_token");
    localStorage.removeItem("assetflow_user");

    toast.success("Logout successful");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-[#714b67]">
              AssetFlow
            </h1>

            <p className="text-sm text-gray-500">
              Enterprise Asset Management
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="font-semibold text-gray-900">
                {user.name}
              </p>

              <p className="text-sm text-gray-500">
                {user.role}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-6">
        <section>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome, {user.name}
          </h2>

          <p className="mt-2 text-gray-500">
            Organization assets aur resources ka overview.
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Available Assets"
            value="42"
            icon={CheckCircle2}
            onClick={() => navigate("/history/available")}
          />

          <StatCard
            title="Allocated Assets"
            value="28"
            icon={Boxes}
            onClick={() => navigate("/history/allocated")}
          />

          <StatCard
            title="Under Maintenance"
            value="6"
            icon={Wrench}
            onClick={() => navigate("/history/maintenance")}
          />

          <StatCard
            title="Active Bookings"
            value="8"
            icon={CalendarDays}
            onClick={() => navigate("/history/bookings")}
          />
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h3>

          <div className="mt-5 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate("/assets/new")}
              className="rounded-xl bg-[#714b67] px-5 py-3 font-semibold text-white transition hover:bg-[#5e3e56]"
            >
              Register Asset
            </button>

            <button
              type="button"
              onClick={() => navigate("/bookings/new")}
              className="rounded-xl border border-[#714b67] px-5 py-3 font-semibold text-[#714b67] transition hover:bg-purple-50"
            >
              Book Resource
            </button>

            <button
              type="button"
              onClick={() => navigate("/maintenance/new")}
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Raise Maintenance Request
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#714b67] hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>

          <p className="mt-2 text-xs font-semibold text-[#714b67]">
            View History
          </p>
        </div>

        <div className="rounded-xl bg-purple-100 p-3 text-[#714b67]">
          <Icon size={24} />
        </div>
      </div>
    </button>
  );
}

export default Dashboard;