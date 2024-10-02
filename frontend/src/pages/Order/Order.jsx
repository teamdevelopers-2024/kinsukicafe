import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddIncome from "../../components/Add Income/AddIncome";
import OrderBody from "../../components/OrderBody/OrderBody";

const Order = () => {
  const [addIncomeModal, setAddIncomeModal] = useState(false);
  return (
    <>
      <Navbar setAddIncomeModal={setAddIncomeModal} />
      <OrderBody addIncomeModal={addIncomeModal} />
      {addIncomeModal && <AddIncome setAddIncomeModal={setAddIncomeModal} />}
    </>
  );
};

export default Order;
