import React, { useEffect, useState } from "react";
import "./Home.css"
import myImage from "/images/pxfuel2.jpg"
import myPhoneImage from "/images/pxfuel2phone.jpg"
import { useMediaQuery } from 'react-responsive';
import SearchIcon from '@mui/icons-material/Search';

const pcHomeImages = [myImage]
const phoneHomeImages = [myPhoneImage]

export default function Home() {
    const [pcImage, setPcImage] = useState([])
    const screen = useMediaQuery({ query: `(max-width:800px)` })

    useEffect(() => {

        if (screen) {
            setPcImage(phoneHomeImages);
        } else {
            setPcImage(pcHomeImages);
        }
    }, [screen])

    return (
        <div className="main-home-div">
            <div className="home-search-img-div">
                <div className="home-img-container">
                    {/* <img src={myImage} className="home-img" alt="Home Image" /> */}
                    {pcImage && pcImage.map((image, i) => (
                        <img
                            src={image}
                            alt={`Slide ${i + 1}`}
                            className="home-img"
                        />
                    ))}
                    <div className="home-text-container">
                        <div className="scrolling-words-container">
                            <span >SEARCH ANY</span>
                            <div className="scrolling-words-box">
                                <ul>
                                    <li style={{ color: "orange" }}>MOVIE</li>
                                    <li style={{ color: "yellow" }}>TV SHOW</li>
                                    <li style={{ color: "#DB4A2B" }}>CAST</li>
                                </ul>
                            </div>
                        </div>
                        <div className="search-bar-div">
                            <input type="search" placeholder="Search" className="search-bar" />
                            <button className="search-bar-btn"><SearchIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}