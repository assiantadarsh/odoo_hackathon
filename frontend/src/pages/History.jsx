import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const demoAssets = [
  {
    id: 1,
    assetTag: "AF-0001",
    name: "Dell Laptop",
    category: "Electronics",
    status: "Available",
    date: "12 July 2026",
  },
  {
    id: 2,
    assetTag: "AF-0002",
    name: "Epson Projector",
    category: "Electronics",
    status: "Available",
    date: "11 July 2026",
  },
];

const demoAllocations = [
  {
    id: 1,
    assetTag: "AF-0014",
    asset: "Dell Latitude 5420",
    employee: "Raj Kumar",
    allocatedOn: "10 July 2026",
    expectedReturn: "20 July 2026",
    status: "Allocated",
  },
  {
    id: 2,
    assetTag: "AF-0018",
    asset: "HP Laptop",
    employee: "Anjali Verma",
    allocatedOn: "8 July 2026",
    expectedReturn: "18 July 2026",
    status: "Allocated",
  },
];

const demoMaintenance = [
  {
    id: 1,
    assetTag: "AF-0003",
    asset: "Toyota Innova",
    issue: "Brake inspection",
    priority: "High",
    createdAt: "12 July 2026",
    status: "In Progress",
  },
  {
    id: 2,
    assetTag: "AF-0022",
    asset: "Office Printer",
    issue: "Paper jam issue",
    priority: "Medium",
    createdAt: "11 July 2026",
    status: "Pending",
  },
];

const demoBookings = [
  {
    id: 1,
    resource: "Conference Room B2",
    bookedBy: "Marketing Team",
    startTime: "12 July 2026, 2:00 PM",
    endTime: "12 July 2026, 3:00 PM",
    status: "Upcoming",
  },
  {
    id: 2,
    resource: "Toyota Innova",
    bookedBy: "Operations Team",
    startTime: "13 July 2026, 10:00 AM",
    endTime: "13 July 2026, 1:00 PM",
    status: "Upcoming",
  },
];

function History() {
  const navigate = useNavigate();
  const { type } = useParams();

  const pageData = useMemo(() => {
    const savedAssets = JSON.parse(
      localStorage.getItem("assetflow_assets") || "[]",
    );

    const savedBookings = JSON.parse(
      localStorage.getItem("assetflow_bookings") || "[]",
    );

    const savedMaintenance = JSON.parse(
      localStorage.getItem("assetflow_maintenance") || "[]",
    );

    switch (type) {
      case "available":
        return {
          title: "Available Assets History",
          description: "Currently available assets ki list.",
          data: savedAssets.length ? savedAssets : demoAssets,
          columns: [
            { key: "assetTag", label: "Asset Tag" },
            { key: "name", label: "Asset Name" },
            { key: "category", label: "Category" },
            { key: "location", label: "Location" },
            { key: "status", label: "Status" },
          ],
        };

      case "allocated":
        return {
          title: "Allocation History",
          description: "Employees ko allocated assets ki history.",
          data: demoAllocations,
          columns: [
            { key: "assetTag", label: "Asset Tag" },
            { key: "asset", label: "Asset" },
            { key: "employee", label: "Employee" },
            { key: "allocatedOn", label: "Allocated On" },
            { key: "expectedReturn", label: "Expected Return" },
            { key: "status", label: "Status" },
          ],
        };

      case "maintenance":
        return {
          title: "Maintenance History",
          description: "All maintenance requests aur unka status.",
          data: savedMaintenance.length
            ? savedMaintenance
            : demoMaintenance,
          columns: [
            { key: "assetTag", label: "Asset Tag" },
            { key: "asset", label: "Asset" },
            { key: "issue", label: "Issue" },
            { key: "priority", label: "Priority" },
            { key: "status", label: "Status" },
          ],
        };

      case "bookings":
        return {
          title: "Booking History",
          description: "Shared resources ki booking history.",
          data: savedBookings.length ? savedBookings : demoBookings,
          columns: [
            { key: "resource", label: "Resource" },
            { key: "bookedBy", label: "Booked By" },
            { key: "startTime", label: "Start Time" },
            { key: "endTime", label: "End Time" },
            { key: "status", label: "Status" },
          ],
        };

      default:
        return {
          title: "History",
          description: "No history found.",
          data: [],
          columns: [],
        };
    }
  }, [type]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-5 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <section className="rounded-2xl bg-white shadow-sm">
          <header className="border-b border-gray-200 px-6 py-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {pageData.title}
            </h1>

            <p className="mt-2 text-gray-500">
              {pageData.description}
            </p>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  {pageData.columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-sm font-semibold text-gray-600"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {pageData.data.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    {pageData.columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        {item[column.key] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pageData.data.length === 0 && (
            <div className="px-6 py-16 text-center text-gray-500">
              Abhi koi history available nahi hai.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default History;