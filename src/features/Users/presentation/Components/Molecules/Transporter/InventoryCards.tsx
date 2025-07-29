import style from "../PacientesRegistrados/patients.module.css"
import vaccineApplys from "../../../../../../assets/VaccineQuantitiesIcon.png"
import celcius from "../../../../../../assets/celciusIcon.png"
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
function InventoryCards() {

    const { vaccines } = useGetVaccines()

    
    return ( 
        <>
        <section className="mt-8 ml-14" id={style.cards}>

            <div className="flex flex-col gap-y-6">
            <div className="ml-0 sm:flex ">
                <p className="text-xl text-[#00000081] sm:text-2xl" 
                id={style.title3}>Alerta de inventario</p>
            </div>

            <div className="w-[45vh] h-[15vh] bg-white rounded-2xl 
            flex justify-center items-center gap-10" id={style.card2}>
                    <div className="space-y-2">
                        <p className="text-4xl text-[#3f3c3cc5] sm:text-[4.3vh]" id={style.text}>12°</p>
                        <p className="text-[1.6vh] text-[#0000009e] sm:text-[2.4vh]">Temperatura actual</p>
                    </div>
                    <div className="w-20 h-20 bg-[#6074E4] rounded-2xl flex justify-center items-center">
                        <img src={celcius} alt="" className="w-12 h-12"/>
                    </div>
            </div>

            <div className="w-[45vh] h-[15vh] bg-white rounded-2xl 
            flex justify-center items-center gap-10" id={style.card1}> 
                    <div className="">
                        <p className="text-4xl text-[#3f3c3cc5] sm:text-[4.3vh]" id={style.text}>{vaccines.length}</p>
                        <p className="text-[1.6vh] text-[#0000009e] sm:text-[2.4vh]">Cantidad de vacunas</p>
                    </div>
                    <div className="w-20 h-20 bg-[#60D2E4] rounded-2xl flex justify-center items-center">
                        <img src={vaccineApplys} alt="" className="w-12 h-12"/>
                    </div>     
            </div>

            </div>
            </section>
        </>
    );
}

export default InventoryCards;