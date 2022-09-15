import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useState } from "react";
import { ImCheckmark } from "react-icons/im";

function Select({ options, status, setStatus, initialLabel, size }) {
  const [show, setShow] = useState(false);

  // click outside to close
  if (show === true) {
    window.onclick = function (event) {
      console.log(show)
      console.log("clicked")
      if (!event.target.matches(".dialog")) {
        if (event.target.matches(".dialog2")) {
        } else {
          setShow(false);
        }
      }
    };
  }

  return (
    <div
      className={`text-xs bg-gray-100 rounded-lg px-1 pr-1 relative focus:outline focus-within:outline-primary focus-within:outline-1 ${size ? "w-32" : "w-22"}`}
      tabIndex={0}
    >
      <div
        className="flex justify-between items-center dialog"
        onClick={(event) => {
          setShow(!show);
          event.stopPropagation();
        }}
      >
        <label className="">
          {status === ""
            ? initialLabel
            : status.charAt(0).toUpperCase() + status.slice(1, status.length)}
        </label>
        <span>
          {show ? <MdArrowDropUp size={25} /> : <MdArrowDropDown size={25} />}
        </span>
      </div>
      {show && (
        <div className="absolute left-0 bottom-5 mt-2 rounded-md py-2 z-50 flex flex-col justify-center w-32 bg-white shadow-2xl dialog2 outline outline-1 outline-gray-300 p-1">
          {options.map((label) => (
            <label
              className={`py-1 px-5 hover:bg-gray-100 rounded-full flex justify-between items-center mt-1 ${
                label.value === status &&
                label.id !== 1 &&
                "bg-[#CA3011] hover:bg-[#CA3011] text-white"
              } ${label.id === 1 && "text-gray-400"} `}
              onClick={() => setStatus(label.value)}
              key={label.id}
            >
              {label.name}
              {label.value === status && <ImCheckmark size={10} />}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
