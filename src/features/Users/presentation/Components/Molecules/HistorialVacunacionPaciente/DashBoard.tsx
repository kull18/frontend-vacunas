import logo from "../../../../../../assets/logo.png"
import historyVaccineLogo from "../../../../../../assets/historialVacunacionLogo.png"
import estateSalud from "../../../../../../assets/miEstadoSaludLogo.png"
import logout from "../../../../../../assets/LogoutLogo.png"
import inventory from "../../../../../../assets/inventoryLogo.png"
import vaccineInventory from "../../../../../../assets/vacunaInventario.png"
import cooler from "../../../../../../assets/coolerIcon.png"
import brigada from "../../../../../../assets/brigada.png"
import ListDashboard from "./listDashboard"
import style from "../../Molecules/HistorialVacunacionPaciente/dashboard.module.css"
import userLogo from "../../../../../../assets/userLogo.png"
import menu from "../../../../../../assets/menuLogo.png"
import user from "./../../../../../../assets/userLogo.png"
import { useState, useEffect, useRef } from "react";
import InputSeach from "../../Atoms/InputSeach"
import { useNavigate } from "react-router-dom"
function DashBoard() {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLImageElement>(null); 
    const [selectedSection, setSelectedSection] = useState("Historial de vacunación");

    const showOptions = () =>{
        setShowMenu(!showMenu)
    }

    const navigate = useNavigate();
    const navigateHistoryPatient = () => {
    navigate("/dashboard/Historial-vacunacion/paciente");
    };

    const navigateStatePatient = () => {
    navigate("/dashboard/estado-salud");
    };

    const tableAnalysis = () => {
    navigate("/dashboard/tabla-pacientes-registrados/enfermero");
    setSelectedSection("Tabla de analisis");
    };

    const tableVaccines = () =>{
      navigate("/dashboard/tabla-vacunas-registradas/enfermero")
      setSelectedSection("Gestión de vacunas");
    }

    const transporter = () => {
      navigate("/dashboard/analisis-vacunas-transportacion/enfermero")
      setSelectedSection("Transportadora");
    }

    const brigadaVacunacion = () =>{
      navigate("/dashboard/brigadas/administrador")
      setSelectedSection("Brigada de vacunacion");
    }
    
type Rol = "paciente" | "enfermero" | "admin"; // Simulación del tipo esperado

const rol = "paciente" as Rol; // Aquí haces la prueba


    const navigateLogin = () =>{
        navigate("/")
    }

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current && 
            !menuRef.current.contains(event.target as Node) && 
            menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node) // 🔥 Verifica si el clic viene del botón
        ) {
            setShowMenu(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);


    const isDesktop = window.innerWidth >= 768;
    return ( 
        <>
            <aside className="bg-[#A2D9FF] h-full w-[36vh] min-h-screen" id={style.aside}>
              <div className="">
                <div id={style.boxSectionLogo} className="flex">
                    <div className="h-20 w-full bg-[#71B8E8] flex 
                        items-center justify-between gap-3
                        sm:flex sm:justify-center" id={style.sectionLogo}>
                        <div className="flex items-center">
                            <img src={logo} alt="logo" className="w-10" id={style.logo}/>
                            <p className="text-[2vh] text-white ml-4">Brigadas de vacunación</p>
                        </div>

                        <div className="flex flex-col pt-3 block sm:hidden">
                            <div className="flex items-center">
                                <p className="mr-1 text-[#0000008e]">usuario</p>
                                <img src={userLogo} alt="" className="w-6 h-7"/>
                            </div>

                            <div className="flex justify-end mt-4 mr-2">
                                <img src={menu} alt="" className="w-7 h-7" onClick={showOptions}
                                ref={menuButtonRef}/>
                            </div>
                        </div>
                    </div>
                </div>


            
                {/* Sección para paciente */}
          {rol === "paciente" && (showMenu || isDesktop) && (
      <div id={showMenu ? style.show : style.hide} ref={menuRef}>
        <ListDashboard
          image={historyVaccineLogo}
          text="Historial de vacunación"
          onClick={() => {
            navigateHistoryPatient();
            setSelectedSection("Historial de vacunación");
          }}
          selected={selectedSection === "Historial de vacunación"}
        />

        <ListDashboard
          image={estateSalud}
          text="Mi estado de salud"
          onClick={() => {
            navigateStatePatient();
            setSelectedSection("Mi estado de salud");
          }}
          selected={selectedSection === "Mi estado de salud"}
        />

        <ListDashboard
          image={logout}
          text="Cerrar sesión"
          onClick={navigateLogin}
          selected={false}
        />
      </div>
    )}

    {/* Sección para enfermero */}
    {rol === "enfermero" && (showMenu || isDesktop) && (
      <div id={showMenu ? style.show : style.hide} ref={menuRef}>
        <ListDashboard
          image={inventory}
          text="Tabla de analisis"
          onClick={() => {
            tableAnalysis();
          }}
          selected={selectedSection === "Tabla de analisis"}
        />

        <ListDashboard
          image={vaccineInventory}
          text="Gestión de vacunas"
          onClick={() => {
            tableVaccines();
          }}
          selected={selectedSection === "Gestión de vacunas"}
        />

        <ListDashboard
          image={cooler}
          text="Transportadora"
          onClick={() => {
            transporter();
          }}
          selected={selectedSection === "Transportadora"}
        />

        <ListDashboard
          image={logout}
          text="Cerrar sesión"
          onClick={navigateLogin}
          selected={false}
        />

      </div>
    )}

    {rol === "admin" && (showMenu || isDesktop) &&(
      <div>
      <ListDashboard
          image={brigada}
          text="Brigada de vacunacion"
          onClick={brigadaVacunacion}
          selected={false}
        />

        <ListDashboard
          image={logout}
          text="Cerrar sesión"
          onClick={navigateLogin}
          selected={false}
        />
    </div>
        
    )}
    </div>
    <div className="flex ml-4 mt-80 text-[#40536da7] font-medium gap-2 hidden sm:block sm:flex">
      <img src={user} alt="" className="w-6 h-6"/>
      <p>Usuario: Davity</p>
    </div>
            </aside>
            <div className="block sm:hidden">
                <InputSeach></InputSeach>
            </div>
        </>
    );
}

export default DashBoard;