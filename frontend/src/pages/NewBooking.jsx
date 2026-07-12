import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function NewBooking() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    resource: "",
    startTime: "",
    endTime: "",
    purpose: "",
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

    if (!form.resource) {
      toast.error("Resource select karo");
      return;
    }

    if (!form.startTime || !form.endTime) {
      toast.error("Start aur end time select karo");
      return;
    }

    if (new Date(form.endTime) <= new Date(form.startTime)) {
      toast.error("End time start time ke baad hona chahiye");
      return;
    }

    const existingBookings = JSON.parse(
      localStorage.getItem("assetflow_bookings") || "[]",
    );

    const overlap = existingBookings.some((booking) => {
      return (
        booking.resource === form.resource &&
        new Date(form.startTime) < new Date(booking.endTime) &&
        new Date(form.endTime) > new Date(booking.startTime)
      );
    });

    if (overlap) {
      toast.error("Resource selected time par already booked hai");
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...form,
      status: "Upcoming",
    };

    localStorage.setItem(
      "assetflow_bookings",
      JSON.stringify([newBooking, ...existingBookings]),
    );

    toast.success("Resource booked successfully");
    navigate("/dashboard");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#714b67] focus:ring-4 focus:ring-purple-100";

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Book Resource
        </h1>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <select
            name="resource"
            value={form.resource}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select resource</option>
            <option value="Conference Room B2">
              Conference Room B2
            </option>
            <option value="Projector AF-0021">
              Projector AF-0021
            </option>
            <option value="Toyota Innova">
              Toyota Innova
            </option>
          </select>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Start Time
            </label>

            <input
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              End Time
            </label>

            <input
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <textarea
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="Booking purpose"
            rows="4"
            className={inputClass}
          />

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
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default NewBooking;