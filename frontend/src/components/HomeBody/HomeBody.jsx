import { useEffect, useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import api from "../../services/api";
import revenueIcon from "../../assets/revenueIcon.svg";
import expenseIcon from "../../assets/expenseIcon.svg";
import customersIcon from "../../assets/customersIcon.svg";
import { useNavigate } from "react-router-dom";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

function HomeBody() {
  const [data, setData] = useState({
    todayIncome: undefined,
    todayExpense: undefined,
    todayCustomerCount: undefined,
    yesterdayIncome: undefined,
  });
  const [showShade, setShowShade] = useState(false);
  const [showIncome, setShowIncome] = useState();
  const [showExpense, setShowExpense] = useState();
  const navigate = useNavigate();

  // Spring animations for numbers with scaling effect
  const todayIncomeSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.todayIncome, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  const todayExpenseSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.todayExpense, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  const todayCustomerCountSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.todayCustomerCount, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  const yesterdayIncomeSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.yesterdayIncome, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  // Transition effect for shading
  const transitions = useTransition(showShade, {
    from: { backgroundColor: "transparent" },
    enter: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
    leave: { backgroundColor: "transparent" },
    config: { duration: 500 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.getTodayIncomeAndExpense();
        if (!result.error) {
          setData(result)
          console.log(result)
          setShowShade(true); // Trigger shading effect
          setTimeout(() => setShowShade(false), 500); // Reset shading after animation
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const result = await api.showIncome();
        console.log("result of income", result.data);

        if (Array.isArray(result.data)) {
          setShowIncome(result.data);
        } else {
          console.error("Income data is not an array:", result.data);
          setShowIncome([]); // Reset to empty array
        }
      } catch (error) {
        console.log(error);
        setShowIncome([]); // Reset to empty array on error
      }

      try {
        const result = await api.showExpense();
        console.log("result of expense", result.data);

        if (Array.isArray(result.data)) {
          setShowExpense(result.data);
        } else {
          console.error("Expense data is not an array:", result.data);
          setShowExpense([]); // Reset to empty array
        }
      } catch (error) {
        console.log(error);
        setShowExpense([]); // Reset to empty array on error
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-[#23346c] text-white p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-stretch">
        {/* Card 1 - Today's Revenue */}
        <div className="bg-[#00144c] p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
          {transitions(
            (styles, item) =>
              item && (
                <animated.div
                  style={styles}
                  className="absolute inset-0 rounded-xl"
                />
              )
          )}
          <div className="flex flex-row justify-between">
            <h2 className="text-lg text-[#ffeda5] mb-2">Today's Revenue</h2>
            <div className="px-0.5 py-0.5 border border-[#ffeda5] rounded-md">
              <img src={revenueIcon} alt="" />
            </div>
          </div>
          {data.todayIncome || data.todayIncome == 0 ? <p className="text-2xl font-bold">
            <animated.span
              style={{
                transform: todayIncomeSpring.scale.to((s) => `scale(${s})`),
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
              }}
              className="number-glance-effect"
            >
              {todayIncomeSpring.number.to((n) =>
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(n.toFixed(0))
              )}
            </animated.span>
          </p> : <SpinnerOnly />}

          {/* Graph */}
          <div className="flex justify-between items-end mt-4 h-[135px]">
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[135px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[91px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[74px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[91px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[135px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[83px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[118px] w-[35px] rounded-3xl"></div>
          </div>
        </div>

        {/* Card 2 - Today's Expenses */}
        <div className="bg-[#00144c] p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
          {transitions(
            (styles, item) =>
              item && (
                <animated.div
                  style={styles}
                  className="absolute inset-0 rounded-xl"
                />
              )
          )}
          <div className="flex flex-row justify-between">
            <h2 className="text-lg text-[#ffeda5] mb-2">Today's Expenses</h2>
            <div className="px-0.5 py-0.5 border border-[#ffeda5] rounded-md">
              <img src={expenseIcon} alt="" />
            </div>
          </div>
          {data.todayExpense || data.todayExpense == 0 ? <p className="text-2xl font-bold">
            <animated.span
              style={{
                transform: todayExpenseSpring.scale.to((s) => `scale(${s})`),
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
              }}
              className="number-glance-effect"
            >
              {todayExpenseSpring.number.to((n) =>
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(n.toFixed(0))
              )}
            </animated.span>
          </p> : <SpinnerOnly />}

          {/* Graph */}
          <div className="flex justify-between items-end mt-4 h-[135px]">
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[87px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[129px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[70px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[119px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[87px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[79px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[112px] w-[35px] rounded-3xl"></div>
          </div>
        </div>

        {/* On large screen start*/}
        <div className="space-y-4 sm:flex-row">
          {/* Card 3 - Today's Customers */}
          <div className="bg-[#00144c] p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div
                    style={styles}
                    className="absolute inset-0 rounded-xl"
                  />
                )
            )}
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-[#ffeda5] mb-2">Today's Customers</h2>
              <div className="px-0.5 py-0.5 border border-[#ffeda5] rounded-md">
                <img src={customersIcon} alt="" />
              </div>
            </div>
            {data.todayCustomerCount || data.todayCustomerCount == 0 ? <p className="text-2xl font-bold">
              <animated.span
                style={{
                  transform: todayCustomerCountSpring.scale.to(
                    (s) => `scale(${s})`
                  ),
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                }}
                className="number-glance-effect"
              >
                {todayCustomerCountSpring.number.to((n) => n.toFixed(0))}
              </animated.span>
            </p> : <SpinnerOnly />}

            <p className="invisible">hello</p>
          </div>

          {/* Card 4 - Yesterday's Revenue */}
          <div className="bg-[#00144c] p-6 rounded-xl flex flex-col justify-between relative overflow-hidden sm:hidden lg:flex">
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div
                    style={styles}
                    className="absolute inset-0 rounded-xl"
                  />
                )
            )}
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-[#ffeda5] mb-2">
                Yesterday's Revenue
              </h2>
              <div className="px-0.5 py-0.5 border border-[#ffeda5] rounded-md">
                <img src={revenueIcon} alt="" />
              </div>
            </div>
            {data.yesterdayIncome || data.yesterdayIncome == 0 ? <p className="text-2xl font-bold">
              <animated.span
                style={{
                  transform: yesterdayIncomeSpring.scale.to(
                    (s) => `scale(${s})`
                  ),
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                }}
                className="number-glance-effect"
              >
                {yesterdayIncomeSpring.number.to((n) =>
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(n.toFixed(0))
                )}
              </animated.span>
            </p> : <SpinnerOnly />}

            <p className="invisible">hello</p>
          </div>
        </div>
        {/* On large screen end */}

        {/* On small screen start */}
        {/* <div className="bg-[#00144c] p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div
                    style={styles}
                    className="absolute inset-0 rounded-xl"
                  />
                )
            )}
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-[#ffeda5] mb-2">Today's Customers</h2>
              <div className="px-0.5 py-0.5 border border-[#ffeda5] rounded-md">
                <img src={customersIcon} alt="" />
              </div>
            </div>
            {data.todayCustomerCount || data.todayCustomerCount == 0 ? <p className="text-2xl font-bold">
              <animated.span
                style={{
                  transform: todayCustomerCountSpring.scale.to(
                    (s) => `scale(${s})`
                  ),
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                }}
                className="number-glance-effect"
              >
                {todayCustomerCountSpring.number.to((n) => n.toFixed(0))}
              </animated.span>
            </p> : <SpinnerOnly />}

            <p className="invisible">hello</p>
          </div> */}

          {/* Card 4 - Yesterday's Revenue */}
          <div className="hidden bg-[#00144c] p-6 rounded-xl flex-col justify-between relative overflow-hidden lg:hidden xl:hidden sm:flex">
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div
                    style={styles}
                    className="absolute inset-0 rounded-xl"
                  />
                )
            )}
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-[#ffeda5] mb-2">
                Yesterday's Revenue
              </h2>
              <div className="px-0.5 py-0.5 border border-[#ffeda5] rounded-md">
                <img src={revenueIcon} alt="" />
              </div>
            </div>
            {data.yesterdayIncome || data.yesterdayIncome == 0 ? <p className="text-2xl font-bold">
              <animated.span
                style={{
                  transform: yesterdayIncomeSpring.scale.to(
                    (s) => `scale(${s})`
                  ),
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                }}
                className="number-glance-effect"
              >
                {yesterdayIncomeSpring.number.to((n) =>
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(n.toFixed(0))
                )}
              </animated.span>
            </p> : <SpinnerOnly />}

            <p className="invisible">hello</p>
          </div>
          {/* On small screen end */}
      </div>
      <div className="mt-8">
        <div className="flex justify-between px-3">
          <h2 className="text-lg text-[#ffeda5] mb-4">Recent Income</h2>
          <button className="text-[#ffeda5]" onClick={() => navigate('/income')}>View All</button>
        </div>
        <div className="bg-[#00144c] p-6 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-[#ffeda5]">Date</th>
                <th className="text-[#ffeda5]">Customer Name</th>
                <th className="text-[#ffeda5]">Vehicle Number</th>
                <th className="text-[#ffeda5]">Payment Type</th>
                <th className="text-[#ffeda5]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {!showIncome ? (
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  <SpinnerOnly />
                </td>
              ) : (
                Array.isArray(showIncome) &&
                showIncome
                  .sort((a, b) => new Date(b.workDate) - new Date(a.workDate)) // Sort by date, latest first
                  .slice(0, 5)
                  .map((income, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td>{formatDate(income.workDate)}</td>
                      <td>{income.customerName}</td>
                      <td>{income.vehicleNumber}</td>
                      <td>{income.paymentMethod}</td>
                      <td>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(income.totalServiceCost)}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between px-3">
          <h2 className="text-lg text-[#ffeda5] mb-4">Recent Expense</h2>
          <button className="text-[#ffeda5]" onClick={() => navigate('/expense')}>View All</button>
        </div>
        <div className="bg-[#00144c] p-6 rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-[#ffeda5]">Date</th>
                <th className="text-[#ffeda5]">Payee Name</th>
                <th className="text-[#ffeda5]">Expense Type</th>
                <th className="text-[#ffeda5]">Payment Type</th>
                <th className="text-[#ffeda5]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {!showExpense ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    <SpinnerOnly />
                  </td>
                </tr>
              ) : (
                Array.isArray(showExpense) &&
                showExpense
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, latest first
                  .slice(0, 5)
                  .map((expense, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td>{formatDate(expense.date)}</td>
                      <td>{expense.payeeName}</td>
                      <td>{expense.expenseType}</td>
                      <td>{expense.paymentMethod}</td>
                      <td>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(expense.totalExpense)}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeBody;
