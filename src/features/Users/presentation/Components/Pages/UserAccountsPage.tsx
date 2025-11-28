import { useGetCivilUsersWithoutAccount } from '../../../../Users/User/Presentation/Hooks/useGetCivilUsersWithoutAccount';
import { useGetUserAccounts } from '../../../../Users/User/Presentation/Hooks/useGetUserAccounts';
import { useState, useMemo } from 'react';
import { useCreateUser } from '../../../User/Presentation/Hooks/useCreateUsers';
import type { UserCivil } from '../../../User/Domain/User'
import { useDeleteUser } from '../../../User/Presentation/Hooks/useDeleteUser';

function UserAccountsPage() {
  const { data: civilUsers, loading: loadingCivil, refetch: refetchCivil } = useGetCivilUsersWithoutAccount();
  const { data: accounts, loading: loadingAccounts, refetch: refetchAccounts } = useGetUserAccounts();
  const { createUser } = useCreateUser();
  const { deleteUser } = useDeleteUser();

  // Estados de paginación para usuarios sin cuenta
  const [currentPageCivil, setCurrentPageCivil] = useState(1);
  const itemsPerPageCivil = 6;

  // Estados de paginación para cuentas activas
  const [currentPageAccounts, setCurrentPageAccounts] = useState(1);
  const itemsPerPageAccounts = 10;

  const [showModal, setShowModal] = useState(false);
  const [selectedCivil, setSelectedCivil] = useState<UserCivil | null>(null);
  
  const [formData, setFormData] = useState({
    idUser: 0, 
    username: '',
    groupIdGroup: null, 
    password: '',
    role: 'paciente',
    name: '',
    lastname: '',
    idUserCivil: ''
  });

  // Paginación para usuarios civiles
  const paginatedCivilData = useMemo(() => {
    const startIndex = (currentPageCivil - 1) * itemsPerPageCivil;
    const endIndex = startIndex + itemsPerPageCivil;
    return civilUsers.slice(startIndex, endIndex);
  }, [civilUsers, currentPageCivil, itemsPerPageCivil]);

  const totalPagesCivil = Math.ceil(civilUsers.length / itemsPerPageCivil);

  // Paginación para cuentas activas
  const paginatedAccountsData = useMemo(() => {
    const startIndex = (currentPageAccounts - 1) * itemsPerPageAccounts;
    const endIndex = startIndex + itemsPerPageAccounts;
    return accounts.slice(startIndex, endIndex);
  }, [accounts, currentPageAccounts, itemsPerPageAccounts]);

  const totalPagesAccounts = Math.ceil(accounts.length / itemsPerPageAccounts);

  // Funciones de navegación para usuarios civiles
  const goToNextPageCivil = () => {
    setCurrentPageCivil((prev) => Math.min(prev + 1, totalPagesCivil));
  };

  const goToPreviousPageCivil = () => {
    setCurrentPageCivil((prev) => Math.max(prev - 1, 1));
  };

  const goToPageCivil = (page: number) => {
    setCurrentPageCivil(page);
  };

  // Funciones de navegación para cuentas activas
  const goToNextPageAccounts = () => {
    setCurrentPageAccounts((prev) => Math.min(prev + 1, totalPagesAccounts));
  };

  const goToPreviousPageAccounts = () => {
    setCurrentPageAccounts((prev) => Math.max(prev - 1, 1));
  };

  const goToPageAccounts = (page: number) => {
    setCurrentPageAccounts(page);
  };

  // Generar números de página (reutilizable)
  const getPageNumbers = (currentPage: number, totalPages: number) => {
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

  const handleCreateAccount = (civil: UserCivil) => {
    setSelectedCivil(civil);
    setFormData({
      idUser: null, 
      username: civil.name,
      groupIdGroup: null, 
      password: '',
      role: 'paciente',
      name: civil.name,
      lastname: `${civil.firstLastname} ${civil.secondLastname}`,
      idUserCivil: civil.idUserCivil.toString()
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createUser(formData);

    setShowModal(false);
    setCurrentPageCivil(1);
    refetchCivil();
    refetchAccounts();
  };

  const handleDeleteAccount = async (idUser: number) => {
    console.log("user id", idUser)
    const success = await deleteUser(idUser);
    
    if (success) {
      const remainingItems = accounts.length - 1;
      const maxPage = Math.ceil(remainingItems / itemsPerPageAccounts);
      if (currentPageAccounts > maxPage && maxPage > 0) {
        setCurrentPageAccounts(maxPage);
      }
      
      refetchCivil();
      refetchAccounts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
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
          <div className="bg-white rounded-2xl shadow-lg p-6">
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
                      Mostrando {((currentPageCivil - 1) * itemsPerPageCivil) + 1} - {Math.min(currentPageCivil * itemsPerPageCivil, civilUsers.length)} de {civilUsers.length}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPreviousPageCivil}
                        disabled={currentPageCivil === 1}
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
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                        disabled={currentPageCivil === totalPagesCivil}
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
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
                      <tr key={account.idUser} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">{account.username}</td>
                        <td className="py-3 px-4 text-gray-600">{account.name} {account.lastname}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {account.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteAccount(account.idUser)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Eliminar
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
                    Mostrando {((currentPageAccounts - 1) * itemsPerPageAccounts) + 1} - {Math.min(currentPageAccounts * itemsPerPageAccounts, accounts.length)} de {accounts.length}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPageAccounts}
                      disabled={currentPageAccounts === 1}
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
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                      disabled={currentPageAccounts === totalPagesAccounts}
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

      {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl">
      
      {/* Header */}
      <div className="bg-blue-600 px-6 py-5 flex justify-between items-center rounded-t-2xl">
        <div>
          <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
          <p className="text-sm text-blue-100 mt-1">Configura el acceso para el paciente</p>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de usuario <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rol <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="patient">Paciente</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default UserAccountsPage;