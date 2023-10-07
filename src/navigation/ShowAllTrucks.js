import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import crud from "../backEndConnection/crud";
import Carousel from "../components/Carousel";
import ButtomMakeOfert from "../components/Buttom_MakeAnOffer";
import Footer from "../components/Footer";
//react-icons
import { IoIosSpeedometer } from 'react-icons/io';
import { FaSackDollar } from 'react-icons/fa6';
import { FaTruckMoving } from 'react-icons/fa';


const ShowAllTrucks = () => {

    //FUNCION PARA DAR FORMATO PESOS COP A LOS VALORES NUMERICOS
    const formatterPesoCOP = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
    //FUNCION PARA DAR FORMATO A VALORES DE MILES SEPARADOS POR PUNTO
    const decimalFormatter = new Intl.NumberFormat("es-ES", {
        maximumFractionDigits: 0
      })

    const [products, setProducts] = useState([]);

    const getAllTrucks = async () => {
        const response = await crud.GET(`/api/product`);
        //const msg = response;
        //console.log(msg)
        setProducts(response.products);

    }

    useEffect(() => {//PARA QUE SE EJECUTE AUTOMATICAMENTE AL INGRESAR AL MODULO Category Y SE PRINTEEN LAS CATEGORIES
        getAllTrucks();
    }, [])//[] QUE SE EJECUTA UNA SOLA VEZ


    /*NOTA IMPORTANTE: LAS IMAGENES DE LOS VEHICULOS DEBEN CONSERVAR UNA RELACION DE ASAPECTO DE 5:4
     */
    return (
        <div className="relative overflow-hidden flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full">
            <Navbar />
            
                <div className="relative mt-36 mb-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center w-[90%]">
                    {products.map((product, index) => (
                        <div key={product._id}>
                            <div className='group rounded-md h-[320px] w-[320PX] md:w-80 lg:w-11/12 bg-gray-200 border m-auto shadow-md shadow-red-600'>
                                <Carousel images={product.images} height={"220px"} />
                                <div className="m-1">
                                    <div className="flex gap-1 font-semibold text-sm">
                                        <span>{product.make}</span>
                                        <span>{product.model}</span>
                                        <span>{"["+product.gvwr+" TON]"}</span>
                                        <span>{" - " + product.year}</span>
                                    </div>
                                    <div className="flex flex-col font-semibold text-sm">
                                        <span className="flex items-center gap-2"><FaTruckMoving style={{color: '#424949', fontSize:'15px'}} />{product.cargoBodyType + " " + product.length + " * " + product.width + " * " + product.height}</span>
                                        <span className="flex items-center gap-2"><IoIosSpeedometer style={{color: '#424949', fontSize:'15px'}} />{" "+decimalFormatter.format(product.odometer)+" Kms"}</span>
                                        
                                        <div className="flex flex-row justify-between">
                                            <span className="flex items-center gap-2"><FaSackDollar style={{color: '#424949', fontSize:'15px'}} />{formatterPesoCOP.format(product.price)}</span>
                                            <ButtomMakeOfert height ={"25px"} width ={"70px"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                
            </div>
            <Footer />
        </div>
    )
}

export default ShowAllTrucks;