import React, { useState } from "react";
import IncomeBody from "../../components/Income Body/IncomeBody";
import Navbar from "../../components/Navbar/Navbar";
import AddIncome from "../../components/Add Income/AddIncome";

const Income = () => {
  const [addIncomeModal, setAddIncomeModal] = useState(false);
  return (
    <>
      <Navbar setAddIncomeModal={setAddIncomeModal} />
      <IncomeBody addIncomeModal={addIncomeModal} />
      {addIncomeModal && <AddIncome setAddIncomeModal={setAddIncomeModal} />}
    </>
  );
};

export default Income;
