import React from "react";
import { BsSearch } from "react-icons/bs";
import "./Search.styles.css";

export default function ({ onVisibleChange }) {
  const inputRef = React.useRef<any>();
  return (
    <div className="search-box">
      <button className="btn-search" onClick={() => inputRef.current?.focus()}>
        <BsSearch className="btn search-icon" />
      </button>
      <input
        ref={inputRef}
        className="input-search"
        type="text"
        placeholder="Cautare..."
        onFocus={() => onVisibleChange(true)}
        onBlur={() => onVisibleChange(false)}
      />
    </div>
  );
}
