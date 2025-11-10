import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LoginPage from './features/Users/presentation/Components/Pages/LoginPage';
import HistorialVacunacionPaciente from './features/Users/presentation/Components/Pages/PatientVaccinationHistoryPage';
import HeatlStatusPage from './features/Users/presentation/Components/Pages/HealtStatusPage';
import MainHistorialVacunationPage from './features/Users/presentation/Components/Pages/MainHistorialVacunationPage';
import PatientsRegistersPage from './features/Users/presentation/Components/Pages/PatientsRegistersPage';
import VaccinesRegisterPage from './features/Users/presentation/Components/Pages/VaccinesRegisterPage';
import VaccineTrasnporterPage from './features/Users/presentation/Components/Pages/VaccineTrasnporterPage';
import BrigatesVacunationPage from './features/Users/presentation/Components/Pages/BrigadesVacunationPage';
import GroupsVacunationPage from './features/Users/presentation/Components/Pages/GroupsVacunationPage';
import FormRegisterBrigade from './features/Users/presentation/Components/Pages/RegisterBrigadesPage';
import RegisterGroupPage from './features/Users/presentation/Components/Pages/RegisterGroupPage';
import BoxVaccinePage from './features/Users/presentation/Components/Pages/BoxVaccinesPage';
import RegisterNursesPage from './features/Users/presentation/Components/Pages/RegisterNursesPage';
import CardsBrigadesById from './features/Users/presentation/Components/Molecules/BrigadasVacunacion/CardBrigadesById';
import ProtectedRoute from './features/Users/ProtectedRoute';

// Context Providers
import { ModalProvider } from './features/Users/presentation/Components/Molecules/PacientesRegistrados/ModalContext';
import { ModalVaccineProvider } from './features/Users/presentation/Components/Molecules/GestionVacunas/ModalVaccineContext';
import { ModalBrigadesContext } from './features/Users/presentation/Components/Molecules/RegistroBrigadasVacunacion/ModalBrigadesContext';
import { ModalBrigadesVaccineContext } from './features/Users/presentation/Components/Molecules/RegistroBrigadasVacunacion/ModalBrigadesVaccineContext';
import { ModalVaccinePrincipalProvider } from './features/Users/presentation/Components/Molecules/GestionVacunas/ModalVaccinesPrincipalContext';
import { ModalBoxsProvider } from './features/Users/presentation/Components/Molecules/GroupsBrigades/ModalBoxVaccinesContext';
import { TemperatureProvider } from './shared/TemperatureProvider';
import { HumidityProvider } from './shared/HumidityProvider';
import { AuthProvider } from './Context/AuthContext';
import { UserCivilStatsProvider } from './shared/useCivilProvider';

function App() {
  return (
    <AuthProvider>
      <TemperatureProvider>
        <UserCivilStatsProvider>
        <HumidityProvider>
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
                            <Route path="tabla-pacientes-registrados/enfermero" element={<PatientsRegistersPage />} />
                            <Route path="tabla-vacunas-registradas/enfermero" element={<VaccinesRegisterPage />} />
                            <Route path="analisis-vacunas-transportacion/enfermero" element={<VaccineTrasnporterPage />} />
                            <Route path="registro-brigadas/administrador" element={<FormRegisterBrigade />} />
                            <Route path="brigadas/administrador" element={<BrigatesVacunationPage />} />
                            <Route path="grupos/administrador" element={<GroupsVacunationPage />} />
                            <Route path="grupo/registrar/administrador" element={<RegisterGroupPage />} />
                            <Route path="cajas-vacunas/administrador" element={<BoxVaccinePage />} />
                            <Route path="enfermeros/gestion/administrador" element={<RegisterNursesPage />} />
                            <Route path="brigada-individual/administrador/:idBrigade" element={<CardsBrigadesById />} />
                            
                          </Route>
                        </Routes>
                      </Router>
                    </ModalVaccineProvider>
                  </ModalProvider>
                </ModalBrigadesContext>
              </ModalBrigadesVaccineContext>
            </ModalBoxsProvider>
          </ModalVaccinePrincipalProvider>
        </HumidityProvider>
        </UserCivilStatsProvider>
      </TemperatureProvider>
    </AuthProvider>
  );
}

export default App;
