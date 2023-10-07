import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtomAdmin from "./Buttom_Admin";
import IconTrucksByCategories from "../components/Icon_ShowTrucksByCategory";
import crud from "../backEndConnection/crud";

const Navbar = () => {

    const navigate = useNavigate();

    const getProducts = (arg) => {
        leftSlider();
        navigate(`/trucks${arg}`)
    }

    /**BUSCAR LA FORMA DE AGRUPAR ESTOS USESTATE EN UNO SOLO */
    const [open, setOpen] = useState(false)
    const [isHoveringHome, setIsHoveringHome] = useState(false)
    const [isHoveringTrucks, setIsHoveringTrucks] = useState(false)
    const [isHoveringLocation, setIsHoveringLocation] = useState(false)
    const [isHoveringAboutUs, setIsHoveringAboutUs] = useState(false)
    const [isHoveringContactUs, setIsHoveringContactUs] = useState(false)

    //VAMOS A HACER UN GET QUE ME TRAIGA TODAS LAS CATEGORIAS DISPONIBLE [1 - 3.5] [3.6 - 7] [7 - 11]
    //Y LUEGO LAS VAMOS A PRINTEAR CON UN .MAP PARA MANDARSELAS COMO {ARGUMENTO} A UN BUTON_CATEGORIAS 
    //Y ASI EVITAMOS TENER QUE CREAR UN BOTON APARTE PARA CADA UNA DE LAS CATEGORIAS
    const [category, setCategory] = useState([]);

    const getCategories = async () => {
        const response = await crud.GET(`/api/category`);
        setCategory(response.category);
    }

    const leftSlider = (e) => {
        const navTrucks = document.querySelector('.nav-trucks')//navTrucks llama al <div id='nav-trucks'> que deseamos manipular
        //e.preventDefault();//impedir que se recargue automaticamente
        navTrucks.classList.toggle('left-[-100%]');//Isertamos o manipulamos las propiedades del <div id='nav-trucks'>
    }

    useEffect(() => {//PARA QUE SE EJECUTE AUTOMATICAMENTE AL INGRESAR AL MODULO Category Y SE PRINTEEN LAS CATEGORIES
        getCategories();
    }, [])//[] QUE SE EJECUTA UNA SOLA VEZ

    return (
        <div className="flex items-end justify-around bg-red-600 h-[19%] fixed w-full z-20">

            {/*Este <div> contiene el "LOGO"*/}
            <div className="md:w-auto w-[95%] flex justify-between items-center">
                <img src='https://res.cloudinary.com/depcjbb7q/image/upload/v1682951763/logo-header_akjf4k.png' alt='logo Multicomerciales' className='w-52 invert brightness-0 md:w-52 lg:w-56'></img>
                <div className="text-3xl md:hidden text-white" onClick={() => setOpen(!open)}>
                    <ion-icon name={`${open ? "close" : "list"}`}></ion-icon>
                </div>{/*Fin del <div> que contiene el "LOGO"*/}
            </div>

            {/*Este <div> printea el menu Navbar [HOME CAMIONES UBICACION NOSOTROS CONTACTANOS] en Screen[md: & lg:]*/}
            <div className="hidden md:flex justify-between items-end md:text-sm lg:text-base font-semibold uppercase lg:w-[50%] md:w-[55%] h-full">

                {/*Este <div> contiene el "HOME"*/}
                <Link to={"/"} className="w-full pt-[2px] h-[70px] flex flex-col items-center text-white cursor-pointer" onMouseOver={() => setIsHoveringHome(true)} onMouseOut={() => setIsHoveringHome(false)}>
                    <div className={`duration-500 ${isHoveringHome ? "text-[34px]" : "text-[28px]"}`}><ion-icon name="home-outline"></ion-icon></div>
                    <span className={`active:text-gray-700 ${isHoveringHome ? "opacity-50" : ""}`} >Home</span>
                </Link>{/*Fin del <div> que contiene el "HOME"*/}

                {/*Este <div> contiene el Icono "CAMION" y su Sub-Menu desplegable "ON HOVER" con sus CATEGORIAS [TODOS - 3.5 - 7 - 10 TON]:*/}
                <div className="group w-full h-[70px] flex flex-col items-center text-white hover:text-opacity-50 cursor-default" onMouseOver={() => setIsHoveringTrucks(true)} onMouseOut={() => setIsHoveringTrucks(false)}>
                    <img src="https://res.cloudinary.com/depcjbb7q/image/upload/v1683223778/logo_camion_v6qp2i.png" alt="#" className={`invert-0 duration-500 ${isHoveringTrucks ? "w-12" : "w-10"}`}></img>
                    <span>Camiones</span>

                    {/*Este <div> printea el Sub_Menu del Icono "Camiones" con las Categorias on Hover*/}
                    <div className={`nav-trucks absolute bg-gradient-to-r from-black via-gray-400 to to-white md:top-[102px] lg:top-[105px] left-0 w-full h-screen text-black text-sm uppercase duration-500 ${isHoveringTrucks ? "left-0" : "left-[-100%]"}`}>

                        {/*Este <div> Contiene [All Categories] */}
                        <div className="flex flex-col justify-center items-center gap-2 h-[220px]">
                        <div className="bg-red-600 flex justify-center items-center rounded-full border-2 border-white text-white text-sm w-[80px] h-[80px] cursor-pointer shadow-lg shadow-red-600 hover:scale-105 hover:text-opacity-50 active:text-gray-700 underline font-bold" onClick={() => getProducts("All")}>Todos</div>
                            <div onClick={() => getProducts("All")} style={{ backgroundImage: `url(https://res.cloudinary.com/depcjbb7q/image/upload/v1686534852/Categoria_Multimarcas_xmtzaz.png)` }} className='w-52 h-28 rounded-2xl bg-cover border border-black cursor-pointer shadow-lg shadow-red-600 hover:scale-105 opacity-60 hover:opacity-100'></div>
                        </div>

                        {/*Este <div> Contiene [3.5Categories 7TonCategories 10TonCategories] */}
                        <div className="flex justify-around items-center gap-2 h-[220px]">
                            {
                                category.map((itemCategory, index) => (
                                    <IconTrucksByCategories key={itemCategory._id} category={itemCategory} leftSlider={leftSlider} />
                                ))
                            }
                        </div>
                    </div>
                </div>{/*Fin de las funciones del icono "CAMIONES"*/}

                {/**PENDIENTE EL REMARKS PERSONALIZADO, CON UN TEXTO QUE DIGA MULTICOMERCIALES
                 * UNA VENTANA CON UN BOTON QUE DIGA [UBICANOS EN EL MAPA] Y QUE AL PRESS UBIQUE LAS COORDENADAS 3.46952,lng: -76.51829
                 * UN BOTON QUE DIGA [COMO LLEGAR] Y UN ESPACIO EN BLANCO DONDE SE PUEDA COGER LA DIRECCION ACTUAL DE LA PERSONA O INGRESARLA MANUALMENTE
                 * LA VENTANA GENERAL DEBE CONTENER UNA IMAGEN DEL CONCESIONARIO EN LA PARTE SUPERIOR, LA DIRECCION Y EL TELEFONO Y UN BOTON [CONTACTENOS]
                 */}
                <Link to={"/location"} className="w-full h-[70px] flex flex-col items-center text-white hover:text-opacity-50 active:text-gray-700 cursor-pointer" onMouseOver={() => setIsHoveringLocation(true)} onMouseOut={() => setIsHoveringLocation(false)}>
                    <img src="https://res.cloudinary.com/depcjbb7q/image/upload/v1686440672/logo_vitrina_jkhlsh.png" alt="#" className={`invert-0 duration-500 ${isHoveringLocation ? "w-12" : "w-10"}`}></img>
                    Ubicacion
                </Link>
                <Link to={"/about_us"} className="w-full h-[70px] flex flex-col items-center text-white hover:text-opacity-50 active:text-gray-700 cursor-pointer" onMouseOver={() => setIsHoveringAboutUs(true)} onMouseOut={() => setIsHoveringAboutUs(false)}>
                    <img src="https://res.cloudinary.com/depcjbb7q/image/upload/v1686440672/logo_aboutUs_nrswrj.png" alt="#" className={`invert-0 duration-500 ${isHoveringAboutUs ? "w-12" : "w-10"}`}></img>
                    Nosotros
                </Link>
                <Link to={"/contact_us"} className="w-full h-[70px] flex flex-col items-center text-white hover:text-opacity-50 active:text-gray-700 cursor-pointer" onMouseOver={() => setIsHoveringContactUs(true)} onMouseOut={() => setIsHoveringContactUs(false)}>
                    <img src="https://res.cloudinary.com/depcjbb7q/image/upload/v1686440672/logo_contactanos_heo69h.png" alt="#" className={`invert-0 duration-500 ${isHoveringContactUs ? "w-12" : "w-10"}`}></img>
                    Contactenos
                </Link>
            </div>

            {/**BUTTOM [Sing_Out] IS MISSING - FALTA CREAR UN BOTTOM PARA DES-LOGEARSE*/}
            <div className="h-20 md:flex hidden">
                <div className="flex items-center">
                    <ButtomAdmin />
                </div>
            </div>

            {/*Este <div> printea el Menu Navbar para Mobile-Screen*/}
            <div className={`md:hidden bg-blue-200 absolute w-full bottom-0 top-[99px] flex flex-col py-10 gap-4 uppercase font-semibold pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
                <div className="bg-red-600 cursor-pointer">
                    <Link className="text-black" to={"/"}>Home</Link>
                </div>
                <div className="bg-red-600  cursor-pointer">
                    <span className="text-black">Camiones</span>
                </div>
                <div className="bg-red-600 cursor-pointer">
                    <Link to={"/location"}>Ubicacion</Link>
                </div>
                <div className="bg-red-600 cursor-pointer">
                    <Link to={"/about_us"}>Nosotros</Link>
                </div>
                <div className="bg-red-600 cursor-pointer">
                    <span>Contactenos</span>
                </div>
                <div className=" h-8 flex justify-center items-center">
                    <button className="bg-red-600 text-white font-semibold rounded-full px-20 border border-black shadow shadow-gray-500 hover:bg-gray-500 active:bg-gray-700">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;


 