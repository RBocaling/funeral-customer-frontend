import StatCard from "@/components/dashboard/StaCard";
import { Badge } from "@/components/ui/badge";
import { bookingsData, revenueData } from "@/lib/constants";
import { dashboardBookings, dashboardTransactions } from "@/lib/mockdata";
import { Bath, CircleDollarSign, FolderDot, Users } from "lucide-react";
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

const dashboard = () => {
  return (
    <div className="container px-5s mx-auto">
      <h1 className="text-gradient text-2xl font-bold flex items-center px-7">
        Hello, Juan
        <img src="/waving.png" className="w-16" alt="" />
      </h1>
      <div className="container mx-auto px-5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={CircleDollarSign}
            label="Total Transaction"
            value="25"
            additional={
              <div className="flex items-center gap-7 mt-5">
                {dashboardTransactions.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <Badge className="absolute -top-4 -right-4 bg-violet-500/10 h-7 w-7 text-violet-500 rounded-full animate-bounce">
                      {item.value}
                    </Badge>
                    <p className="text-sm font-medium tracking-wide">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            }
          />
          <StatCard
            icon={FolderDot}
            label="Total Active Bookings"
            value="10"
            trend="+8.1% from last month"
          />
          <StatCard
            icon={Users}
            label="Total Family"
            value="15"
            trend="+15.3% from last month"
          />
          <StatCard
            icon={Bath}
            label="Total Services"
            value="350"
            trend="+10.2% from last month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-6">
              Revenue Overview
            </h3>
            <div className="h-[150px] md:h-[300px]">
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
            <div className="h-[150px] md:h-[300px]">
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

        <div className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30 overflow-x-auto">
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
                {dashboardBookings.map((booking) => (
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
