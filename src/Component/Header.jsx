import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { getSearch } from "../api";
import "./Header.css";
import Searchbar from "./Searchbar";

export default function Header() {
  const [menuClass, setMenuClass] = useState("mob-header-menu");
  
  function handleMenuToggle() {
    setMenuClass((prevClass) =>
      prevClass === "mob-header-menu"
        ? "mob-header-menu active-menu"
        : "mob-header-menu"
    );
  }

  return (
    <header>
      <div className="pc-header">
        <Link to="/" className="brand-name">
          MOVIECON
        </Link>

        <ul>
          <li>
            <NavLink to="/movies?page=1">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/tvshows?page=1">TV Shows</NavLink>
          </li>
          <Searchbar/>
        </ul>
      </div>
      <div className="mob-header">
        <Link className="brand-name">MOVIECON</Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/search">
            <SearchIcon
              sx={{
                fontSize: 30,
              }}
            />
          </Link>
          <svg
            onClick={handleMenuToggle}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
            color="white"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
      </div>

      <div className={menuClass}>
        <ul>
          <li>
            <NavLink
              onClick={() => setMenuClass("mob-header-menu")}
              to="/movies?page=1"
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenuClass("mob-header-menu")}
              to="/tvshows?page=1"
            >
              TV Shows
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
