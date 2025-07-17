import GraphsHealtStatus from "../../Molecules/HealtStatus/GraphsHealtStatus";
import HealtTips from "../../Molecules/HealtStatus/HealtTips";
import MainStatusHealt from "../../Molecules/HealtStatus/mainStatusHealt";
function HealtStatus() {
    return ( 
        <>
            <MainStatusHealt></MainStatusHealt>
            <GraphsHealtStatus></GraphsHealtStatus>
            <HealtTips></HealtTips>
        </>
     );
}

export default HealtStatus;