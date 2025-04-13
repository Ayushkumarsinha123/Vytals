import React, { useEffect, useState } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#0088FE"];

const HospitalAnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    dailyVisits: [],
    queueTrends: [],
    waitingTimes: [],
    feedbackSummary: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:6010/api/v1/analytics");
        const data = await res.json();
        console.log("Analytics Response:", data);

        setAnalyticsData({
          dailyVisits: data?.data?.dailyVisits || [],
          queueTrends: data?.data?.queueTrends || [],
          waitingTimes: data?.data?.waitingTimes || [],
          feedbackSummary: data?.data?.feedbackSummary || [],
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  console.log(analyticsData);

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 min-h-screen p-8 space-y-10">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
        Hospital Analytics Dashboard 📊
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Daily OPD Visits */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Daily OPD Visits</h2>
          <LineChart width={350} height={250} data={analyticsData.dailyVisits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#00C49F" />
          </LineChart>
        </div>

        {/* Queue Trends */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Queue Trends</h2>
          <BarChart width={350} height={250} data={analyticsData.queueTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="inQueue" fill="#0088FE" />
          </BarChart>
        </div>

        {/* Avg Waiting Time */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Avg Waiting Time</h2>
          <BarChart width={350} height={250} data={analyticsData.waitingTimes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="avgTime" fill="#FFBB28" />
          </BarChart>
        </div>

        {/* Feedback Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Feedback Overview</h2>
          <PieChart width={300} height={250}>
            <Pie
              data={analyticsData.feedbackSummary}
              cx={150}
              cy={100}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {analyticsData.feedbackSummary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default HospitalAnalyticsDashboard;
