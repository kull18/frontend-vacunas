import searchLogo from "../../../../../assets/searchLogo.png"
import style from "../../Components/Molecules/HistorialVacunacionPaciente/dashboard.module.css"
function InputSeach() {
    return ( 
        <>
        <div className="flex items-center pl-8" id={style.inputSeach}>
            <img src={searchLogo} alt="searh" className="w-7 h-7"/>
            <input type="text" id={style.input} placeholder="Buscar" className="w-full"/>
        </div>
        </>
    );
}

export default InputSeach;