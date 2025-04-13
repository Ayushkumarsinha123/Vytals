const HospitalDetailInfo = require("../models/hospitalDetailInfoModel");

exports.getAnalytics = async (req, res) => {
  try {
    const hospitals = await HospitalDetailInfo.find();

    // Simulate daily visits for demo
    const dailyVisits = [
      { date: "2025-04-09", visits: 120 },
      { date: "2025-04-10", visits: 135 },
      { date: "2025-04-11", visits: 150 },
      { date: "2025-04-12", visits: 140 },
    ];

    // Queue trends per department (merged across hospitals)
    const departmentQueueMap = {};
    const departmentWaitMap = {};
    let feedbackSummary = { Positive: 60, Negative: 40 }; // Dummy data for now

    hospitals.forEach((hospital) => {
      const departments = hospital.opd?.departments || [];

      departments.forEach((dept) => {
        // For Queue Trends
        departmentQueueMap[dept.name] = (departmentQueueMap[dept.name] || 0) + dept.inQueue;

        // For Waiting Time
        if (!departmentWaitMap[dept.name]) {
          departmentWaitMap[dept.name] = { totalTime: 0, count: 0 };
        }
        departmentWaitMap[dept.name].totalTime += dept.avgTimePerPerson;
        departmentWaitMap[dept.name].count += 1;
      });
    });

    const queueTrends = Object.entries(departmentQueueMap).map(([department, inQueue]) => ({
      department,
      inQueue,
    }));

    const waitingTimes = Object.entries(departmentWaitMap).map(([department, { totalTime, count }]) => ({
      department,
      avgTime: (totalTime / count).toFixed(2),
    }));

    const feedbackData = Object.entries(feedbackSummary).map(([name, value]) => ({
      name,
      value,
    }));

    res.status(200).json({
      status: "success",
      data: {
        dailyVisits,
        queueTrends,
        waitingTimes,
        feedbackSummary: feedbackData,
      },
    });
  } catch (err) {
    console.error("Analytics Fetch Error:", err);
    res.status(500).json({ status: "error", message: "Failed to fetch analytics" });
  }
};
