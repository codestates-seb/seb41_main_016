import React from "react";
import { PacmanLoader } from "react-spinners/PacmanLoader";

export default function Loading() {
  return (
    <div>
      <PacmanLoader color="#20b2aa" size={0} speedMultiplier={1} />
    </div>
  );
}
