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

function IncomeChart({ incomeHistoryData, setIsModalOpen, isLoading }) {
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
      <div className="bg-[#00144c] p-4 lg:p-8 rounded-xl flex flex-row justify-between items-center mb-8">
  {/* Left Section */}
  <div className="text-left space-y-3 w-full lg:w-1/3 mb-6 lg:mb-0">
    <h2 className="text-lg lg:text-4xl font-bold text-[#ffeda5]">Total income</h2>
    <h3 className="text-sm lg:text-2xl text-green-300 font-bold">
      {!isLoading
        ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(totalIncome)
        : <SpinnerOnly />}
    </h3>
    <p className="text-xs lg:text-base text-gray-500">{new Date().toLocaleDateString()}</p>
    <h2 className="text-sm lg:text-3xl font-bold text-[#ffeda5]">{timePeriod} income</h2>
    <h3 className="text-sm lg:text-2xl text-green-300 font-bold">
      {!isLoading
        ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(periodIncome)
        : <SpinnerOnly />}
    </h3>
    {/* Download Button */}
    <IncomeDownloadButton setIsModalOpen={setIsModalOpen} />
  </div>

  {/* Right Section */}
  <div className="w-full lg:w-2/4 flex flex-col justify-center items-center">
    {/* Time Period Selector */}
    <div className="flex justify-between mb-4 w-full">
      <div className="bg-gray-700 px-1 py-0.5 rounded-full text-cyan-500">
        <select
          value={timePeriod}
          onChange={handleTimePeriodChange}
          className="text-xs lg:text-sm cursor-pointer bg-gray-700 rounded-full text-cyan-500 outline-none"
        >
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      {/* Chart Header */}
      <div className="text-gray-300 text-center mb-2">
        {timePeriod === "Daily" ? (
          <span className="text-sm lg:text-base font-semibold">Last 7 Days</span>
        ) : timePeriod === "Monthly" ? (
          <span className="text-sm lg:text-base font-semibold">{currentYear}</span>
        ) : (
          <span className="text-sm lg:text-base font-semibold">Last 5 Years</span>
        )}
      </div>

      <div className="w-[15%]"></div>
    </div>

    {/* Chart with Navigation */}
    <div className="flex items-center justify-between w-full">
      {/* Left Arrow */}
      {timePeriod === "Monthly" && (
        <button
          onClick={handlePrevYear}
          className="bg-gray-700 p-2 rounded-full text-cyan-400 hover:bg-gray-600 transition hidden sm:flex"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Line Chart */}
      <div className="flex-1 mx-2 lg:mx-4" style={{ height: "250px", width: "100%" }}>
        <Line
          data={data}
          options={{
            elements: {
              point: {
                hitRadius: 20,
                radius:4,
                drawActiveElementsOnTop:true
              },
            },
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
                  font: {
                    size: 10,
                  },
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

      {/* Right Arrow */}
      {timePeriod === "Monthly" && (
        <button
          onClick={handleNextYear}
          className="bg-gray-700 p-2 rounded-full text-cyan-400 hover:bg-gray-600 transition hidden sm:flex"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  </div>
</div>


    </>
  );
}

export default IncomeChart;
