import axios from "axios";


const api = axios.create({
  baseURL: "https://sealand-api.vercel.app/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})


// Log the constructed URL for debugging
const logRequestURL = (endpoint) => {
  const url = `${api.defaults.baseURL}${endpoint}`;
  console.log("Request URL is:", url); // Log the full request URL
  return url;
};

// Login function
async function login(body) {
  try {
    const response = await api.post("/login", body);
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request failed:", {
      message: error.message,
      config: error.config,
      response: error.response ? error.response.data : null,
    });
    return error.response ? error.response.data : "Network error";
  }
}

// Add Income function
async function addIncome(body) {
  try {
    const response = await api.post("/addIncome", body);
    console.log("Income result:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding income:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Add Customer function
async function addCustomer(data) {
  try {
    console.log(data);
    const response = await api.post("/addcustomer", data);
    console.log("Data submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting the data:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Show Income function
async function showIncome() {
  try {
    const response = await api.get("/incomehistory");
    console.log("Income history:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching income history data", error);
    return "Network error";
  }
}

// Add Expense function
async function addExpense(body) {
  try {
    const response = await api.post("/addExpense", body);
    console.log("Expense result:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Show Expense function
async function showExpense() {
  try {
    const response = await api.get("/getExpenses");
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Show Customers function
async function showCustomers() {
  try {
    const response = await api.get("/getCustomers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Repayment function
async function repayment(customer, details) {
  try {
    const response = await api.put("/repayment", { customer, details });
    console.log("Repayment response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error processing repayment:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Get Today's Income and Expense function
async function getTodayIncomeAndExpense() {
  try {
    const response = await api.get("/getTodayIncomeAndExpense");
    return response.data;
  } catch (error) {
    console.error("Error fetching today's income and expense:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Add Credit function
async function addCredit(body) {
  try {
    const response = await api.post("/addCredit", body);
    console.log("Credit response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding credit:", error);
    return error.response ? error.response.data : "Network error";
  }
}

// Exporting functions
export default {
  login,
  addIncome,
  addCustomer,
  showIncome,
  addExpense,
  showExpense,
  showCustomers,
  repayment,
  getTodayIncomeAndExpense,
  addCredit,
};
