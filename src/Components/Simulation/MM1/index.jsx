import { MM1 } from "./MM1"
import { MM1Priority } from "./MM1Priority"



export const SimulationMM1 = ({
    setMm1,
    mm1,
    setArrivalMean,
    setServiceMean,
    arrivalMean,
    serviceMean,
    mm1Priority,
    onClick,
    setMm1Priority
}) => {
    return (
        mm1Priority ? (
            <MM1Priority
                setMm1={setMm1Priority}
                mm1={mm1Priority}
                setArrivalMean={setArrivalMean}
                setServiceMean={setServiceMean}
                arrivalMean={arrivalMean}
                serviceMean={serviceMean}
                onClick={onClick}
            />
        ) : (
            <MM1
                setMm1={setMm1}
                mm1={mm1}
                setArrivalMean={setArrivalMean}
                setServiceMean={setServiceMean}
                arrivalMean={arrivalMean}
                serviceMean={serviceMean}
                onClick={onClick}
            />
        )
    )
}