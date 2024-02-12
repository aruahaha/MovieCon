import React, { useRef, useState } from "react";
import "./Searchbar.css"
import { Link } from "react-router-dom";
import { getSearch } from "../api";
import myImage from "/assets/images/no-image.png";

export default function Searchbar() {

    const [searchBarActive, setSearchBarActive] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchBarRef = useRef(null);
    function handleSearchChange(event) {
        const inputText = event.target.value;

        getSearch(inputText)
            .then((results) => {
                setSearchResults(results);
                setSearchBarActive(true);
            })
            .catch((error) => {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            });
    }

    const togglebtn = () => {
        setSearchBarActive((prev) => !prev);
        searchBarRef.current.value = "";
    };

    return (
        <>
            <div className="searchBox">
                <div className="search">
                    <input
                        placeholder="Search..."
                        type="text"
                        onChange={handleSearchChange}
                        ref={searchBarRef}
                    />
                    <Link className="search-link" type="submit" to="/search">Go</Link>
                </div>
            </div>
            {searchBarActive ? (
                <div className="search-list">
                    {searchResults?.results?.map((item) => (
                        <Link
                            to={`/${item.media_type}/${item.id}`}
                            onClick={togglebtn}
                            className="search-link"
                        >
                            <div className="search-content">
                                {item.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        className="search-img"
                                    />
                                ) : (
                                    <img src={myImage} className="search-img" />
                                )}
                                <div className="search-titles">
                                    <h6 className="search-movie-name">
                                        {item.original_title || item.original_name
                                            ? item.title || item.name
                                            : ""}
                                    </h6>
                                    <p className="search-media-type">{item.media_type}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}