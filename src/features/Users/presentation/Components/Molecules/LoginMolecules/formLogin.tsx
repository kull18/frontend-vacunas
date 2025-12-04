import style from "./../LoginMolecules/formLogin.module.css"
import { useNavigate } from "react-router-dom";
import type { UserLogin } from "../../../../User/Domain/User";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";
import { useState } from "react";
import { userAuth } from "../../../../User/Presentation/Hooks/AuthUser";
import { useAuth } from "../../../../User/Presentation/Hooks/AuthProvider";

function FormLogin() {
    const navigate = useNavigate();
    const { setUser } = userAuth();
    const { setToken } = useAuth();

    const { loginUser, loading, clearError } = useLoginUser();
    const [formData, setFormData] = useState<UserLogin>({
        username: "",
        password: "",
    });

    // Estados para las alertas
    const [showWelcome, setShowWelcome] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showEmptyFields, setShowEmptyFields] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState<any>(null);

    // Limpiar errores al editar campos
    const handleInputChange = (field: 'username' | 'password', value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        
        // Limpiar error visual si el usuario está editando
        if (showError) {
            clearError();
            setShowError(false);
        }
    };

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos vacíos
        if (!formData.username.trim() || !formData.password.trim()) {
            setShowEmptyFields(true);
            setTimeout(() => {
                setShowEmptyFields(false);
            }, 3000);
            return;
        }

        try {
            console.log("user", formData)
            const { token, body } = await loginUser(formData);

            if (!body.role) {
                throw new Error("La respuesta del servidor no incluye el rol");
            }

            const role = body.role.toLowerCase();
            setUser(body);
            setToken(token);
            setUserData(body);

            // Mostrar alerta de bienvenida
            setShowWelcome(true);

            // Esperar 2.5 segundos antes de redirigir
            setTimeout(() => {
                setShowWelcome(false);
                
                // Redirección según el rol
                switch (role) {
                    case "enfermero":
                        console.log("ROLE", role);
                        navigate("/dashboard/tabla-pacientes-registrados/enfermero");
                        break;
                    case "paciente":
                        navigate("/dashboard/Historial-vacunacion/paciente");
                        break;
                    case "director":
                        navigate("/dashboard/brigadas/administrador");
                        break;
                    default:
                        alert("Rol no reconocido. Redirección cancelada.");
                        break;
                }
            }, 2500);

        } catch (err: any) {
            console.error("❌ Error en login:", err);
            
            // Determinar el mensaje según el tipo de error
            if (err.type === 'invalid_credentials') {
                setErrorMessage('Credenciales inválidas');
            } else if (err.type === 'network_error') {
                setErrorMessage('Error de conexión. Verifica tu internet.');
            } else if (err.type === 'server_error') {
                setErrorMessage('Error del servidor. Intenta más tarde.');
            } else {
                setErrorMessage(err.message || 'Error al iniciar sesión');
            }
            
            // Mostrar alerta de error
            setShowError(true);
            
            // Ocultar alerta después de 4 segundos
            setTimeout(() => {
                setShowError(false);
            }, 4000);
        }
    };

    return (
        <>
            {/* Alerta de Bienvenida */}
            {showWelcome && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-scaleIn">
                        <div className="text-center">
                            {/* Icono animado */}
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Título */}
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                ¡Bienvenido!
                            </h2>

                            {/* Emoji */}
                            <div className="text-5xl mb-4">💉</div>

                            {/* Nombre del usuario */}
                            <p className="text-lg font-semibold text-gray-700 mb-1">
                                {userData?.name} {userData?.lastname}
                            </p>

                            {/* Subtítulo */}
                            <p className="text-gray-500 text-sm mb-6">
                                Brigadas de Vacunación
                            </p>

                            {/* Barra de progreso */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 h-full rounded-full animate-progress"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Alerta de Error - Genérica */}
            {showError && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-shake pointer-events-auto">
                        <div className="text-center">
                            {/* Icono de error genérico */}
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-gray-400 to-gray-600">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>

                            {/* Título */}
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                Error de conexión
                            </h2>

                            {/* Emoji */}
                            <div className="text-5xl mb-4">⚠️</div>

                            {/* Mensaje de error */}
                            <p className="text-gray-600 text-base font-semibold mb-6">
                                {errorMessage}
                            </p>

                            {/* Botón */}
                            <button
                                onClick={() => setShowError(false)}
                                className="w-full px-6 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm shadow-md"
                            >
                                Intentar de nuevo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Alerta de Campos Vacíos */}
            {showEmptyFields && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-shake pointer-events-auto">
                        <div className="text-center">
                            {/* Icono de advertencia */}
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Título */}
                            <h2 className="text-xl font-bold text-gray-800 mb-3">
                                Campos incompletos
                            </h2>

                            {/* Emoji */}
                            <div className="text-5xl mb-4">⚠️</div>

                            {/* Mensaje */}
                            <p className="text-gray-600 text-sm mb-6">
                                Por favor, completa todos los campos para continuar
                            </p>

                            {/* Botón */}
                            <button
                                onClick={() => setShowEmptyFields(false)}
                                className="w-full px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm shadow-md"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={registerUser} className="bg-[#cdcdcd30] z-50 w-[80vh] pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
                <p className="text-[6vh] text-center text-[#585a61] mb-6 z-10" id={style.font}>Iniciar sesión</p>

                <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={loading}
                />

                <input
                    id="lugar"
                    type="password"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm mt-6 w-full
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={loading}
                />

                <button 
                    className="bg-[#9CD5F4] rounded-3xl mt-7 px-16 py-3 
                    text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
                    id={style.font} 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            CARGANDO...
                        </span>
                    ) : (
                        'ENTRAR'
                    )}
                </button>
            </form>

            {/* CSS para las animaciones */}
            <style>{`
                @keyframes scaleIn {
                    from {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }

                @keyframes progress {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }

                .animate-scaleIn {
                    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                .animate-progress {
                    animation: progress 2.5s linear;
                }
            `}</style>
        </>
    );
}

export default FormLogin;