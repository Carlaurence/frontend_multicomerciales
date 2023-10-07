import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CarouselHome from "../components/CarouselHome";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import IconTrucksByCategories from "../components/Icon_ShowTrucksByCategory";
import crud from "../backEndConnection/crud";


const Home = () => {

    const [leftToRight, setLeftToRight] = useState(false);
    const [upToDown, setUpToDown] = useState(false);

    useEffect(() => {
        setLeftToRight(true);
        setUpToDown(true);
        getCategories();
        getAdvertisements();
    }, [])

    const navigate = useNavigate();

    const getProducts = (arg) => {
        navigate(`/trucks${arg}`)
    }

    const [category, setCategory] = useState([]);//recibe array []

    const getCategories = async () => {
        const response = await crud.GET(`/api/category`);
        setCategory(response.category);
    }

    const [advertisements, setAdvertisements] = useState([]);

    const getAdvertisements = async () => {
        const response = await crud.GET(`/api/advertising`);
        //const msg = response;
        //console.log(msg)
        setAdvertisements(response.advertisements);
    }

    const leftSlider = () => {
        /*
        NO TIENE NINGUNA FUNCIONALIDAD EN ESTE COMPONENTE <HOME>, PERO
        TENEMOS QUE USARLA PARA ENVIARLA COMO (ARG) AL COMPONENTE <Icon_ShowTrucksByCategory>,
        YA QUE ESTA LA REQUIERE PARA EJECUTAR UNA FUNCION EN EL COMPONENTE <NAVBAR>
        */
    }

    return (
        <>
            <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-400 to to-white">
                <Navbar />

                {/*Este <div> Contiene la imagen de fondo con camiones*/}
                <div className="relative flex justify-center items-center">
                    <div style={{ backgroundImage: "url(https://res.cloudinary.com/depcjbb7q/image/upload/v1690170111/Fondo1_rffkb6.jpg)" }} className="bg-cover bg-center fixed top-[108px] w-[900px] h-[460px]"></div>
                </div>

                {/*Este es el <div> corredizo y contiene el carousel publicitario*/}
                <div className={`relative overflow-hidden mb-[120px] flex justify-center top-[105px] left-0 h-full duration-[2000ms] ${leftToRight ? "left-0" : "left-[-100%]"}`}>
                    <div className="relative flex justify-center w-[500px] h-[289px] md:w-[900px] md:h-[505px]">
                        <div className="w-full h-full">
                            <CarouselHome advertisements={advertisements} />
                        </div>
                    </div>
                </div>

                <div className={`relative top-0 flex flex-col justify-center items-center text-2xl font-bold h-[350px] uppercase duration-[2000ms] ${upToDown ? "top-0" : "top-[-900px]"}`}>

                    {/*Este <div> Contiene los icons de seleccion de categorias*/}
                    <div className="z-0 flex justify-center items-center gap-4 text-2xl font-bold uppercase">
                        {/*Este <div> Contiene [All Categories] */}
                        <div className="flex flex-col justify-center items-center gap-2 ">
                            <div className="bg-red-600 flex justify-center items-center rounded-full border-2 border-white text-white text-sm w-[80px] h-[80px] cursor-pointer shadow-lg shadow-red-600 hover:scale-105 hover:text-opacity-50 active:text-gray-700 underline font-bold" onClick={() => getProducts("All")}>Todos</div>
                            <div onClick={() => getProducts("All")} style={{ backgroundImage: `url(https://res.cloudinary.com/depcjbb7q/image/upload/v1686534852/Categoria_Multimarcas_xmtzaz.png)` }} className='w-52 h-28 rounded-2xl bg-cover border border-black cursor-pointer shadow-lg shadow-red-600 hover:scale-105 opacity-60 hover:opacity-100'></div>
                        </div>

                        {/*Este <div> Contiene [livianos medianos pesados] */}
                        <div className="flex gap-4">
                            {
                                category.map((itemCategory, index) => (
                                    <IconTrucksByCategories key={itemCategory._id} category={itemCategory} leftSlider={leftSlider} />
                                ))
                            }
                        </div>

                    </div>
                </div>

                <div className="relative h-[150px] bg-gradient-to-r from-black via-gray-400 to to-white"></div>

                <Footer />
            </div >
        </>
    )
}
export default Home;

