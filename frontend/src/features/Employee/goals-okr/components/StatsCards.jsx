import {
  Target,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Active Goals",
    value: 8,
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Completed",
    value: 5,
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Overdue",
    value: 1,
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    title: "Average Progress",
    value: "72%",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-5`}
            >
              <Icon className={item.color} size={28} strokeWidth={2.3} />
            </div>

            {/* Title */}
            <p className="text-gray-500 text-sm font-medium">
              {item.title}
            </p>

            {/* Value */}
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;