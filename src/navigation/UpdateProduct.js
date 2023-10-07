import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import swal from "sweetalert";
import crud from "../backEndConnection/crud";
//react-icons
import { BiEdit } from "react-icons/bi";

const UpdateProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const subtitle = { "vin": "Numero Vin", "make": "Marca", "model": "Modelo", "year": "Año", "odometer": "Kilometraje", "engineManufacturer": "Fabricante Motor", "gvwr": "Capacidad De Carga", "cargoBodyType": "Tipo De Carroceria", "length": "Largo Carroceria", "width": "Ancho Carroceria", "height": "Altura Carroceria", "price": "Precio", "images": "Fotos Vehiculo", "isAvailable": "Disponibilidad", "deleteImages": "Eliminar Imagenes" }

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

    useEffect(() => {//AL ACCEDER AL ADMIN "/" AUTOMATICAMENTE SE EJECUTA ESTE USEEFECT
        getUserAuthenticated();//EJECUTA EL FILTRO DE SEGURIDAD 
        getTruckById();
    }, [navigate])//[navigate] SINTAXIS PARA QUE useEffect SE EJECUTE UNICAMENTE AL DETECTAR UN CAMBIO EN EL navigate 

    const [product, setProduct] = useState([]);
    const [imagesProduct, setImagesProduct] = useState([])
    const [edit, setEdit] = useState(false);

    const getTruckById = async () => {//ESTE GET LO UTILIZAMOS PARA SETTEAR LAS CAJAS DE TEXTO CON LA INFORMACION INICIAL
        const response = await crud.GET(`/api/product/idproduct/${id}`);
        setProduct(response.product);
        setImagesProduct(response.product.images)
        console.log(response)
    }

    //const product {} SE ENCARGA DE IR GUARDANDO CAMBIOS SETEADOS POR setProduct() EN LA FUNCT onChange(e) 
    const { vin, make, model, year, odometer, engineManufacturer, gvwr, cargoBodyType, length, width, height, price, images, isAvailable } = product;

    const updateProduct = async () => {

        const data = {/****CONSTRUIMOS EL JSON data{nombre} QUE SERA ENVIADO => AL PUT ACTUALIZAR-CATEGORIA*****/
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
                isAvailable: product.isAvailable
            }

        console.log(data)

        if (product.images.length > 8) {
            return swal("ERROR", "El sistema no permite almacenar mas de 8 imagenes ", "error");
        }else{
            const response = await crud.PUT(`/api/product/${id}`, data);
            console.log(response)
            swal("BIEN HECHO!", "El Producto fue actualizado exitosamente!", "success");
            navigate(`/trucks_list`);
        }
    }

    //CUANDO SE PRESIONA EL BOTON [ACTUALIZAR] LA <form> EJECUTA LA FUNCION {onSubmit}
    const onSubmit = (e) => {
        e.preventDefault();//impedir que se recargue automaticamente
        updateProduct();
    }

    const onChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className="relative overflow-hidden hidden md:flex flex-col items-center bg-gradient-to-r from-black via-gray-400 to to-white h-full font-bold">
            <Navbar />
            {/*AQUI ORGANIZAMOS EL DIV PARA QUE LA PANTALLA SE DIVIDA EN DOS, A LA IZQ EL SIDBAR Y A LA DERECHA EL FORMULARIO*/}
            <div className="flex flex-row w-screen">
                <Sidebar />
                <div className="flex justify-center w-screen">
                    {/*AQUI EMPIEZA EL CUADRO ROJO QUE CONTIENE EL FORMULARIO*/}
                    <div className="relative mt-32 mb-14 bg-white border border-black shadow-2xl shadow-red-600 h-[1524px] w-[484px] rounded-xl flex justify-center items-center">
                        <div className="bg-red-600 border border-white shadow-2xl shadow-black h-[1500px] w-[460px] rounded-xl ">
                            <span className="mb-6 flex justify-center text-xl text-white pt-4 font-semibold uppercase">Editar</span>

                            <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-3">
                                <div className="flex flex-col">
                                    <label className=" text-white font-medium">{subtitle.vin}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.vin ? "opacity-100" : "opacity-75"}`}
                                            id="vin"
                                            type="text"
                                            name="vin"
                                            value={vin}
                                            disabled={edit === subtitle.vin ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.vin ? setEdit(subtitle.vin) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <label className=" text-white font-medium">{subtitle.make}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.make ? "opacity-100" : "opacity-75"}`}
                                            id="make"
                                            type="text"
                                            name="make"
                                            value={make}
                                            disabled={edit === subtitle.make ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.make ? setEdit(subtitle.make) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-white font-medium">{subtitle.model}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.model ? "opacity-100" : "opacity-75"}`}
                                            id="model"
                                            type="text"
                                            name="model"
                                            value={model}
                                            disabled={edit === subtitle.model ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.model ? setEdit(subtitle.model) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.year}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.year ? "opacity-100" : "opacity-75"}`}
                                            id="year"
                                            type="number"
                                            name="year"
                                            value={year}
                                            disabled={edit === subtitle.year ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.year ? setEdit(subtitle.year) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.odometer}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.odometer ? "opacity-100" : "opacity-75"}`}
                                            id="odometer"
                                            type="number"
                                            name="odometer"
                                            value={odometer}
                                            disabled={edit === subtitle.odometer ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.odometer ? setEdit(subtitle.odometer) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.engineManufacturer}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.engineManufacturer ? "opacity-100" : "opacity-75"}`}
                                            id="engineManufacturer"
                                            type="text"
                                            name="engineManufacturer"
                                            value={engineManufacturer}
                                            disabled={edit === subtitle.engineManufacturer ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.engineManufacturer ? setEdit(subtitle.engineManufacturer) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-white font-medium">{subtitle.gvwr}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.gvwr ? "opacity-100" : "opacity-75"}`}
                                            id="gvwr"
                                            type="number"
                                            name="gvwr"
                                            value={gvwr}
                                            disabled={edit === subtitle.gvwr ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.gvwr ? setEdit(subtitle.gvwr) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-white font-medium">{subtitle.cargoBodyType}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.cargoBodyType ? "opacity-100" : "opacity-75"}`}
                                            id="cargoBodyType"
                                            type="text"
                                            name="cargoBodyType"
                                            value={cargoBodyType}
                                            disabled={edit === subtitle.cargoBodyType ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.cargoBodyType ? setEdit(subtitle.cargoBodyType) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-white font-medium">{subtitle.length}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.length ? "opacity-100" : "opacity-75"}`}
                                            id="length"
                                            type="number"
                                            name="length"
                                            value={length}
                                            disabled={edit === subtitle.length ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.length ? setEdit(subtitle.length) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.width}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.width ? "opacity-100" : "opacity-75"}`}
                                            id="width"
                                            type="number"
                                            name="width"
                                            value={width}
                                            disabled={edit === subtitle.width ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.width ? setEdit(subtitle.width) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.height}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.height ? "opacity-100" : "opacity-75"}`}
                                            id="height"
                                            type="number"
                                            name="height"
                                            value={height}
                                            disabled={edit === subtitle.height ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.height ? setEdit(subtitle.height) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.price}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.price ? "opacity-100" : "opacity-75"}`}
                                            id="price"
                                            type="number"
                                            name="price"
                                            value={price}
                                            disabled={edit === subtitle.price ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.price ? setEdit(subtitle.price) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-white font-medium">{subtitle.isAvailable}</label>
                                    <div className="flex items-center gap-2">
                                        <input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.isAvailable ? "opacity-100" : "opacity-75"}`}
                                            id="isAvailable"
                                            name="isAvailable"
                                            value={isAvailable}
                                            disabled={edit === subtitle.isAvailable ? false : true}
                                            required
                                            onChange={onChange}
                                        ></input>
                                        <BiEdit onClick={() => { edit !== subtitle.isAvailable ? setEdit(subtitle.isAvailable) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-white font-medium">{subtitle.deleteImages}</label>
                                    {/*AQUI VA UNA GRID CON LOS NOMBRES DEL FILE DE CADA FOTO*/}
                                    <div className="grid grid-cols-3">
                                  
                                    {
                                        imagesProduct.map((image, index) => (
                                            <div key={imagesProduct[index]}>
                                                <img src={image} alt="#" className="w-[115px] h-[92px] cursor-pointer" onClick={() => console.log("Posicion: "+index)}></img>
                                            </div>
                                        ))
                                    }

                                    </div>
                                </div>

                                <div className="flex flex-col pt-6 gap-5 mb-3">
                                    <button type="submit" value="Guardar Cambios" className="bg-white text-red-600 rounded-full border border-black shadow-lg shadow-black hover:bg-opacity-50 active:bg-opacity-70 w-[305px] h-[36px] flex justify-center items-center font-bold" >Guardar Cambios</button>
                                </div>

                                <div className="flex flex-col font-normal justify-center items-center text-sm">
                                    <Link className="mb-1 text-white underline hover:text-opacity-70 active:text-opacity-50" to={"/trucks_list"}>Regresar</Link>
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

export default UpdateProduct;

/* 
<div className="flex items-center gap-2">
<input className={`bg-white text-gray-700 py-2 px-12 rounded-xl leading-tight border border-black ${edit === subtitle.images ? "opacity-100" : "opacity-75"}`}
    id="images"
    type="text"
    name="images"
    value={images}
    disabled={edit === subtitle.images ? false : true}
    required
    onChange={onChange}
></input>
<BiEdit onClick={() => { edit !== subtitle.images ? setEdit(subtitle.images) : setEdit("") }} style={{ color: 'white', fontSize: '30px', cursor: "pointer" }} /></div>
*/