import FormLogin from "../../Molecules/LoginMolecules/formLogin";
import LogoVaccine from "../../Molecules/LogoMolecules/logoVaccine";
import style from "../LoginOrganism/loginOrg.module.css"
import { useState } from "react";
function LoginOrg() {
    const [showLogin, setShowLogin] = useState(false);
    return ( 
        <>
            <div id={style.fondo} className="">
            <svg id={style.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#a2d8ff54" fill-opacity="1" d="M0,192L34.3,181.3C68.6,171,137,149,206,165.3C274.3,181,343,235,411,250.7C480,267,549,245,617,208C685.7,171,754,117,823,96C891.4,75,960,85,1029,122.7C1097.1,160,1166,224,1234,229.3C1302.9,235,1371,181,1406,154.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
            </svg>

            <svg id={style.waveSecond} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#a2d8ff30" fill-opacity="1" d="M0,224L34.3,197.3C68.6,171,137,117,206,106.7C274.3,96,343,128,411,160C480,192,549,224,617,202.7C685.7,181,754,107,823,101.3C891.4,96,960,160,1029,165.3C1097.1,171,1166,117,1234,96C1302.9,75,1371,85,1406,90.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
            </svg>

                
                
                <div className="flex justify-center items-center min-h-screen">
                        <div id={style.logo}>
                            <LogoVaccine></LogoVaccine>
                        </div>
                        
                        <div className="mt-[90vh] text-[#657bb6d4] text-center font-bold text-[2.5vh] mr-60" id={style.welcome}>
                        <p id={style.text}>Bienvenido al sistema de brigadas de <br /> vacunación</p>
                        </div>
                        
                        <div className="flex flex-col mt-[60vh] items-center" id={style.boxButtons}>
                        <div className="text-center">
                        <p className="text-center text-[#657bb6d4] w-[45vh] mt-2 font-bold text-[2.5vh] sm:hidden">Bienvenido al sistema de brigadas de vacunación</p>
                        </div>

                        </div>
                </div>
                    
                <div id={showLogin ? style.show : style.login}>
                                <FormLogin />
                </div>
            </div>
        </>
    );
}

export default LoginOrg;