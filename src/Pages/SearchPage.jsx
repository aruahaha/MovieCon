import React, { useState } from "react";
import "./SearchPage.css"
import { getSearch } from "../api";

import CardContainer from "../Component/CardContainer";

export default function SearchPage() {

    const [searchResults, setSearchResults] = useState()

    function handleSearchChange(event) {
        const inputText = event.target.value;

        getSearch(inputText)
            .then(results => {
                setSearchResults(results);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            });
    }

    return (
        <>
            <div className="searchBox-page">
                <div className="search-page">
                    <h1>Search</h1>
                    <input placeholder="Search..." type="text" onChange={handleSearchChange} />
                </div>
            </div>
            <div>
                <CardContainer data={searchResults} />
            </div>
        </>
    )
}