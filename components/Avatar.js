import React from "react";
// import { avatarColors } from "../utils/avatarColors";

function Avatar({ first_name, last_name }) {

const avatarColors = {
  "A": "#ca3011",
  "B": "#ca3011",
  "C": "#ca3011",
  "D": "#ff0000",
  "E": "#00ff00",
  "F": "#0000ff",
  "G": "#ff00ff",
  "H": "#ffff00",
  "I": "#fffff0",
  "J": "#00f0ff",
  "K": "#ff0f00",
  "L": "#ff00f0",
  "M": "#ff0f00",
  "N": "#ff0ff0",
  "O": "#fff0ff",
  "P": "#fffff0",
  "Q": "#ff00f0",
  "R": "#fff0f0",
  "S": "#094184",
  "T": "#ff0000",
  "U": "#ff0f00",
  "V": "#00ff00",
  "W": "#fff00f",
  "X": "#ffff0f",
  "Y": "#00f000",
  "Z": "#0000f0",
}
const color = avatarColors["C"]
  return (
    <div
      className={`bg-[${color}] w-10 h-10 rounded-full text-white text-sm flex items-center justify-center uppercase`}
    >
      {first_name[0] + last_name[0]}
    </div>
  );
}

export default Avatar;
