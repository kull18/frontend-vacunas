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
import { ModalVaccinePrincipalProvider } from './features/Users/presentation/Components/Molecules/GestionVacunas/ModalVaccinesPrincipalContext';
import BrigatesVacunationPage from './features/Users/presentation/Components/Pages/BrigadesVacunationPage';
import GroupsVacunationPage from './features/Users/presentation/Components/Pages/GroupsVacunationPage';
import FormRegisterBrigade from './features/Users/presentation/Components/Pages/RegisterBrigadesPage';
import RegisterGroupPage from './features/Users/presentation/Components/Pages/RegisterGroupPage';
import BoxVaccinePage from './features/Users/presentation/Components/Pages/BoxVaccinesPage';
import { ModalBoxsProvider } from './features/Users/presentation/Components/Molecules/GroupsBrigades/ModalBoxVaccinesContext';
import RegisterNursesPage from './features/Users/presentation/Components/Pages/RegisterNursesPage';
import CardsBrigadesById from './features/Users/presentation/Components/Molecules/BrigadasVacunacion/CardBrigadesById';
import ProtectedRoute from './features/Users/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <>
    <ModalVaccinePrincipalProvider>
    <ModalBoxsProvider>
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
                    <Route path="registro-brigadas/administrador" element={<FormRegisterBrigade></FormRegisterBrigade>}/>
                    <Route path="brigadas/administrador" element={<BrigatesVacunationPage></BrigatesVacunationPage>}/>
                    <Route path="grupos/administrador" element={<GroupsVacunationPage></GroupsVacunationPage>}/>
                    <Route path="grupo/registrar/administrador" element={<RegisterGroupPage></RegisterGroupPage>}/>
                    <Route path="cajas-vacunas/administrador" element={<BoxVaccinePage></BoxVaccinePage>}/>
                    <Route path="enfermeros/gestion/administrador" element={<RegisterNursesPage></RegisterNursesPage>}/>
                    <Route path="brigada-individual/administrador/:idBrigade" element={<CardsBrigadesById></CardsBrigadesById>}/>
                </Route>
            </Routes>
        </Router>
        </ModalVaccineProvider>
      </ModalProvider>
      </ModalBrigadesContext>
      </ModalBrigadesVaccineContext>
      </ModalBoxsProvider>
      </ModalVaccinePrincipalProvider>
    </>
  )
}

export default App
