import InputSeach from "../../Atoms/InputSeach";
import DashBoard from "../../Molecules/HistorialVacunacionPaciente/DashBoard";
import { Outlet } from "react-router-dom";
import style from "../../Organism/HistorialVacunacionOrganism/historial.module.css"
import ModalPacientes from "../../Molecules/PacientesRegistrados/ModalPacientes";
import ModalVaccines from "../../Molecules/GestionVacunas/ModalVaccines";
import ModalBrigades from "../../Molecules/RegistroBrigadasVacunacion/ModalBrigades";
import ModalBrigadesVaccine from "../../Molecules/RegistroBrigadasVacunacion/ModalBrigadesVaccine";
import ModalBoxVaccunes from "../../Molecules/GroupsBrigades/ModalBoxVaccines";
import { useModal } from "../../Molecules/PacientesRegistrados/ModalContext";
import { useModalVaccines } from "../../Molecules/GestionVacunas/ModalVaccineContext";
import { useModalBrigades } from "../../Molecules/RegistroBrigadasVacunacion/ModalBrigadesContext";
import { useModalBrigadesVaccine } from "../../Molecules/RegistroBrigadasVacunacion/ModalBrigadesVaccineContext";
import { useModalBoxs } from "../../Molecules/GroupsBrigades/ModalBoxVaccinesContext";
function HistorialVacunacion() {
    const {mostrar}  = useModal();
    const {mostrarVaccine} = useModalVaccines();
    const {mostrarBrigades} = useModalBrigades();
    const {mostrarBrigadesVaccine} = useModalBrigadesVaccine();
    const {mostrarBoxs} = useModalBoxs();
    return ( 
        <>
        <main className="flex-none sm:flex">
            <div id={style.dashboard} className="flex-none sm:fixed">
            <DashBoard></DashBoard>
            </div>
                <article className="w-full ml-0 sm:ml-[36vh]" id={style.article}>
                    <div className="hidden sm:block">
                        <InputSeach></InputSeach>
                    </div>

                    <div className="">  {/* RENDERIZAR*/}
                        <Outlet></Outlet>
                    </div>
                </article>
                {mostrar && <ModalPacientes />}
                {mostrarVaccine && <ModalVaccines></ModalVaccines>}
                {mostrarBrigades && <ModalBrigades></ModalBrigades>}
                {mostrarBrigadesVaccine && <ModalBrigadesVaccine></ModalBrigadesVaccine>}
                {mostrarBoxs && <ModalBoxVaccunes></ModalBoxVaccunes>}
        </main>
        </>
    );
}

export default HistorialVacunacion;