import {
  CalendarCheck,
  CircleDollarSign,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
function StatCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: any;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div
      className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30"
      style={{ boxShadow: "0 8px 32px -4px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex items-center gap-4">
        <div className="bg-sky-500/10 p-4 rounded-2xl">
          <Icon className="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-white text-2xl font-semibold mt-1">{value}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-sm">{trend}</span>
      </div>
    </div>
  );
}
const dashboard = () => {
  const revenueData = [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 19000 },
    { name: "Mar", value: 15000 },
    { name: "Apr", value: 22000 },
    { name: "May", value: 18000 },
    { name: "Jun", value: 25000 },
  ];

  const bookingsData = [
    { name: "Mon", value: 4 },
    { name: "Tue", value: 3 },
    { name: "Wed", value: 5 },
    { name: "Thu", value: 2 },
    { name: "Fri", value: 4 },
    { name: "Sat", value: 6 },
    { name: "Sun", value: 3 },
  ];

  const bookings = [
    {
      id: 1,
      deceasedName: "Sarah Johnson",
      customerName: "Michael Johnson",
      customerEmail: "michael.johnson@email.com",
      customerPhone: "+1 (555) 123-4567",
      location: "Grace Memorial Chapel",
      date: "March 15, 2025",
      time: "10:00 AM",
      attendees: 120,
      status: "Confirmed",
      services: {
        casket: "Premium Mahogany",
        flowers: "White Lilies & Roses",
        memorial: "Digital Memorial Service",
      },
      additionalNotes:
        "Family requests privacy during the service. Digital memorial link will be shared with attendees.",
      totalPrice: 8500,
      image:
        "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 2,
      deceasedName: "Robert Wilson",
      customerName: "Emily Wilson",
      customerEmail: "emily.wilson@email.com",
      customerPhone: "+1 (555) 234-5678",
      location: "Eternal Peace Cemetery",
      date: "March 16, 2025",
      time: "2:30 PM",
      attendees: 80,
      status: "Pending",
      services: {
        casket: "Classic Oak",
        flowers: "Mixed Seasonal Bouquet",
        memorial: "Traditional Service",
      },
      additionalNotes:
        "Please arrange for live music during the service. Family prefers classical compositions.",
      totalPrice: 6800,
      image:
        "https://images.unsplash.com/photo-1544829832-c8047d6a8d04?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 3,
      deceasedName: "Maria Rodriguez",
      customerName: "Carlos Rodriguez",
      customerEmail: "carlos.rodriguez@email.com",
      customerPhone: "+1 (555) 345-6789",
      location: "Sacred Heart Church",
      date: "March 17, 2025",
      time: "11:15 AM",
      attendees: 150,
      status: "Confirmed",
      services: {
        casket: "Silver Steel",
        flowers: "Red & White Roses",
        memorial: "Hybrid Service",
      },
      additionalNotes:
        "Bilingual service requested. Please ensure all materials are available in both English and Spanish.",
      totalPrice: 7200,
      image:
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  const locations = [...new Set(bookings.map((booking) => booking.location))];
  const statuses = [...new Set(bookings.map((booking) => booking.status))];

  return (
    <div className="py-7">
      <h1 className="text-gradient text-2xl font-bold flex items-center px-7">
        Hello, Juan
        <img src="/waving.png" className="w-16" alt="" />
      </h1>
      <div className="container mx-auto px-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={CircleDollarSign}
            label="Total Revenue"
            value="$22,500"
            trend="+12.5% from last month"
          />
          <StatCard
            icon={CalendarCheck}
            label="Total Bookings"
            value="27"
            trend="+8.1% from last month"
          />
          <StatCard
            icon={UserCheck}
            label="New Customers"
            value="15"
            trend="+15.3% from last month"
          />
          <StatCard
            icon={Users}
            label="Total Attendees"
            value="350"
            trend="+10.2% from last month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-6">
              Revenue Overview
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#A855F7"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-6">
              Weekly Bookings
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar dataKey="value" fill="#0a7efa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Recent Bookings
            </h3>
            <button className="text-sky-400 hover:text-sky-300 transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Service Date</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-gray-700/30">
                    <td className="py-4">{booking.customerName}</td>
                    <td className="py-4">{booking.date}</td>
                    <td className="py-4">{booking.location}</td>
                    <td className="py-4">
                      ${booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === "Confirmed"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
