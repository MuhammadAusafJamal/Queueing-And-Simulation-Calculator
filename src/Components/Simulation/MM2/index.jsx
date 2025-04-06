// import { MM1 } from "./MM1"
// import { MM1Priority } from "./MM1Priority"



export const SimulationMM2 = ({
    setMm2,
    mm2,
    setArrivalMean,
    setServiceMean,
    arrivalMean,
    serviceMean,
    mm2Priority,
    onClick,
    setMm2Priority
}) => {
    return (
        mm2Priority ? (
            // <MM1Priority
            //     setMm1={setMm2Priority}
            //     mm1={mm2Priority}
            //     setArrivalMean={setArrivalMean}
            //     setServiceMean={setServiceMean}
            //     arrivalMean={arrivalMean}
            //     serviceMean={serviceMean}
            //     onClick={onClick}
            // />
            <>MM2 Proirity</>
        ) : (
            // <MM2
            //     setMm1={setMm1}
            //     mm1={mm1}
            //     setArrivalMean={setArrivalMean}
            //     setServiceMean={setServiceMean}
            //     arrivalMean={arrivalMean}
            //     serviceMean={serviceMean}
            //     onClick={onClick}
            // />
            <>MM2</>
        )
    )
}