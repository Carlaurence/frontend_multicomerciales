//npm install react-slick --save
//npm install slick-carousel --save
import React from "react";
import CarouselFooter from "./CarouselFooter";

const Footer = () => {

    return (
        
            <div className="relative bg-white flex items-end w-screen h-[260px] border-8 border-black overflow-hidden">
                <div className="absolute flex justify-center top-0 h-[113px] w-full">
                    <CarouselFooter />
                </div>
                <div className="relative bg-black w-[50%] h-[200px] top-[53px] right-[92px] rotate-[21deg]"></div>
                <div className="absolute bg-black w-full h-[140px] flex justify-center items-center z-10">
                    <img src='https://res.cloudinary.com/depcjbb7q/image/upload/v1682951763/logo-header_akjf4k.png' alt='logo Multicomerciales' className='w-52 invert brightness-0 md:w-52 lg:w-56'></img>
                </div>
                <div className="relative bg-black w-[50%] h-[200px] top-[53px] left-[92px] rotate-[-21deg]"></div>
            </div>
        

    )
}

export default Footer;

/*
<div className="relative bg-black w-full h-[180px]"></div>
                <div className="relative bg-black translate-y-[207px] left-[119px] w-full h-[200px] rotate-[-30deg] "></div>

*/