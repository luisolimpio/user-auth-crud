import React from "react";

import "./styles.css";

function Select({ value, options, name, ...rest }) {
  return (
    <div className="select-block">
      <select value={value} id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
