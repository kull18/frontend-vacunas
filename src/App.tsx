import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './features/Users/presentation/Components/Pages/LoginPage'
import HistorialVacunacionPaciente from './features/Users/presentation/Components/Pages/PatientVaccinationHistoryPage';
import HeatlStatusPage from './features/Users/presentation/Components/Pages/HealtStatusPage';
import MainHistorialVacunationPage from './features/Users/presentation/Components/Pages/MainHistorialVacunationPage';
function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/dashboard" element={<HistorialVacunacionPaciente />}>
                    <Route path="Historial-vacunacion/paciente" element={<MainHistorialVacunationPage />} />
                    <Route path="estado-salud" element={<HeatlStatusPage />} />
                </Route>
            </Routes>
        </Router>
    </>
  )
}

export default App
