import CardsBoxVaccines from "../Molecules/BoxVaccines/CardsBoxVaccines";
import GaussianChart from "../Molecules/Gauss/GaussianChart";
import GaussShadedGraph from "../Molecules/Gauss/GaussShadedGraph";
import GaussSimpleGraph from "../Molecules/Gauss/GaussSimpleGraph";

function BoxVaccinePage() {
    return ( 
        <>
        <CardsBoxVaccines></CardsBoxVaccines>
        <GaussianChart/>
        </>
     );
}

export default BoxVaccinePage;