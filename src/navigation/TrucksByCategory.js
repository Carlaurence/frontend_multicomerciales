import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import crud from "../backEndConnection/crud";
import Carousel from "../components/Carousel";
import ButtomMakeOfert from "../components/Buttom_MakeAnOffer";
import Footer from "../components/Footer";
//react-icons
import { IoIosSpeedometer } from 'react-icons/io';
import { FaSackDollar } from 'react-icons/fa6';
import { FaTruckMoving } from 'react-icons/fa'; 


const ShowTrucksByCategory = () => {

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

    const { id } = useParams();

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const getTrucksByCategory = async () => {
        const response = await crud.GET(`/api/product/${id}`);
        const msg = response;
        //console.log(msg)

        if (response === "error") {
            return navigate('*')
        } else {
            setProducts(response.products);
        }
    }

    useEffect(() => {//PARA QUE SE EJECUTE AUTOMATICAMENTE AL INGRESAR AL MODULO Category Y SE PRINTEEN LAS CATEGORIES
        getTrucksByCategory();
    }, [id])/*[] QUE SE EJECUTA UNA SOLA VEZ. PERO EN ESTE CASO [id], SE TIENE QUE EJECUTAR CADA QUE DETECTE UN CAMBIO
    EN EL /:id QUE LLEGA EN LA URL /category/:id POR MEDIO DEL LLAMADO QUE LE HACE EL BOTTOM Icon_ShowTrucksByCategory*/

    return (
        <>
        <div className="relative overflow-hidden flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full">
            <Navbar />
            
                {/*AQUI EMPIEZAN A PRINTEARSE LAS CARD'S CON EL CAROUSEL Y LA INFO DEBAJO*/}
                <div className="relative mt-36 mb-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center w-[90%]">
                    {products.map((product, index) => (
                        <div key={product._id}>
                            <div className='group rounded-md h-[320px] w-80 md:w-80 lg:w-11/12 bg-gray-200 border m-auto shadow-md shadow-red-600'>
                                <Carousel images={product.images} height={"220px"}/>
                                <div className="m-1">
                                    <div className="flex gap-1 font-semibold text-sm">
                                        <span>{product.make}</span>
                                        <span>{product.model}</span>
                                        <span>{"[" + product.gvwr + " TON]"}</span>
                                        <span>{" - " + product.year}</span>
                                    </div>
                                    <div className="flex flex-col font-semibold text-sm">
                                        <span className="flex items-center gap-2"><FaTruckMoving style={{color: '#424949', fontSize:'15px'}} />{product.cargoBodyType + " " + product.length + " * " + product.width + " * " + product.height}</span>
                                        <span className="flex items-center gap-2"><IoIosSpeedometer style={{color: '#424949', fontSize:'15px'}} />{" "+decimalFormatter.format(product.odometer)+" Kms"}</span>
                                        
                                        <div className="flex flex-row justify-between">
                                            <span className="flex items-center gap-2"><FaSackDollar style={{color: '#424949', fontSize:'15px'}} />{formatterPesoCOP.format(product.price)}</span>
                                            <ButtomMakeOfert height ={"25px"} width ={"70px"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>

        </>
    )
}

export default ShowTrucksByCategory;