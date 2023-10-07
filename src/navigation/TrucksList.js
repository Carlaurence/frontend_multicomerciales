//www.localhost:3000/trucks_list
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Carousel from "../components/Carousel";
import swal from "sweetalert";
import crud from "../backEndConnection/crud";

const TrucksList = () => {

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

    const navigate = useNavigate();

    //FILTRO DE SEGURIDAD PARA ACCEDER ACCEDER A URL'S PROTEGIDAS "/trucks_list"
    //SE EJECUTA CON useEfeect()
    const getUserAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            swal("ERROR", " Acceso Denegado \nUsuario Sin Loguear ", "error");
            navigate("/")
        } else {
            const response = await crud.GET(`/api/login`);
            if (response.user) {
            } else {
                swal("ERROR", " Acceso Denegado \nUsuario Sin Loguear ", "error");
                localStorage.removeItem('token');
                navigate("/");
            }
        }
    }

    const [products, setProducts] = useState([]);

    const getAllTrucks = async () => {
        const response = await crud.GET(`/api/product`);
        setProducts(response.products);
    }

    useEffect(() => {//AL ACCEDER AL ADMIN "/" AUTOMATICAMENTE SE EJECUTA ESTE USEEFECT
        getUserAuthenticated();//EJECUTA EL FILTRO DE SEGURIDAD 
        getAllTrucks();//
    }, [navigate])//[navigate] SINTAXIS PARA QUE useEffect SE EJECUTE UNICAMENTE AL DETECTAR UN CAMBIO EN EL navigate


    return (
        <div className="relative overflow-hidden flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full">
            <Navbar />

            {/*ESTE FLEX-ROW ES PARA DIVIDIR EL SIDEBAR A LA IZQ Y LA LISTA A LA DERECHA*/}
            <div className="relative flex flex-row w-screen">
                <Sidebar /> {/*SIDEBAR A LA IZQUIERDA*/}
                <div className="relative flex justify-center items-center w-screen"> {/*PANTALLA LADO DERECHO*/}
                    <div className="relative mt-36 mb-14 flex flex-col gap-4">{/*DIV QUE CONTIENE LA LISTA TOTAL DE PUBLICACIONES EN COLUMNA*/}

                        {products.map((product, index) => (
                            /*DIV TIPO FLEX-ROW PARA PONER EL CAROUSEL AL LADO IZQ, LA INFO EN EL MEDIO Y LOS BOTONES AL LADO DERECHO*/
                            <div key={product._id} className="group bg-white flex rounded-md border-[1px] border-red-600 shadow-md shadow-red-600">

                                {/*EL CAROUSEL AL LADO IZQUIERDO*/}
                                <div className='rounded-md'>
                                    {/*RELACION DE ASPECTO 5:4 => 5 UNID ANCHO X 4 DE ALTO*/}
                                    <Carousel images={product.images} height={'224px'} width={'280px'} />
                                </div>
                                {/*LA INFORMACION EN EL MEDIO*/}
                                <div className="flex flex-col justify-center items-center w-[48%] font-semibold text-[12px]">
                                    <div className="flex flex-col gap-1 w-[90%]">
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">VIN: </h1>{product.vin}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">MARCA: </h1>{product.make}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">MODELO: </h1>{product.model}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">AÑO: </h1>{product.year}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">TIPO CARROCERIA: </h1>{product.cargoBodyType}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">LARGO: </h1>{product.length}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">ANCHO: </h1>{product.width}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">ALTO: </h1>{product.height}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">KILOMETRAJE: </h1>{decimalFormatter.format(product.odometer)}</span>
                                        <span className="flex flex-row w-[280px] bg-black/20"><h1 className="w-[120px]">PRECIO: </h1>{formatterPesoCOP.format(product.price)}</span>
                                    </div>

                                </div>
                                {/*LOS BOTONES AL LADO DERECHO*/}
                                <div className="relative w-[160px] flex flex-col justify-center items-center gap-4">
                                    <Link to={`/update_product/${product._id}`} type="button" value="edit" className="bg-red-600 rounded-full border border-black shadow-lg shadow-black hover:bg-opacity-50  active:bg-opacity-70 w-[120px] h-[30px] flex justify-center items-center text-sm text-white font-semibold" >Editar</Link>
                                    <Link to={"/update"} type="button" value="edit" className="bg-red-600 rounded-full border border-black shadow-lg shadow-black hover:bg-opacity-50  active:bg-opacity-70 w-[120px] h-[30px] flex justify-center items-center text-sm text-white font-semibold" >Eliminar</Link>
                                </div>

                            </div>
                        ))}


                    </div>

                </div>
            </div>

            <Footer />

        </div>
    )
}

export default TrucksList;