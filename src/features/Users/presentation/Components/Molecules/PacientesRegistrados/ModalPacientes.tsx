import { useState } from 'react';
import { useGetUser } from '../../../../User/Presentation/Hooks/useGetUsers';
import { useCreateUserCivil } from '../../../../User/Presentation/Hooks/useCreateUserCivil';
import type { UserCivil } from '../../../../User/Domain/UserCIvil';
import { useModal } from './ModalContext';

function ModalPacientes() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    fol: '',
    UserMedicVaccinated: 0,
    corporalTemperature: 0,
    alcoholBreat: 0,
    isVaccinated: 0
  });

  const { cerrarModal } = useModal()
  const { users } = useGetUser();
  const { createUserCivil } = useCreateUserCivil();
  const filterUsers = users.filter((user) => user.role === 'enfermero');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const sendInformation = () => {
    console.log('Datos del formulario:', formData);
    cerrarModal();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 p-4">
  <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">

    {/* ENCABEZADO */}
    <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agregar Paciente</h2>
          <p className="text-sm text-gray-500 mt-1">Complete la información del paciente</p>
        </div>
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Cerrar modal"
        >
          <span onClick={cerrarModal} className="text-gray-400 text-lg font-bold cursor-pointer">×</span>
        </button>
      </div>
    </div>

    {/* CONTENIDO */}
    <div className="p-6">

      {/* INFORMACIÓN PERSONAL */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. Lucía"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primer apellido <span className="text-red-500">*</span>
            </label>
            <input
              name="firstLastname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. Montoya"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Segundo apellido
            </label>
            <input
              name="secondLastname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. Rodríguez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CURP
            </label>
            <input
              name="CURP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. MORL950101HDFNRS09"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                name="dayBirthday"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Día"
                min="1"
                max="31"
              />
              <select
                name="monthBirthday"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Mes</option>
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>
                {/* ... otros meses ... */}
              </select>
              <input
                type="number"
                name="yearBirthday"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Año"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad
            </label>
            <input
              type="number"
              name="yearsOld"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. 25"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Escuela
            </label>
            <input
              name="school"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. Universidad Nacional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grado escolar
            </label>
            <input
              name="schoolGrade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. 3er semestre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Folio <span className="text-red-500">*</span>
            </label>
            <input
              name="fol"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Ej. 12345"
            />
          </div>
        </div>
      </div>

      {/* INFORMACIÓN MÉDICA */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Médica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperatura corporal (°C) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                name="corporalTemperature"
                className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="36.5"
              />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRUEBAS DE ALCOHOLEMIA */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pruebas de Alcoholemia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resultado de alcoholemia (mg/L) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                name="alcoholBreat"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="0.30"
              />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">mg/L</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Límite legal: 0.25 mg/L</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vacuna aplicada <span className="text-red-500">*</span>
            </label>
            <select
              name="isVaccinated"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Sí</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* FOOTER */}
    <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-xl">
      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Agregar paciente
        </button>
      </div>
    </div>
  </div>
</div>
  );
}

export default ModalPacientes;
