import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, to, onClick, className = "" }) {
  const baseStyle =
    "px-6 py-2 rounded-lg shadow text-white hover:opacity-90 transition ";

  if (to) {
    return (
      <Link to={to} className={baseStyle + className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle + className}>
      {children}
    </button>
  );
}
