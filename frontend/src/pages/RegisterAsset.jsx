import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterAsset() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    serialNumber: "",
    location: "",
    condition: "Good",
    isBookable: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Asset name enter karo");
      return;
    }

    if (!form.category) {
      toast.error("Category select karo");
      return;
    }

    if (!form.location.trim()) {
      toast.error("Location enter karo");
      return;
    }

    const existingAssets = JSON.parse(
      localStorage.getItem("assetflow_assets") || "[]",
    );

    const newAsset = {
      id: Date.now(),
      assetTag: `AF-${String(existingAssets.length + 1).padStart(4, "0")}`,
      ...form,
      status: "Available",
    };

    localStorage.setItem(
      "assetflow_assets",
      JSON.stringify([newAsset, ...existingAssets]),
    );

    toast.success(`Asset ${newAsset.assetTag} registered`);
    navigate("/dashboard");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#714b67] focus:ring-4 focus:ring-purple-100";

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Register Asset
        </h1>

        <p className="mt-2 text-gray-500">
          New organization asset add karo.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Asset Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Dell Laptop"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Serial Number
            </label>

            <input
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              placeholder="SN-1001"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Second Floor"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Condition
            </label>

            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
            <input
              type="checkbox"
              name="isBookable"
              checked={form.isBookable}
              onChange={handleChange}
            />

            Shared / Bookable Resource
          </label>

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
              Save Asset
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RegisterAsset;