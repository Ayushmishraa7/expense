import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPathName } from "util";
import { getExpensesByTripId } from "api/expenses";

export default () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: expenses, loading, error } = getExpensesByTripId();

  if (loading) return "Loading...,";

  if (error) return "Expenses not found";

  return (
    <div className="d-flex flex-grow-1 position-relative">
      <div className="d-flex flex-wrap">
        {expenses.map((expense, key) => (
          <Link
            key={key}
            className="w-50 p-3 td-none d-flex justify-content-center"
            to={getPathName(pathname, expense.id)}
          >
            {JSON.stringify(expense, null, 2)}
          </Link>
        ))}
      </div>
      <Link
        to={getPathName(pathname, "add")}
        className="flex-center position-absolute z-index-2 rounded-circle bg-primary text-white p-3 td-none m-3"
        style={{ right: 0, bottom: 0 }}
      >
        +
      </Link>
    </div>
  );
};
