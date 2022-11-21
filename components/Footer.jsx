import React from "react";

function Footer() {
  return (
    <footer className="text-center text-xs md:text-sm text-gray-500 absolute bottom-1 h-6 w-full">
      <p>
        Copyright &#169; {new Date().getFullYear()} A service of Ablestate
        Creatives Limited
      </p>
    </footer>
  );
}

export default Footer;
