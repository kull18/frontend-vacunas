import { useState } from 'react';
import { useCreateUserCivil } from '../../../../User/Presentation/Hooks/useCreateUserCivil';
import type { UserCivil } from '../../../../User/Domain/UserCIvil';
import { useUserCivil } from "../../../../../../shared/useCivilProvider";

interface ModalPacientesProps {
  refetch: () => void;
  onClose: () => void; 
  refetchAlcohol: () => void; 
}

function ModalPacientes({ refetch, onClose, refetchAlcohol }: ModalPacientesProps) {
  const { userCivilData } = useUserCivil();
  
  const [formData, setFormData] = useState<UserCivil>({
    idUserCivil: 0,
    fol: userCivilData?.fol || '',
    corporalTemperature: userCivilData?.corporalTemperature || 0,
    alcoholBreat: userCivilData?.alcoholBreat || 0,
    isVaccinated: 0,
    name: '',
    firstLastname: '',
    CURP: '',
    secondLastname: '',
    dayBirthday: 0,
    monthBirthday: '',
    yearBirthday: '',
    yearsOld: 0,
    school: '',
    schoolGrade: '',
  });
  const { createUserCivil } = useCreateUserCivil();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['corporalTemperature', 'alcoholBreat', 'dayBirthday', 'yearsOld'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserCivil(formData);
      await refetch();
      await refetchAlcohol()
      onClose();
    } catch (error) {
      console.error("Error al crear paciente:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4 pt-4">
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-100 max-h-[90vh] flex flex-col my-8">
        
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white">Agregar Paciente</h2>
              <p className="text-sm text-blue-100 mt-1">Complete la información del paciente</p>
            </div>
            <button
              onClick={handleClose}
              type="button"
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto flex-1 scrollbar-hide">
            <div className="p-8 space-y-6">
              
              {/* INFORMACIÓN PERSONAL */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Información Personal</h3>
                </div>
                
                <div className="flex flex-col gap-5">
                  {/* Row 1 */}
                  <div className="flex gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. Juan"
                        required
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Primer apellido <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="firstLastname"
                        value={formData.firstLastname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. Pérez"
                        required
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Segundo apellido
                      </label>
                      <input
                        name="secondLastname"
                        value={formData.secondLastname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. López"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CURP
                      </label>
                      <input
                        name="CURP"
                        value={formData.CURP}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 uppercase bg-white"
                        placeholder="XAXX010101HDFXXX00"
                        maxLength={18}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha de nacimiento
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="dayBirthday"
                          value={formData.dayBirthday || ''}
                          onChange={handleInputChange}
                          className="w-16 px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white text-center"
                          placeholder="Día"
                          min="1"
                          max="31"
                        />
                        <select
                          name="monthBirthday"
                          value={formData.monthBirthday}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white cursor-pointer"
                        >
                          <option value="">Mes</option>
                          <option value="Enero">Enero</option>
                          <option value="Febrero">Febrero</option>
                          <option value="Marzo">Marzo</option>
                          <option value="Abril">Abril</option>
                          <option value="Mayo">Mayo</option>
                          <option value="Junio">Junio</option>
                          <option value="Julio">Julio</option>
                          <option value="Agosto">Agosto</option>
                          <option value="Septiembre">Septiembre</option>
                          <option value="Octubre">Octubre</option>
                          <option value="Noviembre">Noviembre</option>
                          <option value="Diciembre">Diciembre</option>
                        </select>
                        <input
                          type="number"
                          name="yearBirthday"
                          value={formData.yearBirthday || ''}
                          onChange={handleInputChange}
                          className="w-20 px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white text-center"
                          placeholder="Año"
                          min="1900"
                          max={new Date().getFullYear()}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Edad
                      </label>
                      <input
                        type="number"
                        name="yearsOld"
                        value={formData.yearsOld || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. 25"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Escuela
                      </label>
                      <input
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. Universidad Nacional"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Grado escolar
                      </label>
                      <input
                        name="schoolGrade"
                        value={formData.schoolGrade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. 3er semestre"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Folio <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="fol"
                        value={formData.fol}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="Ej. 12345"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* INFORMACIÓN MÉDICA */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Información Médica</h3>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Temperatura corporal (°C) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        name="corporalTemperature"
                        value={formData.corporalTemperature}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="36.5"
                        required
                      />
                      <span className="absolute right-4 top-3 text-gray-400 text-sm font-medium">°C</span>
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              </div>

              {/* PRUEBAS DE ALCOHOLEMIA */}
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Pruebas de Alcoholemia</h3>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Resultado de alcoholemia (mg/L) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        name="alcoholBreat"
                        value={formData.alcoholBreat}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                        placeholder="0.30"
                        required
                      />
                      <span className="absolute right-4 top-3 text-gray-400 text-sm font-medium">mg/L</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-gray-600">Límite legal: <span className="font-semibold text-amber-600">0.25 mg/L</span></p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vacuna aplicada <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="isVaccinated"
                      value={formData.isVaccinated}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white cursor-pointer"
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Agregar paciente
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ModalPacientes;