"use client";

import React from "react";

const DropDown = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-input border bg-background px-3 py-2 focus:ring-blue-200 mb-2 w-fit"
    >
      {options.map((option, index) => (
        <option key={`${name}_${index}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
