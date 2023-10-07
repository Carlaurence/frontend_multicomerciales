import React from "react";
import Navbar from "../components/Navbar";

const About_us = () => {
    return (
        <>
            <div className="overflow-x-hidden">
                <Navbar />
                <div className="bg-gradient-to-r from-black via-gray-400 to to-white flex justify-center w-screen h-[520px] items-center font-bold uppercase">
                    <h1>About_US</h1>
                </div>
            </div>
        </>
    )
}

export default About_us;