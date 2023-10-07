import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ButtomSaveProduct from "../components/Buttom_SaveProduct";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import crud from "../backEndConnection/crud";
import swal from "sweetalert";


const Product = () => {//AQUI SE CREA UN PRODUCTO NUEVO CON SU RESPECTIVO ID DE CATEGORIA

    //HOOK useParams{} PARA TRAER EL PARAMETRO/ID DESDE LA URL
    const { id } = useParams();//CON ESTE ID VAMOS A LLENAR EL CAMPO categoria: "id" del Producto

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

    /*PRIMERA PARTE: *************************************************************************************
     * 1- SE EJECUTA EL useEffect() => *******************************************************************
     * 2- EL useEffect() => EJECUTA EN SU INTERIOR, MULTIPLES FUNCIONES QUE RETORNAN UN OBJETO CADA UNA =>
     * => Y CADA OBJETO RETORNADO SE UTILIZA PARA SETEAR LAS OPCIONES DE SELECCION DEL USUARIO ***********
     * 3- SE EJECUTA EL FILTRO DE SEGURIDAD Y EL REQUEST getManufacturers() ******************************
     * 4- AQUI SETEAMOS manufacturers PARA TENER LA PRE-SELECCION DE TODOS LOS FABRICANTES ***************
     ****************************************************************************************************/
    const [manufacturers, setManufacturers] = useState([]);//manufacturers VA A GUARDAR EL ARRAY DE MARCAS
    const getManufacturers = async () => {
        const response = await crud.GET(`/api/manufacturer/`);
        console.log(response.msg)
        setManufacturers(response.msg)
    }

    useEffect(() => {//AL ACCEDER AL ADMIN "/" AUTOMATICAMENTE SE EJECUTA ESTE USEEFECT
        getUserAuthenticated();//EJECUTA EL FILTRO DE SEGURIDAD 
        getManufacturers();//TRAE TODAS LAS MARCAS PARA SU PRE-SELECCION
        getAllEngineManufacturers();//TRAE TODOS LOS FABRICANTES DE MOTOR PARA SU PRE-SELECCION 
        getAllCargoBodyTypes();//TRAE TODOS LOS TIPOS DE CARROCERIAS PARA SU PRE-SELECCION
        getAllYears();//TRAE TODOS LOS AÑOS CREADOS EN LA BBDD
    }, [navigate])//[navigate] SINTAXIS PARA QUE useEffect SE EJECUTE UNICAMENTE AL DETECTAR UN CAMBIO EN EL navigate 

    /*SEGUNDA PARTE: *************************************************************************************
     * 1- CADA QUE SE SELECCIONE UN MANUFACTURER, SE EJECUTA EL onChangeManufacturer *********************
     * 2- AL EJECUTARSE EL onChangeManufacturer, SE ACTIVA EL REQUEST getManufacturerById(id) ************
     * 3- SE EJECUTA EL getManufacturerById(id) PARA TRAER LA INFO DEL FABRICANTE PRE-SELECCIONADO *******
     * 4- EL (id), SE TRAE DEL DEL INPUT-MANUFACTURER SELECCIONADO, MEDIANTE e.target.value **************
     * 5- EN EL ESTADO models GUARDAMOS EL ARRAY DE MODELOS DEL FABRICANTE PRE-SELECCIONADO **************
     * 6- EL ARRAY models[] SE UTILIZA CON UN .map EN EL INPUT model PARA MOSTRAR LOS MODELOS DEL MANUFACTURER SELECCIONADO  ***
     ****************************************************************************************************/
    const [disabled, setDisabled] = useState(true);//INHABILITA LA MANIPULACION DE LOS INPUTS HASTA QUE SE ESCOJA UNA MARCA

    const onChangeManufacturer = (e) => {//ESTE onChangeManufacturer SE EJECUTA CUANDO SELECCIONAMOS UN FABRICANTE
        
        setDisabled(false);//DESPUES DE SELEC UNA MARCA/FABRICANTE, HABILITA LA MANIPULACION DE LOS INPUTS 

        getManufacturerById(e.target.value);//PARA SETEAR LOS MODELOS DEL FABRICANTE SELECCIONADO

        //CADA QUE SE SELECCIONE LA MARCA DE UN FABRICANTE, LOS INPUTS SE DEBEN SETEAR A DefaultValue
        document.getElementById("model").value = 'DefaultValue'
        document.getElementById("year").value = 'DefaultValue'
        document.getElementById("engineManufacturer").value = 'DefaultValue'
        document.getElementById("cargoBodyType").value = 'DefaultValue'
        document.getElementById("isAvailable").value = 'DefaultValue'

        //CADA QUE SE SELECCIONE LA MARCA DE UN FABRICANTE, LIMPIAMOS TODOS LOS INPUTS Y AL OBJETO PRODUCT
        product.vin = ''
        product.make = ''
        product.model = ''
        product.year = ''
        product.odometer = ''
        product.engineManufacturer = ''
        product.gvwr = ''
        product.cargoBodyType = ''
        product.length = ''
        product.width = ''
        product.height = ''
        product.price = ''
        product.isAvailable = ''
    }

    //const [manufacturer, setManufacturer] = useState(false);
    const [models, setModels] = useState([]);
    const getManufacturerById = async (idManufacturer) => {//ESTA FUNCION SE VA A EJECUTAR CADA QUE SE SELECCIONE UNA MARCA
        const response = await crud.GET(`/api/manufacturer/${idManufacturer}`);
        setModels(response.msg.model)//ARRAY DE MODELOS DISPONIBLES DEL MANUFACTURER SELECCIONADO
        setProduct({ ...product, make: response.msg.make })
        //setManufacturer(response.msg)//OBJ MANUFACTURER POR SU (idManufacturer)
    }

    /*TERCERA PARTE: *************************************************************************************
     * 1- LA FUNCION getEngineManufacturers() SE EJECUTA CON EL useEffect INICIAL ************************
     * 2- getEngineManufacturers() TRAE TODOS LOS FABRICANTES DE MOTORES Y SETEARLOS EN engineManufacturers **
     * 3- engineManufacturers[] SE UTILIZA CON UN .map PARA MOSTRAR LAS OPCIONES DE FABRICANTES DE MOTORES EN LA PRE-SELECCIONADO  ***
     ****************************************************************************************************/
    const [engineManufacturers, setEngineManufacturers] = useState([]);
    const getAllEngineManufacturers = async () => {
        const response = await crud.GET(`/api/enginemanufacturer`);
        console.log(response.msg)
        setEngineManufacturers(response.msg);
    }

    /*CUARTA PARTE: *************************************************************************************
     * 1- LA FUNCION getAllCargoBodyTypes() SE EJECUTA CON EL useEffect INICIAL *************************
     * 2- getAllCargoBodyTypes() TRAE TODOS LOS TIPOS DE CARROCERIAS Y LOS SETEA EN cargoBodyTypes ******
     * 3- cargoBodyTypes[] SE UTILIZA CON UN .map PARA MOSTRAR LAS OPCIONES DE TIPOS DE CARROCERIA EN LA PRE-SELECCIONADO  ***
     ****************************************************************************************************/
    const [cargoBodyTypes, setcargoBodyTypes] = useState([]);
    const getAllCargoBodyTypes = async () => {
        const response = await crud.GET(`/api/cargobodytype`);
        console.log(response.msg)
        setcargoBodyTypes(response.msg);
    }

    /*QUINTA PARTE: *************************************************************************************
     * 1- LA FUNCION getAllYears() SE EJECUTA CON EL useEffect INICIAL **********************************
     * 2- getAllYears() TRAE TODOS LOS AÑOS CREADOS EN LA BBDD Y LOS SETEA EN EL useState [years] *******
     * 3- years[] SE UTILIZA CON UN .map PARA MOSTRAR LAS OPCIONES DE LOS AÑOS EN LA PRE-SELECCIONADO  **
     ****************************************************************************************************/
    const [years, setYears] = useState([]);
    const getAllYears = async () => {
        const response = await crud.GET(`/api/year`);
        console.log(response.msg)
        setYears(response.msg)
    }

    /*SEXTA PARTE: *************************************************************************************
     * 
     ****************************************************************************************************/
    const [product, setProduct] = useState({
        vin: '',
        make: '',
        model: '',
        year: '',
        odometer: '',
        engineManufacturer: '',
        gvwr: '',
        cargoBodyType: '',
        length: '',
        width: '',
        height: '',
        price: '',
        images: '',
        isAvailable: ''
    });

    //ESTA FUNCION onChange = (e) SE ENCARGA DE TRAER LOS VALORES DEL FRONT Y SETTEAR A product 
    const onChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };
    console.log(product)
    //AQUI ARMAMOS UN .JSON{} CON LOS VALORES QUE TOME LA VARIBLE 
    const { vin, make, model, year, odometer, engineManufacturer, gvwr,
        cargoBodyType, length, width, height, price, images, isAvailable } = product;

    //AQUI LLAMAMOS AL CRUD POST PARA CREAR PRODUCTOS CON EL ID DE LA CATEGORIA
    const createProduct = async () => {

        if (!vin || !make || !model || !year || !odometer || !engineManufacturer || !gvwr || !cargoBodyType || !length || !width || !height || !price || !images || !isAvailable) {
            return swal("ERROR", "Todos los campos son obligatorios!", "error");
        } else {
            const data = {
                vin: product.vin,
                make: product.make,
                model: product.model,
                year: product.year,
                odometer: product.odometer,
                engineManufacturer: product.engineManufacturer,
                gvwr: product.gvwr,
                cargoBodyType: product.cargoBodyType,
                length: product.length,
                width: product.width,
                height: product.height,
                price: product.price,
                images: product.images.split(","),
                isAvailable: product.isAvailable
            }

            if (data.images.length > 8) {
                return swal("ERROR", "El tope maximo son 8 imagenes!", "error");
            } else {

                const response = await crud.POST(`/api/product/${id}`, data);
                const messageReturned = response;//MSG DE RESPUESTA DESDE EL BACK
                console.log(messageReturned);//respuesta confirmada en consola

                swal("BIEN HECHO!", "El producto se creo correctamente!", "success");
                //DESPUES DE QUE EL USUARIO HAYA SIDO CREADO EXITOSAMENTE, LIMPIAMOS LAS CASILLAS DEL FRONT
                setProduct({
                    vin: '',
                    make: '',
                    model: '',
                    year: '',
                    odometer: '',
                    engineManufacturer: '',
                    gvwr: '',
                    cargoBodyType: '',
                    length: '',
                    width: '',
                    height: '',
                    price: '',
                    images: '',
                    isAvailable: ''
                });

                //DESPUES DE QUE EL USUARIO HAYA SIDO CREADO EXITOSAMENTE, LA PAGINA SE REDIRECCIONA A LA PAGINA DE /admin
                navigate("/admin")
            }

        }
    }
    //CUANDO SE PRESIONA EL BOTON [CREAR USUARIO] LA <form> EJECUTA LA FUNCION {onSubmit}
    const onSubmit = (e) => {
        e.preventDefault();//impedir que se recargue automaticamente
        createProduct();
    }

    return (
        <div className="relative overflow-hidden hidden md:flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full font-bold">
            <Navbar />
            {/*AQUI ORGANIZAMOS EL DIV PARA QUE LA PANTALLA SE DIVIDA EN DOS, A LA IZQ EL SIDBAR Y A LA DERECHA EL FORMULARIO*/}
            <div className="flex flex-row w-screen">
                <Sidebar />
                <div className="flex justify-center w-screen">
                    {/*AQUI EMPIEZA EL CUADRO ROJO QUE CONTIENE EL FORMULARIO*/}
                    <div className="relative mt-32 mb-14 bg-white border border-black shadow-2xl shadow-red-600 h-[1324px] w-[484px] rounded-xl flex justify-center items-center">
                        <div className="bg-red-600 border border-white shadow-2xl shadow-black h-[1300px] w-[460px] rounded-xl ">
                            <span className="mb-6 flex justify-center text-xl text-white pt-4 font-semibold uppercase">Crear Camiones</span>

                            <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-3">

                            <div className="flex flex-col w-[70%]">
                                    <label className=" text-white font-medium">Marca</label>
                                    <select className=" text-gray-700 w-full py-2 px-6 rounded-xl leading-tight border border-black"
                                        id="make"
                                        type="text"
                                        name="make"
                                        required
                                        onChange={onChangeManufacturer}
                                        defaultValue={'DefaultValue'}
                                    >
                                        <option value="DefaultValue" disabled >Seleccione una Marca...</option>
                                        {
                                            manufacturers.map((manufacturer, index) => (
                                                <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.make}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                                
                                <div className="flex flex-col w-[70%]">
                                    <label className=" text-white font-medium">Numero Vin</label>
                                    <input className=" text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="vin"
                                        type="text"
                                        name="vin"
                                        placeholder="vin"
                                        required
                                        value={vin}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                
                                <div className="flex flex-col w-[70%]">
                                    <label className=" text-white font-medium">Modelo</label>
                                    <select className=" text-gray-700 w-full py-2 px-6 rounded-xl leading-tight border border-black"
                                        id="model"
                                        type="text"
                                        name="model"
                                        required
                                        disabled ={disabled}
                                        onChange={onChange}
                                        defaultValue={'DefaultValue'}
                                    >
                                        <option value="DefaultValue" disabled >Seleccione un Modelo...</option>
                                        {
                                            models.map((model, index) => (
                                                <option key={index} value={model}>{model}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Año</label>
                                    <select className=" text-gray-700 w-full py-2 px-6 rounded-xl leading-tight border border-black"
                                        id="year"
                                        type="number"
                                        name="year"
                                        required
                                        disabled ={disabled}
                                        onChange={onChange}
                                        defaultValue={'DefaultValue'}
                                    >
                                        <option value="DefaultValue" disabled >Seleccione un Año...</option>
                                        {
                                            years.map((year, index) => (
                                                <option key={year._id} value={year.year}>{year.year}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Kilometraje</label>
                                    <input className="text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="odometer"
                                        type="number"
                                        name="odometer"
                                        placeholder="Kilometraje"
                                        required
                                        value={odometer}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>


                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Fabricante Motor</label>
                                    <select className=" text-gray-700 w-full py-2 px-6 rounded-xl leading-tight border border-black"
                                        id="engineManufacturer"
                                        type="text"
                                        name="engineManufacturer"
                                        required
                                        disabled ={disabled}
                                        onChange={onChange}
                                        defaultValue={'DefaultValue'}

                                    >
                                        <option value="DefaultValue" disabled >Seleccione un Fabricante...</option>
                                        {
                                            engineManufacturers.map((engineManufacturer, index) => (
                                                <option key={engineManufacturer._id} value={engineManufacturer.make}>{engineManufacturer.make}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className=" text-white font-medium">Capacidad de Carga</label>
                                    <input className=" text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="gvwr"
                                        type="number"
                                        name="gvwr"
                                        placeholder="Toneladas"
                                        required
                                        value={gvwr}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className=" text-white font-medium">Tipo De Carroceria</label>
                                    <select className=" text-gray-700 w-full py-2 px-6 rounded-xl leading-tight border border-black"
                                        id="cargoBodyType"
                                        type="text"
                                        name="cargoBodyType"
                                        required
                                        disabled ={disabled}
                                        onChange={onChange}
                                        defaultValue={'DefaultValue'}
                                    >
                                        <option value="DefaultValue" disabled >Seleccione un Tipo de Carroceria...</option>
                                        {
                                            cargoBodyTypes.map((cargoBodyType, index) => (
                                                <option key={cargoBodyType._id} value={cargoBodyType.name}>{cargoBodyType.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className=" text-white font-medium">Largo Carroceria</label>
                                    <input className=" text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="length"
                                        type="number"
                                        name="length"
                                        placeholder="Metros de largo"
                                        required
                                        value={length}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Ancho Carroceria</label>
                                    <input className="text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="width"
                                        type="number"
                                        name="width"
                                        placeholder="Metros de ancho"
                                        required
                                        value={width}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Altura Carroceria</label>
                                    <input className="text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="height"
                                        type="number"
                                        name="height"
                                        placeholder="Metros de altura"
                                        required
                                        value={height}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Precio</label>
                                    <input className="text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="price"
                                        type="number"
                                        name="price"
                                        placeholder="Precio Venta"
                                        required
                                        value={price}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>

                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Disponible. Si / No</label>
                                    <select className=" text-gray-700 w-full py-2 px-6 rounded-xl leading-tight border border-black"
                                        id="isAvailable"
                                        type="text"
                                        name="isAvailable"
                                        required
                                        disabled ={disabled}
                                        onChange={onChange}
                                        defaultValue={'DefaultValue'}
                                    >
                                        <option value="DefaultValue" disabled >Seleccione Disponibilidad...</option>
                                        <option value={1} >Si</option>
                                        <option value={0} >No</option>
                                        
                                    </select>
                                </div>

                                <div className="flex flex-col w-[70%]">
                                    <label className="text-white font-medium">Fotos Vehiculo</label>
                                    <input className="text-gray-700 w-full py-2 px-7 rounded-xl leading-tight border border-black"
                                        id="images"
                                        type="text"
                                        name="images"
                                        placeholder="Imagen.jpg"
                                        required
                                        value={images}
                                        disabled ={disabled}
                                        onChange={onChange}
                                    ></input>
                                </div>

                                <div className="flex flex-col pt-6 gap-5 mb-3">
                                    <ButtomSaveProduct />
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

export default Product;