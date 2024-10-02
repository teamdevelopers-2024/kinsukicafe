import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import IncomeDownloadButton from "./IncomeDownloadButton";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function IncomeChart({ incomeHistoryData, setIsModalOpen , isLoading}) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const Year = currentDate.getFullYear();

  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [currentYear, setCurrentYear] = useState(Year); // Use the renamed variable
  const [totalIncome, setTotalIncome] = useState();
  const [periodIncome, setPeriodIncome] = useState(); // State for selected time period income

  useEffect(() => {
    const total = incomeHistoryData.reduce((accumulator, entry) => {
      const serviceCost = entry.totalServiceCost;
      return accumulator + serviceCost;
    }, 0);
      setTotalIncome(total);


    // Calculate period income based on selected time period
    const calculatePeriodIncome = () => {
      if (timePeriod === "Monthly") {
        return incomeHistoryData.reduce((total, entry) => {
          const workDate = new Date(entry.workDate);
          return workDate.getMonth() === currentMonth &&
            workDate.getFullYear() === currentYear
            ? total + entry.totalServiceCost
            : total;
        }, 0);
      } else if (timePeriod === "Daily") {
        const today = new Date();
        return incomeHistoryData.reduce((total, entry) => {
          const workDate = new Date(entry.workDate);
          const dayIndex = Math.floor(
            (today - workDate) / (1000 * 60 * 60 * 24)
          );
          return dayIndex >= 0 && dayIndex < 7
            ? total + entry.totalServiceCost
            : total;
        }, 0);
      } else if (timePeriod === "Yearly") {
        return incomeHistoryData.reduce((total, entry) => {
          const workDate = new Date(entry.workDate);
          return workDate.getFullYear() === currentYear
            ? total + entry.totalServiceCost
            : total;
        }, 0);
      }
      return 0; // Default case
    };

    setPeriodIncome(calculatePeriodIncome());
  }, [incomeHistoryData, timePeriod, currentMonth, currentYear]);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
    if (event.target.value !== "Monthly") {
      setCurrentYear(new Date().getFullYear()); // Reset to current year when switching from Monthly
    }
  };

  const getMonthlyData = () => {
    const monthlyIncome = Array(12).fill(0);
    const currentYearData = incomeHistoryData.filter(
      (entry) => new Date(entry.workDate).getFullYear() === currentYear
    );

    currentYearData.forEach((entry) => {
      const entryDate = new Date(entry.workDate);
      const month = entryDate.getMonth();
      monthlyIncome[month] += entry.totalServiceCost || 0;
    });

    return monthlyIncome.map((income, index) => ({
      name: new Date(0, index).toLocaleString("default", { month: "short" }),
      income,
    }));
  };

  const getDailyData = () => {
    const today = new Date();
    const last7Days = Array(7).fill(0);
    const labels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = date.toLocaleString("default", { weekday: "short" });
      labels.push(dayName);
    }

    incomeHistoryData.forEach((entry) => {
      const entryDate = new Date(entry.workDate);
      const dayIndex = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 7) {
        last7Days[6 - dayIndex] += entry.totalServiceCost || 0;
      }
    });

    return labels.map((label, index) => ({
      name: label,
      income: last7Days[index],
    }));
  };

  const getYearlyData = () => {
    const yearlyIncome = Array(5).fill(0);
    const labels = [];

    for (let i = 0; i < 5; i++) {
      const year = currentYear - 4 + i; // Generate years from currentYear - 4 to currentYear
      labels.push(year);
    }

    incomeHistoryData.forEach((entry) => {
      const entryDate = new Date(entry.workDate);
      const yearIndex = entryDate.getFullYear() - (currentYear - 4);

      if (yearIndex >= 0 && yearIndex < 5) {
        yearlyIncome[yearIndex] += entry.totalServiceCost || 0; // Parse amount correctly
      }
    });

    return labels.map((label, index) => ({
      name: label,
      income: yearlyIncome[index],
    }));
  };

  const graphData =
    timePeriod === "Monthly"
      ? getMonthlyData()
      : timePeriod === "Daily"
        ? getDailyData()
        : getYearlyData();

  const labels = graphData.map((data) => data.name);
  const incomeValues = graphData.map((data) => data.income);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        borderColor: "#00d8ff",
        backgroundColor: "rgba(0, 216, 255, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const handlePrevYear = () => {
    if (currentYear > new Date().getFullYear() - 5) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleNextYear = () => {
    if (currentYear < new Date().getFullYear()) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };
  return (
    <>
      <div className="bg-[#00144c] p-8 rounded-xl flex justify-between items-center mb-8">
        <div className="text-left space-y-3 w-1/3">
          <h2 className="text-5xl font-bold text-[#ffeda5]">Total income</h2>
          <h3 className="text-3xl text-green-300 font-bold">
            {!isLoading ? new Intl.NumberFormat("en-IN", {
              style: "currency",
            currency: "INR",
            }).format(totalIncome) :<SpinnerOnly/>}
          </h3>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
          <h2 className="text-3xl font-bold text-[#ffeda5]">
            {timePeriod} income
          </h2>
          <h3 className="text-3xl text-green-300 font-bold">
          {!isLoading ? new Intl.NumberFormat("en-IN", {
              style: "currency",
            currency: "INR",
            }).format(periodIncome) :<SpinnerOnly/>}
          </h3>
          {/* Download Button Here */}
          <IncomeDownloadButton setIsModalOpen={setIsModalOpen} />
        </div>

        <div className="w-2/4 relative">
          <div className="absolute z-10 bottom--4 left-0 p-2">
            <div className="bg-gray-700 px-1.5 py-1.5 rounded-full text-cyan-500">
              <select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="cursor-pointer bg-gray-700 rounded-full text-cyan-500 outline-none"
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div
            className="mt-5"
            style={{ width: "100%", height: "300px", marginBottom: "45px" }}
          >
            <div className="flex justify-center mb-2 text-gray-300">
              {timePeriod === "Daily" ? (
                <span className="text-lg font-semibold">Last 7 Days</span>
              ) : timePeriod === "Monthly" ? (
                <span className="text-lg font-semibold">{currentYear}</span>
              ) : (
                <span className="text-lg font-semibold">Last 5 Years</span>
              )}
            </div>

            {timePeriod === "Monthly" && (
              <>
                <div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                  style={{
                    marginLeft: "-8%",
                    width: "6%",
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={handlePrevYear} className="text-[#ffeda5]">
                    <FaChevronLeft />
                  </button>
                </div>
                <div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full text-cyan-400 hover:bg-gray-600 transition"
                  style={{
                    marginRight: "1%",
                    width: "6%",
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={handleNextYear} className="text-[#ffeda5]">
                    <FaChevronRight />
                  </button>
                </div>
              </>
            )}

            <Line
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: "#333",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false, // Disable x-axis grid lines
                    },
                    ticks: {
                      color: "#999", // X-axis label color
                    },
                  },
                  y: {
                    display: false, // Hide the entire y-axis including labels
                    grid: {
                      display: false, // Disable y-axis grid lines
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomeChart;
