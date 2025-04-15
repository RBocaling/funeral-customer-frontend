import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

const StatCard = ({
    icon: Icon,
    label,
    value,
    trend,
    additional
  }: {
    icon: any;
    label: string;
    value: string;
      trend?: string;
      additional?: ReactNode
  }) =>{
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
        {
          trend && <div className="mt-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm">{trend}</span>
        </div>
        }
        {additional}
      </div>
    );
}
  
export default StatCard