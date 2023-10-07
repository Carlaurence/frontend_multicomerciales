import React from 'react';
import Navbar from '../components/Navbar';
import Mapss from '../components/Mapss';
import Footer from '../components/Footer';


const Location = () => {

    return (
        <div className="relative overflow-hidden flex flex-col bg-gradient-to-r from-black via-gray-400 to to-white h-full">
            
            <Navbar />

            <div className="relative mt-[98px] flex justify-center items-center h-full w-full">
                <Mapss />
            </div>

            <Footer />

        </div>
    )
}

export default Location;

/**
 return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-black via-gray-400 to to-white flex justify-center">
                <h1>About_US</h1>
            </div>
        </>
    )
 */