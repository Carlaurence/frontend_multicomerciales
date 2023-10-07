import React from "react";
import { useNavigate } from "react-router-dom";

const ButtomMakeOfert = ( props ) => {

    const navigate = useNavigate() //SE DEBE UTILIZAR PARA RE-DIRECCIONAR PAGINAS WEB

    const buttomHandler = () => {
        navigate("/make_offer");
    }

    return (
        <button className="
            bg-red-600 
            text-white  
            rounded-full
            border border-black 
            shadow-lg shadow-black
            hover:bg-opacity-90
            active:bg-opacity-50"
            style={{width: props.width, height: props.height}}
        onClick={buttomHandler}
        >
            Ofertar
        </button>
    )
}

export default ButtomMakeOfert;