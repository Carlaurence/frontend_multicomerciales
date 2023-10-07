import React from "react";

const Pruebas = () => {

    return (
        <div className="relative w-screen h-full bg-orange-300">{/*El overflow-hidden recorta lo que se salga del <div> padre*/}
            <div className="relative z-10 w-[1000px] h-[600px]"></div>
            <div className="relative w-[1000px] h-[300px] bg-red-400 flex justify-center items-center">
                <div style={{ backgroundImage: "url(https://res.cloudinary.com/depcjbb7q/image/upload/v1690170111/Fondo1_rffkb6.jpg)" }} className="bg-cover bg-center fixed top-[0px] w-[900px] h-[555px]"></div>
            </div>
            <div className="relative w-[1000px] h-[500px]"></div>
        </div>
    )
}

export default Pruebas;

//<div className="absolute w-[400px] h-[450px] bg-orange-300">{/*El overflow-hidden recorta lo que se salga del <div> padre*/}
//{/*Margin [m-10] mueve la posicion del <div> en referencia al borde del <div> superior*/}
//<div className="relative m-10 w-[180px] h-[180px] bg-red-400 flex justify-center items-center">
//<div className="fixed bg-black/20 w-[50px] h-[50px]"></div>
//</div>
//{/*Padding [p-10] mueve la posicion del contenido interno del <div> en referencia a el mismo*/}
//<div className="relative p-8 w-[180px] h-[180px] bg-blue-300">Blue</div>
//{/*Margin [m-5] mueve la posicion del <div> en referencia al borde del <div> superior*/}
//<div className="relative m-5 w-[180px] h-[70px] bg-violet-500 flex items-center justify-center">violet</div>
//</div>