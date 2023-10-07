/******************** COMPONENTE SLIDER INDIVIDUAL ***************************/
/*NOTA IMPORTANTE: LAS IMAGENES DE LOS VEHICULOS DEBEN CONSERVAR UNA RELACION DE ASAPECTO DE 5:4
*/
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

/*EN ESTE ARG {images} ENTRA UN ARRAY DE IMAGES POR CADA LLAMADO DEL COMPONENTE <Carousel/>*/
const Carousel = (props) => {

    /*************************************************************************************************/
    /************CONSTRUCCION DE FUNCIONES PARA DAR MOVIMIENTO A LAS FLECHAS SLIDER*******************/
    /*************************************************************************************************/
    const [currentIndex, setCurrentIndex] = useState(0);//El indice inicial va a ser 0 por defecto

    //Funcionamiento de la flecha izq <= del slider
    //Esta funcion se debe insertar en la Left Arrow mediante un onClick()
    const prevSlider = () => {
        const isFirstSlider = currentIndex === 0;
        const newIndex = isFirstSlider ? props.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    //Funcionamiento de la flecha derecha => del slider
    //Esta funcion se debe insertar en la Right Arrow mediante un onClick()
    const nextSlider = () => {
        const isLastSlider = currentIndex === props.images.length - 1;
        const newIndex = isLastSlider ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    //Funcionamiento de la Barra inferior de puntos para correr las imagenes
    const goToSlide = (index) => {
        setCurrentIndex(index);
    }

    /*NOTA IMPORTANTE: LAS IMAGENES DE LOS VEHICULOS DEBEN CONSERVAR UNA RELACION DE ASAPECTO DE 5:4
     */

    return (
        <div>
            {/*ESTE DIV CONTIENE LA IMAGEN CAROUSEL*/}
            <div style={{ height: props.height, width: props.width, backgroundImage: `url(${props.images[currentIndex]})` }} className='relative flex items-end bg-cover bg-center bg-no-repeat rounded-md bg-gray-900'>

                {/*ESTE DIV CONTIENE UNICAMENTE LOS LATERAL ARROWS Y LOS DOTS A UNA ALTURA DEL 50% DEL DIV DE LA IMAGEN*/}
                <div className='relative flex flex-col justify-between h-[60%] w-full'>

                    {/*ESTE DIV CONTIENE LOS DOS LATERAL ARROWS DENTRO DE LA IMAGEN*/}
                    <div className='flex justify-between w-full h-14' >

                        <div className='hidden group-hover:block h-12 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' >
                            <BsChevronCompactLeft size={30} onClick={() => prevSlider()} />
                        </div>

                        <div className='hidden group-hover:block h-12 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' >
                            <BsChevronCompactRight size={30} onClick={() => nextSlider()} />
                        </div>

                    </div>

                    {/*ESTE DIV CONTIENE LOS DOTS DENTRO DE LA IMAGEN*/}
                    <div className='flex justify-center'>
                        <div className='flex rounded-xl bg-black/30'>
                            {props.images.map((element, index) => (
                                <div key={index} className='text-xl text-white/70 cursor-pointer'>
                                    <RxDotFilled onClick={() => goToSlide(index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Carousel;