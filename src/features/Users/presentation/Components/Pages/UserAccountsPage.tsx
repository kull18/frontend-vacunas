import { useGetCivilUsersWithoutAccount } from '../../../../Users/User/Presentation/Hooks/useGetCivilUsersWithoutAccount';
import { useGetUserAccounts } from '../../../../Users/User/Presentation/Hooks/useGetUserAccounts';
import { useState, useMemo, useTransition, Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useCreateUser } from '../../../User/Presentation/Hooks/useCreateUsers';
import type { UserCivil } from '../../../User/Domain/User';
import { useDeleteUser } from '../../../User/Presentation/Hooks/useDeleteUser';

// ✅ MODAL DE CONFIRMACIÓN DE ELIMINACIÓN
interface DeleteUserConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  username: string;
}

function DeleteUserConfirmationModal({ isOpen, onConfirm, onCancel, username }: DeleteUserConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onCancel}
      ></div>

      {/* Modal centrado */}
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-lg px-4"
        style={{ position: 'fixed' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl animate-in zoom-in fade-in duration-200">
          {/* Header rojo */}
          <div className="bg-red-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold text-white">Eliminar Cuenta</h2>
              <p className="text-sm text-red-100 mt-1">Esta acción no se puede deshacer</p>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Icono de advertencia */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Información del usuario */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 justify-center">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm text-gray-700">
                  Usuario:{' '}
                  <span className="font-bold text-red-700">{username}</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm mb-6">
              Se eliminará el acceso del usuario y toda su información asociada permanentemente.
            </p>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

// ✅ MODAL DE CREAR CUENTA
interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  setFormData: (data: any) => void;
  loading?: boolean;
}

function CreateAccountModal({ isOpen, onClose, onSubmit, formData, setFormData, loading }: CreateAccountModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onClose}
      ></div>

      {/* Modal centrado */}
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md px-4"
        style={{ position: 'fixed' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
          
          {/* Header */}
          <div className="bg-blue-600 px-6 py-5 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
              <p className="text-sm text-blue-100 mt-1">Configura el acceso para el paciente</p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <form onSubmit={onSubmit}>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre de usuario <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rol <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  disabled={loading}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white disabled:opacity-50 disabled:bg-gray-100"
                >
                  <option value="paciente">Paciente</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creando...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}

// Componente de Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-9 w-96 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="h-40 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="h-96 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Componente de contenido principal
function UserAccountsContent() {
  const { data: civilUsers, loading: loadingCivil, refetch: refetchCivil } = useGetCivilUsersWithoutAccount();
  const { data: accounts, loading: loadingAccounts, refetch: refetchAccounts } = useGetUserAccounts();
  const { createUser, loading: creatingUser } = useCreateUser();
  const { deleteUser, loading: deletingUser } = useDeleteUser();

  // useTransition para transiciones no urgentes
  const [isPendingCivil, startTransitionCivil] = useTransition();
  const [isPendingAccounts, startTransitionAccounts] = useTransition();

  // Estados de paginación para usuarios sin cuenta
  const [currentPageCivil, setCurrentPageCivil] = useState(1);
  const itemsPerPageCivil = 6;

  // Estados de paginación para cuentas activas
  const [currentPageAccounts, setCurrentPageAccounts] = useState(1);
  const itemsPerPageAccounts = 10;

  const [showModal, setShowModal] = useState(false);
  const [selectedCivil, setSelectedCivil] = useState<UserCivil | null>(null);
  
  // ✅ Estados para el modal de confirmación de eliminación
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{id: number, username: string} | null>(null);
  
  const [formData, setFormData] = useState({
    idUser: null, 
    username: '',
    groupIdGroup: null, 
    password: '',
    role: 'paciente',
    name: '',
    lastname: '',
    idUserCivil: 0
  });

  // Memoizar paginación para usuarios civiles
  const { paginatedCivilData, totalPagesCivil, startIndexCivil, endIndexCivil } = useMemo(() => {
    const startIndex = (currentPageCivil - 1) * itemsPerPageCivil;
    const endIndex = startIndex + itemsPerPageCivil;
    const totalPages = Math.ceil(civilUsers.length / itemsPerPageCivil);
    const paginatedData = civilUsers.slice(startIndex, endIndex);
    
    return {
      paginatedCivilData: paginatedData,
      totalPagesCivil: totalPages,
      startIndexCivil: startIndex,
      endIndexCivil: endIndex
    };
  }, [civilUsers, currentPageCivil, itemsPerPageCivil]);

  // Memoizar paginación para cuentas activas
  const { paginatedAccountsData, totalPagesAccounts, startIndexAccounts, endIndexAccounts } = useMemo(() => {
    const startIndex = (currentPageAccounts - 1) * itemsPerPageAccounts;
    const endIndex = startIndex + itemsPerPageAccounts;
    const totalPages = Math.ceil(accounts.length / itemsPerPageAccounts);
    const paginatedData = accounts.slice(startIndex, endIndex);
    
    return {
      paginatedAccountsData: paginatedData,
      totalPagesAccounts: totalPages,
      startIndexAccounts: startIndex,
      endIndexAccounts: endIndex
    };
  }, [accounts, currentPageAccounts, itemsPerPageAccounts]);

  // Funciones de navegación para usuarios civiles con transiciones
  const goToNextPageCivil = () => {
    startTransitionCivil(() => {
      setCurrentPageCivil((prev) => Math.min(prev + 1, totalPagesCivil));
    });
  };

  const goToPreviousPageCivil = () => {
    startTransitionCivil(() => {
      setCurrentPageCivil((prev) => Math.max(prev - 1, 1));
    });
  };

  const goToPageCivil = (page: number) => {
    startTransitionCivil(() => {
      setCurrentPageCivil(page);
    });
  };

  // Funciones de navegación para cuentas activas con transiciones
  const goToNextPageAccounts = () => {
    startTransitionAccounts(() => {
      setCurrentPageAccounts((prev) => Math.min(prev + 1, totalPagesAccounts));
    });
  };

  const goToPreviousPageAccounts = () => {
    startTransitionAccounts(() => {
      setCurrentPageAccounts((prev) => Math.max(prev - 1, 1));
    });
  };

  const goToPageAccounts = (page: number) => {
    startTransitionAccounts(() => {
      setCurrentPageAccounts(page);
    });
  };

  // Memoizar generación de números de página
  const getPageNumbers = useMemo(() => {
    return (currentPage: number, totalPages: number) => {
      const pages: (number | string)[] = [];
      const maxPagesToShow = 5;
      
      if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          pages.push(currentPage - 1);
          pages.push(currentPage);
          pages.push(currentPage + 1);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };
  }, []);

  const handleCreateAccount = (civil: UserCivil) => {
    setSelectedCivil(civil);
    setFormData({
      idUser: null, 
      username: civil.fol,
      groupIdGroup: null, 
      password: '',
      role: 'paciente',
      name: civil.name,
      lastname: `${civil.firstLastname} ${civil.secondLastname}`,
      idUserCivil: civil.idUserCivil
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("user", formData);

    // Toast de carga
    const loadingToast = toast.loading('Creando cuenta de usuario...', {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
        padding: '16px',
      },
    });

    try {
      await createUser(formData);
      
      // Toast de éxito
      toast.success(
        <div>
          <strong className="block mb-1">¡Cuenta creada exitosamente!</strong>
          <p className="text-sm opacity-90">Usuario: {formData.username}</p>
        </div>,
        {
          id: loadingToast,
          duration: 4000,
          icon: '✅',
          style: {
            borderRadius: '12px',
            background: '#10b981',
            color: '#fff',
            padding: '16px',
          },
        }
      );

      setShowModal(false);
      
      // Usar transición para las actualizaciones
      startTransitionCivil(() => {
        setCurrentPageCivil(1);
      });
      
      refetchCivil();
      refetchAccounts();
    } catch (error) {
      // Toast de error
      toast.error(
        <div>
          <strong className="block mb-1">Error al crear la cuenta</strong>
          <p className="text-sm opacity-90">Por favor intenta nuevamente</p>
        </div>,
        {
          id: loadingToast,
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#ef4444',
            color: '#fff',
            padding: '16px',
          },
        }
      );
      console.error('Error creating user:', error);
    }
  };

  // ✅ Función para mostrar modal de confirmación de eliminación
  const handleDeleteClick = (idUser: number, username: string) => {
    setUserToDelete({ id: idUser, username });
    setShowDeleteConfirm(true);
  };

  // ✅ Función para cancelar eliminación
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // ✅ Función para confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setShowDeleteConfirm(false);

    console.log("user id", userToDelete.id);

    // Toast de carga
    const loadingToast = toast.loading('Eliminando cuenta...', {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
        padding: '16px',
      },
    });

    try {
      const success = await deleteUser(userToDelete.id);
      
      if (success) {
        // Toast de éxito
        toast.success(
          <div>
            <strong className="block mb-1">Cuenta eliminada exitosamente</strong>
            <p className="text-sm opacity-90">Usuario: {userToDelete.username}</p>
          </div>,
          {
            id: loadingToast,
            duration: 3000,
            icon: '🗑️',
            style: {
              borderRadius: '12px',
              background: '#10b981',
              color: '#fff',
              padding: '16px',
            },
          }
        );

        const remainingItems = accounts.length - 1;
        const maxPage = Math.ceil(remainingItems / itemsPerPageAccounts);
        
        startTransitionAccounts(() => {
          if (currentPageAccounts > maxPage && maxPage > 0) {
            setCurrentPageAccounts(maxPage);
          }
        });
        
        refetchCivil();
        refetchAccounts();
      } else {
        toast.error('No se pudo eliminar la cuenta', {
          id: loadingToast,
          duration: 3000,
        });
      }
    } catch (error) {
      // Toast de error
      toast.error(
        <div>
          <strong className="block mb-1">Error al eliminar la cuenta</strong>
          <p className="text-sm opacity-90">Por favor intenta nuevamente</p>
        </div>,
        {
          id: loadingToast,
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#ef4444',
            color: '#fff',
            padding: '16px',
          },
        }
      );
      console.error('Error deleting user:', error);
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* ✅ TOASTER */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestión de Cuentas de Usuario
          </h1>
          <p className="text-gray-600">
            Crea y administra cuentas de acceso para pacientes registrados
          </p>
        </div>

        {/* Pacientes sin cuenta */}
        <div className="mb-8">
          <div className={`bg-white rounded-2xl shadow-lg p-6 transition-opacity duration-200 ${
            isPendingCivil ? 'opacity-60' : 'opacity-100'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Pacientes sin Cuenta</h2>
                  <p className="text-sm text-gray-500">
                    {civilUsers.length > 0 
                      ? `${civilUsers.length} paciente${civilUsers.length !== 1 ? 's' : ''} sin cuenta`
                      : 'No hay pacientes sin cuenta'
                    }
                  </p>
                </div>
              </div>
              
              {/* Indicador de carga cuando está pendiente */}
              {isPendingCivil && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Actualizando...</span>
                </div>
              )}
            </div>

            {loadingCivil ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-gray-500 mt-4">Cargando pacientes...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {paginatedCivilData.map((civil) => (
                    <div key={civil.idUserCivil} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {civil.name} {civil.firstLastname}
                          </h3>
                          <p className="text-sm text-gray-500">Folio: {civil.fol}</p>
                          {civil.CURP && (
                            <p className="text-xs text-gray-400 font-mono">{civil.CURP}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCreateAccount(civil)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Crear Cuenta
                      </button>
                    </div>
                  ))}
                </div>

                {civilUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 font-medium">No hay pacientes sin cuenta</p>
                    <p className="text-gray-400 text-sm">Todos los pacientes ya tienen una cuenta asignada</p>
                  </div>
                ) : (
                  /* Controles de Paginación - Usuarios Civiles */
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Mostrando {startIndexCivil + 1} - {Math.min(endIndexCivil, civilUsers.length)} de {civilUsers.length}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPreviousPageCivil}
                        disabled={currentPageCivil === 1 || isPendingCivil}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers(currentPageCivil, totalPagesCivil).map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-civil-${index}`} className="px-3 py-2 text-gray-500">
                              ...
                            </span>
                          ) : (
                            <button
                              key={`civil-${page}`}
                              onClick={() => goToPageCivil(page as number)}
                              disabled={isPendingCivil}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                                currentPageCivil === page
                                  ? 'bg-blue-500 text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        ))}
                      </div>

                      <button
                        onClick={goToNextPageCivil}
                        disabled={currentPageCivil === totalPagesCivil || isPendingCivil}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Cuentas existentes */}
        <div className={`bg-white rounded-2xl shadow-lg p-6 transition-opacity duration-200 ${
          isPendingAccounts ? 'opacity-60' : 'opacity-100'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Cuentas Activas</h2>
                <p className="text-sm text-gray-500">{accounts.length} cuentas registradas</p>
              </div>
            </div>

            {/* Indicador de carga cuando está pendiente */}
            {isPendingAccounts && (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Actualizando...</span>
              </div>
            )}
          </div>

          {loadingAccounts ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <p className="text-gray-500 mt-4">Cargando cuentas...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Usuario</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rol</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAccountsData.map((account) => (
                      <tr key={account.idUser} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-800">{account.username}</td>
                        <td className="py-3 px-4 text-gray-600">{account.name} {account.lastname}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {account.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteClick(account.idUser, account.username)}
                            disabled={isPendingAccounts || deletingUser}
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingUser ? 'Eliminando...' : 'Eliminar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Controles de Paginación - Cuentas Activas */}
              {accounts.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Mostrando {startIndexAccounts + 1} - {Math.min(endIndexAccounts, accounts.length)} de {accounts.length}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPageAccounts}
                      disabled={currentPageAccounts === 1 || isPendingAccounts}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-1">
                      {getPageNumbers(currentPageAccounts, totalPagesAccounts).map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-accounts-${index}`} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        ) : (
                          <button
                            key={`accounts-${page}`}
                            onClick={() => goToPageAccounts(page as number)}
                            disabled={isPendingAccounts}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                              currentPageAccounts === page
                                ? 'bg-green-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    <button
                      onClick={goToNextPageAccounts}
                      disabled={currentPageAccounts === totalPagesAccounts || isPendingAccounts}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ MODAL DE CREAR CUENTA CON PORTAL */}
      <CreateAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        loading={creatingUser}
      />

      {/* ✅ MODAL DE CONFIRMACIÓN DE ELIMINACIÓN CON PORTAL */}
      {userToDelete && (
        <DeleteUserConfirmationModal
          isOpen={showDeleteConfirm}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          username={userToDelete.username}
        />
      )}
    </div>
  );
}

function UserAccountsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserAccountsContent />
    </Suspense>
  );
}

export default UserAccountsPage;