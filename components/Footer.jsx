import React from "react";

function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 absolute bottom-1 h-6 w-full">
      <p>
        Copyright &#169; {new Date().getFullYear()} A service of Gagawala
        Graphics Limited
      </p>
    </footer>
  );
}

export default Footer;
