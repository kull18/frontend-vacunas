import InputSeach from "../../Atoms/InputSeach";
import DashBoard from "../../Molecules/HistorialVacunacionPaciente/DashBoard";
import { Outlet } from "react-router-dom";
function HistorialVacunacion() {
    return ( 
        <>
        <main className="flex-none sm:flex">
            <DashBoard></DashBoard>
                <article className="w-full">
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