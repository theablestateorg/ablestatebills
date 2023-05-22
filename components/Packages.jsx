import React from "react";
import Starter from "./Starter";
import Stablizer from "./Stablizer";
import Scaler from "./Scaler";
import FreePackage from "./FreePackage";

function Packages({ myPackage }) {
  return (
    <main className="flex gap-5 flex-wrap items-center justify-center">
      <FreePackage selected={myPackage && myPackage.toLowerCase() === "free"} />
      <Starter selected={myPackage && myPackage.toLowerCase() === "starter"} />
      <Scaler selected={myPackage && myPackage.toLowerCase() === "scaler"} />
      <Stablizer
        selected={myPackage && myPackage.toLowerCase() === "stablizer"}
      />
    </main>
  );
}

export default Packages;
