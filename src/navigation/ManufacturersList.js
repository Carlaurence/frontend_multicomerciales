//www.localhost:3000/trucks_list
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import swal from "sweetalert";
import crud from "../backEndConnection/crud";
//react-icons
import { BsTrash } from "react-icons/bs";
import { BiEdit, BiFemaleSign } from "react-icons/bi";

const Manufacturerslist = () => {

    const navigate = useNavigate();

    const getUserAuthenticated = async () => {//FILTRO DE SEGURIDAD PARA ACCEDER A URL'S PROTEGIDAS
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

    /*PRIMERA PARTE: *************************************************************************************
     * 1- SE EJECUTA EL useEffect() => *******************************************************************
     * 2- SE EJECUTA EL FILTRO DE SEGURIDAD Y EL REQUEST getAllManufacturers *****************************
     * 3- AL EJECUTARSE getAllManufacturers, TRAEMOS LOS OBJ's DE LA BBDD Y SETEAMOS manufacturers *******
     * 4- EL useState [manufacturers] SE UTILIZA CON UN .map PARA PINTAR TODOS LOS FAB. DISPONIBLES ******
     ****************************************************************************************************/
    useEffect(() => {
        getUserAuthenticated();//EJECUTA EL FILTRO DE SEGURIDAD 
        getAllManufacturers();//
    }, [navigate])//[navigate] SINTAXIS PARA QUE useEffect SE EJECUTE UNICAMENTE AL DETECTAR UN CAMBIO EN EL navigate
    const [manufacturers, setManufacturers] = useState([]);

    const getAllManufacturers = async () => {
        const response = await crud.GET(`/api/manufacturer`);
        if (response.msg === 'no hay Marcas creadas en la bbdd') {
            return swal("ERROR", "No Hay Marcas Creadas en la BBDD!", "error");
        } else if (response.msg === 'error de try / catch') {
            return swal("ERROR", "Error de Try / Catch!", "error");
        } else {
            setManufacturers(response.msg);
        }
    }

    /*SEGUNDA PARTE: **************************************************************************************
     * 1- AL CLICKEAR EL ICON [TRASH], SE EJECUTA warningDelete(id) CON 'ID' DEL FABRICANTE PRESELECCIONADO
     * 2- AL EJECUTARSE EL warningDelete(ID), CONFIRMAREMOS SI ESTAMOS SEGUROS DE ELIMINAR O NO ***********
     * 3- SI ESCOGEMOS [SI], SE EJECUTA EL REQUEST deteleteManufacturer(id) Y SE ELIMINARA ****************
     ****************************************************************************************************/
    const deteleteManufacturer = async (id) => {//SE INVOCA DESDE warningDelete() PORQUE 'swal' NO ACEPTA ASYNC/AWAIT
        const response = await crud.DELETE(`/api/manufacturer/${id}`);

        if (response.msg === 'ID de la Marca No existe en la BBDD') {
            return swal("ERROR", "ID de la 'Marca' No Existe!", "error");
        } else if (response.msg === 'error de try / catch') {
            return swal("ERROR", "Error de Try / Catch!", "error");
        } else {
            swal("HECHO!", "El nombre del fabricante fue borrado!", "success");
            navigate('/admin')
        }
    }

    const warningDelete = (id) => {
        swal({
            title: "Esta Seguro?",
            text: "Una vez borrado, Usted no podra recuperar este archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deteleteManufacturer(id);//SE DEBE INVOCAR PORQUE NO 'swal' NO ACEPTA UN ASYNC / AWAIT
                } else {
                    swal("Accion cancelada!");
                }
            });
    }

    /*TERCERA PARTE: **************************************************************************************
     * 1- AL CLICKEAR EL ICON [EDIT], VIAJAMOS A LA URL /update_manufacturer/${manufacturer._id} **********
     ****************************************************************************************************/

    return (
        <div className="relative overflow-hidden flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full">
            <Navbar />
            {/*ESTE FLEX-ROW ES PARA DIVIDIR EL SIDEBAR A LA IZQ Y LA LISTA A LA DERECHA*/}
            <div className="relative flex flex-row w-screen">
                <Sidebar /> {/*SIDEBAR A LA IZQUIERDA*/}
                <div className="flex justify-center w-screen">
                    {/*AQUI EMPIEZA EL CUADRO ROJO QUE CONTIENE EL FORMULARIO*/}
                    <div className="relative mt-32 mb-14 bg-white border border-black shadow-2xl shadow-red-600 w-[484px] rounded-xl flex justify-center items-center">
                        <div className="bg-red-600 mt-3 mb-3 border border-white shadow-2xl shadow-black w-[460px] rounded-xl ">
                            <span className="mb-6 flex justify-center text-xl text-white pt-4 font-semibold uppercase">Lista Fabricantes de Camiones</span>

                            {manufacturers.map((manufacturer, index) => (

                                <div key={manufacturer._id}>

                                    <form className="flex flex-col justify-center items-center mb-4">
                                        <div className="flex flex-row gap-4">
                                            <label className=" text-white font-semibold text-lg">Marca</label>
                                            <input className="bg-white font-bold text-gray-700 py-[6px] px-[6px] rounded-xl leading-tight border border-black"
                                                id="make"
                                                name="make"
                                                type="text"
                                                required
                                                value={manufacturer.make.toUpperCase()}
                                                disabled={true}
                                            ></input>
                                            <div className="flex items-center gap-4">
                                                <BiEdit className="hover:opacity-50" onClick={() => { navigate(`/update_manufacturer/${manufacturer._id}`) }} style={{ color: 'white', fontSize: '24px', cursor: "pointer" }} />
                                                <BsTrash className="hover:opacity-50" onClick={() => warningDelete(manufacturer._id)} style={{ color: 'white', fontSize: '24px', cursor: "pointer" }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            ))}
                            <div className="flex flex-col mt-10 mb-9 justify-center items-center">
                                <Link to={'/create_manufacturer'} type="button" value="make" className="bg-white mb-4 rounded-full border border-black shadow-lg shadow-black hover:bg-opacity-90 active:bg-opacity-70 w-[200px] h-[36px] flex justify-center items-center text-red-600 font-bold" >Crear Otra Marca</Link>
                                <Link className="mb-1 text-white text-sm underline hover:text-opacity-70 active:text-opacity-50" to={"/admin"}>Regresar a Modulo Admin</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Manufacturerslist;