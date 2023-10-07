import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import swal from "sweetalert";
import crud from "../backEndConnection/crud";
//react-icons
import { BiEdit } from "react-icons/bi";

const UpdateEngineManufacturer = () => {

    const navigate = useNavigate();
    const { id } = useParams();

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
     * 1- SE RECIBE EL ID DEL FABRICANTE MEDIANTE LA URL Y LO CAPTURAMOS MEDIANTE EL useParams() *********
     * 2- SE EJECUTA EL useEffect() => Y ADENTRO SE EJECUTA EL FILTRO DE SEGURIDAD Y getEngineManufacturerById ** 
     * 3- PARA TRAER LA INFORMACION PRECISA DEL getEngineManufacturerById, UTILIZAMOS EL ID DEL useParams() **
     * 4- AL EJECUTARSE getEngineManufacturerById, TRAEMOS LOS OBJ's DE LA BBDD Y SETEAMOS engineManufacturer **
     * 5- EL OBJETO engineManufacturer SE UTILIZARA EN EL RENDER PARA PINTAR EN NOMBRE DEL FABRICANTE ****
     ****************************************************************************************************/
    useEffect(() => {
        getUserAuthenticated();
        getEngineManufacturerById();
    }, [navigate])

    const [engineManufacturer, setEngineManufacturer] = useState([]);
    const [uneditable, setUneditable] = useState(true);

    const getEngineManufacturerById = async () => {
        const response = await crud.GET(`/api/enginemanufacturer/${id}`);

        if (response.msg === 'ERROR: data incompleta') {
            swal("ERROR", "Accion Invalida! \nData Requerida Incompleta", "error");
            navigate('enginemanufacturers_list');
        } else if (response.msg === 'no hay marca y/o fabricante con ese id') {
            swal("ERROR", "Accion Invalida! \nNo Se Encontro Fabricantes con el ID Ingresado", "error");
            navigate('enginemanufacturers_list');
        } else if (response.msn === "error de try / catch") {
            swal("ERROR", "Accion Invalida! \nSe Presento Un Error De Try / Catch", "error");
            navigate('enginemanufacturers_list');
        } else {
            setEngineManufacturer(response.msg);
            console.log(response.msg)
        }
    }
    /*SEGUNDA PARTE: *****************************************************************************************
     * 1- SE CREA UN useState [dataUpdateManufacturer] QUE CONTIENE LA DATA REQUERIDA PARA ACTUALIZAR EL NOMBRE DE UN FABRICANTE**
     * 2- LA DATA REQUERIDA PARA ACTUALIZAR UN FABRICANTE ES {id:'', make:''} ********************************
     * 3- EL {id:''} LO SETEAMOS CON EL ID DEL useParams(), MIENTRAS QUE EL {make:''} CON EL dataUpdateManufacturer **
     * 4- SE CREA UN onChange QUE CAPTURA LOS CAMBIOS INSERTADOS EN EL INPUT make CUANDO SE SOBRE-ESCRIBE ****
     * 5- CADA QUE SE EJECUTA EL onChange SE SETEA dataUpdateManufacturer CON LA NUEVA DATA PARA ACTUALIZAR **
     * 6- dataUpdateManufacturer YA CONTIENE LA NUEVA DATA REQUERIDA PARA ACTUALIZAR EL FABRICANTE ***********
     ********************************************************************************************************/
    const [dataUpdateManufacturer, setDataUpdateManufacturer] = useState({
        make: ''
    });

    const onChange = (e) => {
        setDataUpdateManufacturer({
            ...dataUpdateManufacturer,
            [e.target.name]: e.target.value.trimStart()//trim() PARA EVITAR EL INGRESO DE ESPACIOS EN BLANCO
        })
    };

    /*TERCERA PARTE: *****************************************************************************************
     * 1- AL PRESIONAR EL BOTON [GUARDAR CAMBIOS] SE EJECUTA LA FUNCION onSubmit() DESDE EL FORM<> ***********
     * 2- AL EJECUTARSE LA FUNCION onSubmit(), SE EJECUTA LA FUNCION updateEngineManufacturer() **************
     * 3- AQUI SE ACTUALIZA LA INFORMACION DEL FABRICANTE CON LA NUEVA DATA INGRESDA *************************
     ********************************************************************************************************/
    //CUANDO SE PRESIONA EL BOTON [ACTUALIZAR] LA <form> EJECUTA LA FUNCION {onSubmit}
    const onSubmit = (e) => {
        e.preventDefault();//impedir que se recargue automaticamente
        updateEngineManufacturer();
    }

    const updateEngineManufacturer = async () => {

        const data = {//DATA REQUERIDA PARA ACTUALIZAR UN FABRICANTE
            id: id,
            make: dataUpdateManufacturer.make.toUpperCase()
        }

        const response = await crud.PUT(`/api/enginemanufacturer`, data);
        console.log(response.msg)

        if (response.msg === 'ERROR: data incompleta. ID Missing') {
            swal("ERROR", "Accion Invalida! \nData incompleta. ID Missing", "error");
            navigate('/enginemanufacturers_list');
        }else if(response.msg === 'No se encontro Marca con el ID ingresado'){
            swal("ERROR", "Accion Invalida! \nNo Se Encontro Fabricantes con el ID Ingresado", "error");
            navigate('/enginemanufacturers_list');
        }else if(response.msg === 'ERROR: data incompleta. MAKE Missing'){
            swal("ERROR", "Accion Invalida! \nData incompleta. MAKE Missing", "error");
            navigate('/enginemanufacturers_list');
        }else if(response.msg === 'la marca ya existe'){
            swal("ERROR", "Accion Invalida! \nLa Marca que esta intentando crear ya existe", "error");
        }else if(response.msg === 'error de try / catch'){
            swal("ERROR", "Accion Invalida! \nSe Presento Un Error De Try / Catch", "error");
            navigate('/enginemanufacturers_list');
        } else {
            swal("BIEN HECHO!", "La Marca fue actualizado exitosamente!", "success");
            navigate(`/enginemanufacturers_list`);
        }

    }

    return (
        <div className="relative overflow-hidden hidden md:flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full font-bold">
            <Navbar />
            {/*AQUI ORGANIZAMOS EL DIV PARA QUE LA PANTALLA SE DIVIDA EN DOS, A LA IZQ EL SIDBAR Y A LA DERECHA EL FORMULARIO*/}
            <div className="flex flex-row w-screen">
                <Sidebar />
                <div className="flex justify-center w-screen">
                    {/*AQUI EMPIEZA EL CUADRO ROJO QUE CONTIENE EL FORMULARIO*/}
                    <div className="relative mt-32 mb-14 bg-white border border-black shadow-2xl shadow-red-600 h-[324px] w-[484px] rounded-xl flex justify-center items-center">
                        <div className="bg-red-600 border border-white shadow-2xl shadow-black h-[300px] w-[460px] rounded-xl ">
                            <span className="mb-6 flex justify-center text-xl text-white pt-4 font-semibold uppercase">Editar Informacion Fabricante</span>

                            <form onSubmit={onSubmit} className="flex flex-col justify-center items-center mb-4">
                                <div className="flex flex-row gap-4">
                                    <label className=" text-white font-semibold text-lg">Motor</label>
                                    <div className="bg-gray-300 rounded-xl">
                                        <input className={`bg-white font-bold text-gray-700 py-[6px] px-[14px] rounded-xl leading-tight border border-black ${uneditable === true ? "opacity-50" : "opacity-100"}`}
                                            id="make"
                                            type="text"
                                            name="make"
                                            value={dataUpdateManufacturer.make.toUpperCase()}
                                            placeholder={engineManufacturer.make}
                                            disabled={uneditable}
                                            required
                                            onChange={onChange}
                                        ></input>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <BiEdit className="hover:opacity-50 active:opacity-70" onClick={() => { uneditable === true ? setUneditable(false) : setUneditable(true) }} style={{ color: 'white', fontSize: '24px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                

                                <div className="flex flex-col mt-10 mb-4">
                                    <button type="submit" value="Guardar Cambios" className="bg-white text-red-600 rounded-full border border-black shadow-lg shadow-black hover:bg-opacity-90 active:bg-opacity-70 w-[200px] h-[36px] flex justify-center items-center font-bold" >Guardar Cambios</button>
                                </div>

                                <div className="flex flex-col font-normal justify-center items-center text-sm">
                                    <Link className="mb-1 text-white underline hover:text-opacity-70 active:text-opacity-50" to={"/enginemanufacturers_list"}>Regresar</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                    {/*AQUI TERMINA EL CUADRO ROJO QUE CONTIENE EL FORMULARIO*/}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UpdateEngineManufacturer;