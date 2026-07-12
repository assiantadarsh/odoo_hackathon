import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function NewMaintenance() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    asset: "",
    issue: "",
    priority: "Medium",
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

    if (!form.asset) {
      toast.error("Asset select karo");
      return;
    }

    if (!form.issue.trim()) {
      toast.error("Issue describe karo");
      return;
    }

    const existingRequests = JSON.parse(
      localStorage.getItem("assetflow_maintenance") || "[]",
    );

    const request = {
      id: Date.now(),
      ...form,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "assetflow_maintenance",
      JSON.stringify([request, ...existingRequests]),
    );

    toast.success("Maintenance request submitted");
    navigate("/dashboard");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#714b67] focus:ring-4 focus:ring-purple-100";

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Raise Maintenance Request
        </h1>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <select
            name="asset"
            value={form.asset}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select asset</option>
            <option value="AF-0001 Dell Laptop">
              AF-0001 Dell Laptop
            </option>
            <option value="AF-0002 Epson Projector">
              AF-0002 Epson Projector
            </option>
          </select>

          <textarea
            name="issue"
            value={form.issue}
            onChange={handleChange}
            placeholder="Describe asset issue"
            rows="5"
            className={inputClass}
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-gray-300 px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#714b67] px-5 py-3 font-semibold text-white"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default NewMaintenance;