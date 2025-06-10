import logoVacuna from "../../../assets/vacunaLogo.png"
import logoTermometro from "../../../assets/termometroLogo.png"
import logoFrio from "../../../assets/frioLogo.png"
import style from "../../Molecules/LogoMolecules/logo.module.css"
function LogoVaccine() {
    return ( 
        <>
        <div className="relative flex flex-col items-center justify-center absolute">
            <img src={logoFrio} alt="Frío" className="w-10 absolute top-12" id={style.cold}/>
                <div className="h-[2.2vh] w-4 rounded-4xl bg-white absolute left-9" id={style.firstCircule}></div>
                <div className="h-7 w-7 rounded-4xl bg-white absolute left-15" id={style.secondCircule}></div>
                <div className="h-3 w-3 rounded-4xl bg-white absolute left-18" id={style.thirdCircule}></div>
            <img src={logoVacuna} alt="Vacuna" className="w-38" id={style.vacuna}/>
            <img src={logoTermometro} alt="Termómetro" className="w-12 absolute bottom-2 left-13 top-9" id={style.temperature}/>
        </div>
        </>
    );
}

export default LogoVaccine;