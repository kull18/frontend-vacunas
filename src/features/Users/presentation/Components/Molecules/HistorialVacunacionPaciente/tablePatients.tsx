import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css";
import { FilePatient } from "../../Pdf/filePatient";
import { useGetUserCivilVaccinatedValuesId } from "../../../../User/Presentation/Hooks/useGetUserCivilVaccinatedValuesId";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";

function TablePatients() {
  const { loggedUser } = useLoginUser();

  // Si no se ha cargado el usuario aún
  if (!loggedUser?.idUser) {
    return <p className="text-center mt-10 text-gray-600">Cargando historial de vacunas...</p>;
  }

  // Ahora que idUser existe, puedes usar el hook sin errores
  const { data: historial } = useGetUserCivilVaccinatedValuesId(loggedUser.idUser);

  return (
    <>
      <main>
        <div className="mt-10">
          <p className="text-2xl text-[#00000081]" id={style.title2}>Historial completo</p>
        </div>

        <div className="overflow-x-auto w-full mt-6 max-h-[30vh]" id={style.tablet}>
          <table className="w-full border border-gray-300">
            <thead className="bg-[#F4F4F4] sticky top-0 z-10">
              <tr className="border-b border-gray-300">
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Vacuna (lote)</th>
                <th className="px-6 py-3 text-left">Enfermero/a</th>
                <th className="px-6 py-3 text-left">Certificado</th>
              </tr>
            </thead>

            <tbody>
              {historial?.vaccinations.map((registro, index) => (
                <tr className="border-b border-gray-300" key={index}>
                  <td className="px-6 py-3">{registro.date}</td>
                  <td className="px-6 py-3">{registro.vaccine.name}</td>
                  <td className="px-6 py-3">{registro.medic.name} {registro.medic.lastname}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-[#1677FF] text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#1677ffd6] duration-200"
                      onClick={() =>
                        FilePatient({
                          nombre: registro.medic.name,
                          dosis: registro.vaccine.name,
                          fecha: registro.date,
                        })
                      }
                    >
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default TablePatients;
