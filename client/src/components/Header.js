import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const auth = [
    { name: "about", link: "/about" },
    { name: "products", link: "/products" },
    { name: "contact us", link: "/contact" },
  ];
  const unAuth = [
    { name: "login", link: "/login" },
    { name: "register", link: "/register" },
  ];
  return (
    <div className="bg-indigo-800 px-16 py-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <div className="text-2xl uppercase font-bold text-indigo-100">
            Alaa
            {"  "}
            <span className="bg-orange-400 py-1 px-2 text-indigo-800">
              cars
            </span>
          </div>
        </Link>
        <ul className="flex gap-3 uppercase font-semibold text-indigo-100 ">
          {unAuth &&
            unAuth.map((link, i) => (
              <li key={i} className="hover:text-indigo-600">
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
