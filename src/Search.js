import React from "react";

export default function Search(props) {
  return (
    <form>
      <input
        name="search"
        placeholder="Ara.."
        value={props.search}
        onChange={props.handleChange}
      />
    </form>
  );
}
