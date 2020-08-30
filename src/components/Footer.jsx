import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Roger Zuo</p>
    </footer>
  );
}

export default Footer;