import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


const Advertisements = () => {
    return (
        <div className="relative overflow-hidden flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full font-bold uppercase">
            <Navbar />
            <div className="flex flex-row w-screen">
                <Sidebar />
                <div className="w-screen">
                    <div className="relative flex flex-col items-center gap-5 mt-32 mb-14 h-full">
                        <span className="text-xl">Modulo Publicitario En Construccion</span>
                        <h1>Boton Ingresar Publicidad</h1>
                        <h1>LISTA PUBLICIDAD ACTUAL</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Advertisements;