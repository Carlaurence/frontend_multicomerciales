import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import crud from "../backEndConnection/crud";
import swal from "sweetalert";


const Manufacturer = () => {

    const navigate = useNavigate();

    const getUserAuthenticated = async () => {//FILTRO DE SEGURIDAD PARA ACCEDER ACCEDER A URL'S PROTEGIDAS "/products"
        const token = localStorage.getItem('token');//IR A localStorage Y TRAER VALUE: DE {KEY 'token'}
        //PRIMER FILTRO #1
        if (!token) {//SI NO HAY TOKEN, IMPEDIR ACCESO Y RE-DIRECCIONAR AL HOME "/"
            swal("ERROR", " Acceso Denegado \nUsuario Sin Loguear ", "error");
            navigate("/")
        } else {//SI HAY TOKEN, EJECUTE EL MICROSERVICIO
            const response = await crud.GET(`/api/login`);//VIAJA AL LOCALSTORAGE(HEADER) Y LEE TOKEN ALMACENADO

            /*SI EL TOKEN ES VALIDO, EL "response" NOS DEBE RETORNA LA INFORMACION DEL USUARIO EN UN JSON
             CON key "user" Y VALUE {_id:"xxxx", name:"Mxxxx", lastname:"Cxxxxx", email: "xxx@gmail.com"}*/
            if (response.user) {
                //SI EL USER ES TRUE, ENTONCES SE PERMITE EL ACCESO AL MODULO "/ADMIN"
            } else {//SI NO RETORNA EL USER, ENTONCES ACCESO DENEGADO
                swal("ERROR", " Acceso Denegado \nUsuario Sin Loguear ", "error");
                localStorage.removeItem('token');
                navigate("/");
            }
        }
    }

    useEffect(() => {//AL ACCEDER AL ADMIN "/" AUTOMATICAMENTE SE EJECUTA ESTE USEEFECT
        getUserAuthenticated();//EJECUTA EL FILTRO DE SEGURIDAD 
    }, [navigate])//[navigate] SINTAXIS PARA QUE useEffect SE EJECUTE UNICAMENTE AL DETECTAR UN CAMBIO EN EL navigate 


    {/*EL HOOK useState({}) AL SER LLAMADO DENTRO DE LA FUNCION onChange = (e), SE ENCARGARA DE SETEAR LAS VARIABLES 
     CON LOS VALORES TRAIDOS DESDE EL FRONT, MEDIANTE [e.target.name]: e.target.value*/}
    const [manufacturer, setManufacturer] = useState({
        make: ''
    });

    //ESTA FUNCION onChange = (e) SE ENCARGA DE TRAER LOS VALORES DEL FRONT Y SETTEAR A product 
    const onChange = (e) => {
        setManufacturer({
            ...manufacturer,
            [e.target.name]: e.target.value.trimStart()
        })
    };

    //AQUI ARMAMOS UN .JSON{} EL CUAL TOMARA LOS VALORES DEL ONCHANGE 
    const { make } = manufacturer;

    //AQUI LLAMAMOS AL CRUD POST PARA CREAR UNA NUEVA MARCA
    const createManufacturer = async () => {

        if (!make) {
            return swal("ERROR", "Todos los campos son obligatorios!", "error");
        } else {

            const data = {
                make: manufacturer.make.toUpperCase()
            }

            const response = await crud.POST(`/api/manufacturer`, data);
            console.log(response.msg);//respuesta confirmada en consola  

            if (response.msg === "la marca ya existe") {
                return swal("ERROR", "La 'Marca' que esta intentado crear, Ya Existe!", "error");
            } else if(response.msg === "error"){
                return swal("ERROR", "Se ha presentado un error en el Catch{}!", "error");
            }else{
                swal("BIEN HECHO!", "La 'Marca' se creo correctamente!", "success");
                //DESPUES DE QUE EL USUARIO HAYA SIDO CREADO EXITOSAMENTE, LIMPIAMOS LAS CASILLAS DEL FRONT
                setManufacturer({
                    make: ''
                });

                //DESPUES DE QUE EL USUARIO HAYA SIDO CREADO EXITOSAMENTE, LA PAGINA SE REDIRECCIONA A LA PAGINA DE /admin
                navigate("/manufacturers_list")
            }
        }
    }
    //CUANDO SE PRESIONA EL BOTON [CREAR MARCA] LA <form> EJECUTA LA FUNCION {onSubmit}
    const onSubmit = (e) => {
        e.preventDefault();//impedir que se recargue automaticamente
        createManufacturer();
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
                            <span className="mb-6 flex justify-center text-xl text-white pt-4 font-semibold uppercase">Crear Fabricante de Camiones</span>

                            <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-3">
                                <div className="flex flex-col">
                                    <label className=" text-white font-medium">Marca</label>
                                    <input className=" text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black"
                                        id="make"
                                        type="text"
                                        name="make"
                                        placeholder="Ingrese Nombre del Fabricante"
                                        required
                                        value={make.toUpperCase()}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                
                                <div className="flex flex-col pt-6 gap-5 mb-3">
                                    <button type="submit" value="make" className="bg-white rounded-full border border-black shadow-lg shadow-black hover:bg-opacity-90 active:bg-opacity-70 w-[200px] h-[36px] flex justify-center items-center text-red-600 font-bold" >Crear Marca</button>
                                </div>

                                <div className="flex flex-col font-normal justify-center items-center text-sm">
                                    <Link className="mb-1 text-white underline hover:text-opacity-70 active:text-opacity-50" to={"/admin"}>Regresar a Modulo Admin</Link> 
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

export default Manufacturer;