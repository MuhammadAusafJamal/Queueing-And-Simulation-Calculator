import { SimulationMM1 } from "./MM1"



export const MMC = ({
    active = '',
    servers,
    setMm1,
    mm1,
    setArrivalMean,
    setServiceMean,
    arrivalMean,
    serviceMean,
    setMm1Priority,
    mm1Priority,
    onClick,
}) => {

    console.log("MMC")
    console.log(servers)
    return (
        servers < 2 ? (
            <SimulationMM1
                setMm1={setMm1Priority}
                mm1={mm1Priority}
                setArrivalMean={setArrivalMean}
                setServiceMean={setServiceMean}
                arrivalMean={arrivalMean}
                serviceMean={serviceMean}
                onClick={onClick}
                setMm1Priority={setMm1Priority}
                mm1Priority={mm1Priority}
            />
        ) : (
            // <MM1
            //     setMm1={setMm1}
            //     mm1={mm1}
            //     setArrivalMean={setArrivalMean}
            //     setServiceMean={setServiceMean}
            //     arrivalMean={arrivalMean}
            //     serviceMean={serviceMean}
            //     onClick={onClick}
            // />
            <>Simulaton MM1 Priority Asuaf</>

        )
    )
}