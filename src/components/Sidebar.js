import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtomSingOut from "../components/Buttom_SignOut";



const Sidebar = (props) => {

    const [arrowOf, setArrowOf] = useState(false);
    const [subArrowOf, setSubArrowOf] = useState(false);

    //TITLULOS Y SUBTITLES DEL SIDEBAR
    const options = [
        {
            title: "Camiones", 
            submenu: true,
            links : [
                {subtitle: "Publicar Camion",link: "", 
                    sublinks: [
                        {name: "> De 0 hasta 4 Toneladas", sublink: "/create_product/64963271f08a003ce3f4c5ae"}, 
                        {name: "> De 4 hasta 8 Toneladas", sublink: "/create_product/6496327df08a003ce3f4c5b0"}, 
                        {name: "> De 8 hasta 12 Toneladas", sublink: "/create_product/64963288f08a003ce3f4c5b2"}
                    ] 
                },   
                {subtitle: "Actualizar Publicacion", link: "/trucks_list", sublinks:[]},
                {subtitle: "Desactivar Publicacion", link: "/trucks_list", sublinks:[]},
                {subtitle: "Fabricantes De Camiones",link: "", 
                    sublinks: [
                        {name: "> Crear Fabricante Camiones", sublink: "/create_manufacturer"}, 
                        {name: "> Editar / Eliminar Fabricante", sublink: "/manufacturers_list"}, 
                        {name: "> Crear Modelo", sublink: "/create_model"}, 
                        {name: "> Editar / Eliminar Modelo", sublink: "/models_list"},
                        {name: "> Crear Año De Fabricacion", sublink: "/create_year"},
                        {name: "> Editar / Eliminar Año", sublink: "/years_list"}
                    ] 
                },
                {subtitle: "Fabricantes De Motores", link: "", 
                    sublinks:[
                        {name: "> Crear Fabricante Motores", sublink: "/create_enginemanufacturer"}, 
                        {name: "> Editar / Eliminar Fabricante", sublink: "/enginemanufacturers_list"}
                    ]
                },
                {subtitle: "Fabricantes de Furgones", link: "", 
                    sublinks:[
                        {name: "> Crear Tipo De Furgon", sublink: "/create_cargobodytype"}, 
                        {name: "> Editar / Eliminar Furgon", sublink: "/cargobodytype_list"}
                    ]
                }
            ]
        },
        {
            title: "Publicidad",
            submenu: true,
            links : [
                { subtitle: "Publicar Publicidad", link: "/create-advertisements", sublinks:[] },
                { subtitle: "Ver Lista Publicaciones", link: "/advertisements-list", sublinks:[] },
                { subtitle: "Eliminar Publicidad", link: "/advertisements-list", sublinks:[] }
            ]
        },
        {
            title: "Clientes",
            submenu: true,
            links : [
                { subtitle: "Crear Cliente", link: "/create-customer", sublinks:[] },
                { subtitle: "Actualizar Datos", link: "/customer-list", sublinks:[] },
                { subtitle: "Ver Lista Clientes", link: "/customer-list", sublinks:[]}
            ]
        }
    ];

    return (
        <div className="relative flex justify-center bg-red-600 text-white  w-[360px] uppercase">

            <div className="relative bg-black/20 flex flex-col pt-36 w-[90%] h-[550px] gap-4">

                {
                    //AQUI SE PRINTEAN LOS TITULOS [CAMIONES, PUBLICIDAD, CLIENTES]
                    options.map((option, index) => (
                        <div key={option.title}>
                            <div className="group">
                                {/*ESTE onClick() UNICAMENTE SE EJECUTA SOBRE EL TITULO QUE SEA CLICKEADO*/}
                                <h1 className="relative flex flex-row justify-between items-center underline cursor-pointer hover:bg-black/10 font-bold" onClick={() => { arrowOf !== option.title ? setArrowOf(option.title) : setArrowOf(""); setSubArrowOf(""); console.log('Click on...'+ option.title) }}>
                                    {option.title}
                                    <span className="text-3xl">
                                        {/*FLECHAS => ESTE CONDICIONAL HACE UN COMPROBACION SOBRE TODOS LOS TITTLE Y LOS EJECUTA A TODOS => EL QUE CUMPLA CON LA CONDICION SE LE GIRA SU FLECHA HACIA ARRIBA Y LOS DEMAS GIRAN FLECHA HACIA ABAJO*/}
                                        <ion-icon name={`${arrowOf === option.title ? "chevron-up-outline" : "chevron-down-outline"}`}></ion-icon>
                                    </span>
                                </h1> 
                                {option.submenu && (//AQUI SE PRINTEAN LOS SUBTITULOS Y/O LINKS
                                    <div className={`flex-col gap-4 px-2 text-sm font-semibold ${arrowOf === option.title ? "flex" : "hidden"}`}>
                                        {option.links.map((item, index) => (
                                            <div key={item.subtitle}>
                                                <Link className="hover:opacity-50" to={item.link} onClick={() => { subArrowOf !== item.subtitle ? setSubArrowOf(item.subtitle) : setSubArrowOf(""); console.log('Click on...'+ item.subtitle) }}>{item.subtitle}</Link>

                                                
                                                <div className={`relative top-1 flex-col gap-3 px-5 text-xs font-semibold underline ${subArrowOf === item.subtitle ? "flex" : "hidden"}`}>
                                                {//AQUI SE PRINTEAN LAS CATEGORIAS DE CADA SUBTITLE,.. SOLO SI EXISTEN
                                                item.sublinks.map((sublink, index) => (
                                                    <div key={sublink.name} >
                                                        <Link className="hover:opacity-50" to={sublink.sublink} onClick={() => setArrowOf("")}>{sublink.name}</Link>
                                                    </div>
                                                ))}
                                                </div>
                                                
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                }
                <div className="relative mt-4 w-full flex justify-center">
                    <ButtomSingOut width="150px" height="30px" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;

//onClick={() => { subArrowOf !== item.subtitle ? setSubArrowOf(item.subtitle) : setSubArrowOf(""); console.log('Click on...'+ item.subtitle) }}