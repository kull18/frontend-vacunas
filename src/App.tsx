import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './features/Users/presentation/Components/Pages/LoginPage'
import HistorialVacunacionPaciente from './features/Users/presentation/Components/Pages/PatientVaccinationHistoryPage';
import HeatlStatusPage from './features/Users/presentation/Components/Pages/HealtStatusPage';
import MainHistorialVacunationPage from './features/Users/presentation/Components/Pages/MainHistorialVacunationPage';
import PatientsRegistersPage from './features/Users/presentation/Components/Pages/PatientsRegistersPage';
import VaccinesRegisterPage from './features/Users/presentation/Components/Pages/VaccinesRegisterPage';
import VaccineTrasnporterPage from './features/Users/presentation/Components/Pages/VaccineTrasnporterPage';
import { ModalProvider } from './features/Users/presentation/Components/Molecules/PacientesRegistrados/ModalContext';
import { ModalVaccineProvider } from './features/Users/presentation/Components/Molecules/GestionVacunas/ModalVaccineContext';
import { ModalBrigadesContext } from './features/Users/presentation/Components/Molecules/RegistroBrigadasVacunacion/ModalBrigadesContext';
import { ModalBrigadesVaccineContext } from './features/Users/presentation/Components/Molecules/RegistroBrigadasVacunacion/ModalBrigadesVaccineContext';
import RegisterBrigatesVacunation from './features/Users/presentation/Components/Pages/RegisterBrigadesVacunationPage';
import BrigatesVacunationPage from './features/Users/presentation/Components/Pages/BrigadesVacunationPage';
function App() {
  return (
    <>
    <ModalBrigadesVaccineContext>
    <ModalBrigadesContext>
    <ModalProvider>
      <ModalVaccineProvider>
      <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<HistorialVacunacionPaciente />}>
                    <Route path="Historial-vacunacion/paciente" element={<MainHistorialVacunationPage />} />
                    <Route path="estado-salud" element={<HeatlStatusPage />} />
                    <Route path="tabla-pacientes-registrados/enfermero" element={<PatientsRegistersPage></PatientsRegistersPage>}/>
                    <Route path="tabla-vacunas-registradas/enfermero" element={<VaccinesRegisterPage></VaccinesRegisterPage>}/>
                    <Route path="analisis-vacunas-transportacion/enfermero" element={<VaccineTrasnporterPage></VaccineTrasnporterPage>}/>
                    <Route path="registro-brigadas/administrador" element={<RegisterBrigatesVacunation></RegisterBrigatesVacunation>}/>
                    <Route path="brigadas/administrador" element={<BrigatesVacunationPage></BrigatesVacunationPage>}/>
                </Route>
            </Routes>
        </Router>
        </ModalVaccineProvider>
      </ModalProvider>
      </ModalBrigadesContext>
      </ModalBrigadesVaccineContext>
    </>
  )
}

export default App
