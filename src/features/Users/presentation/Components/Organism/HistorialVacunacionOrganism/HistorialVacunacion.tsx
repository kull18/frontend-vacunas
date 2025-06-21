import InputSeach from "../../Atoms/InputSeach";
import DashBoard from "../../Molecules/HistorialVacunacionPaciente/DashBoard";
import { Outlet } from "react-router-dom";
import style from "../../Organism/HistorialVacunacionOrganism/historial.module.css"
function HistorialVacunacion() {
    return ( 
        <>
        <main className="flex-none sm:flex">
            <div id={style.dashboard}>
            <DashBoard></DashBoard>
            </div>
                <article className="w-full" id={style.article}>
                    <div className="hidden sm:block">
                        <InputSeach></InputSeach>
                    </div>

                    <div>  {/* RENDERIZAR*/}
                        <Outlet></Outlet>
                    </div>
                </article>
        </main>
        </>
    );
}

export default HistorialVacunacion;