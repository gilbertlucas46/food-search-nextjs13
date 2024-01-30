import { NoMatchProps } from "@/types";
import React from "react";

const NoMatch = ({ category, search }: NoMatchProps) => {
  return (
    <p>
      No Match found
      {search && (
        <>
          {" for search key: "}
          <strong>{search}</strong>
        </>
      )}
      {category && (
        <>
          {search ? "," : ""} {" category: "}
          <strong>{category}</strong>
        </>
      )}
    </p>
  );
};

export default NoMatch;
