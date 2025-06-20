import style from "../../Molecules/HistorialVacunacionPaciente/dashboard.module.css"

const ListDashboard: React.FC<{ image: string; text: string; onClick: () => void; selected: boolean }> = ({ image, text, onClick, selected }) => {
    return (
        <div
            className={`z-50 cursor-pointer ${selected ? "bg-[#43AAF4]/10" : "hover:bg-[#8dcaf65a]"}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-4 ml-4 pt-5 pb-5">
                <img src={image} alt={text} className="w-7 opacity-70 ml-3" id={style.icons} />
                <p className={`text-[1.9vh] font-medium ${selected ? "text-[#2b77e1]" : "text-[#43AAF4]"}`}>{text}</p>
            </div>
            <hr className="h-[0.1vh] w-full opacity-20 block sm:hidden" />
        </div>
    );
};


export default ListDashboard;
