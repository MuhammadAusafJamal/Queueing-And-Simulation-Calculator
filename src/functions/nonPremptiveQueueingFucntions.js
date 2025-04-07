import { factorial } from "../utils/factorial";
import { checkUtilizationFactor } from '../utils/checkUtilizationFactor'

export const mm1Queueing = (arrivalMean, serviceMean) => {
    if (arrivalMean > 0 && serviceMean > 0) {
        let lambda = 1 / arrivalMean; // Arrival rate
        let mu = 1 / serviceMean;     // Service rate
        let rho = lambda / mu;        // Utilization factor

        if (!checkUtilizationFactor(rho)) return null;

        let Lq = (rho ** 2) / (1 - rho); // Number in queue
        let Wq = Lq / lambda;            // Time in queue
        let Ws = Wq + 1 / mu;            // Time in system
        let Ls = lambda * Ws;            // Number in system
        let idle = 1 - rho;              // Proportion of time server is idle
        let utilization = rho;           // Server utilization

        return {
            lq: Lq.toFixed(4),    // Number of customers in the queue (Lq)
            wq: Wq.toFixed(4),    // Time in queue (Wq)
            ws: Ws.toFixed(4),    // Average time spent in the system (Ws)
            ls: Ls.toFixed(4),    // Average number of customers (Ls)
            idle: idle.toFixed(4),  // Proportion of time server is idle (P0)
            utilization: utilization.toFixed(4), // Server Utilization Time (ρ)
            rho: rho
        }
    } else {
        console.error("Invalid input: arrivalMean and serviceMean must be greater than 0.");
        return null;
    }
};


export const mg1Queueing = (arrivalMean, serviceMean, serviceVariance) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance >= 0) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / meu;
        if (!checkUtilizationFactor(P)) return;

        let Lq = ((lambda ** 2) * serviceVariance + P ** 2) / (2 * (1 - P));
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return {
            lq: Lq.toFixed(4),    // Number of customers in the queue (Lq)
            wq: Wq.toFixed(4),    // Time in queue (Wq)
            ws: Ws.toFixed(4),    // Average time spent in the system (Ws)
            ls: Ls.toFixed(4),    // Average number of customers (Ls)
            idle: idle.toFixed(4),  // Proportion of time server is idle (P0)
            utilization: utilization.toFixed(4), // Server Utilization Time (ρ)
            rho: P
        }
    } else {
        console.error("Invalid input: arrivalMean, serviceMean and service variance must be greater than 0.");
        return null;
    }
};

export const gg1Queueing = (arrivalMean, arrivalVariance, serviceMean, serviceVariance) => {
    if (
        arrivalMean > 0 &&
        serviceMean > 0 &&
        arrivalVariance >= 0 &&
        serviceVariance >= 0
    ) {
        let lambda = 1 / arrivalMean;
        let mu = 1 / serviceMean;
        let probability = lambda / mu;
        if (!checkUtilizationFactor(probability)) return;
        let ca2 = arrivalVariance / (arrivalMean * arrivalMean);
        let cs2 = serviceVariance / (serviceMean * serviceMean);
        let Lq = (probability * probability * (ca2 + cs2)) / (2 * (1 - probability));
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / mu;
        let Ls = lambda * Ws;
        let idle = 1 - probability;
        let utilization = probability
        return {
            lq: Lq.toFixed(4),    // Number of customers in the queue (Lq)
            wq: Wq.toFixed(4),    // Time in queue (Wq)
            ws: Ws.toFixed(4),    // Average time spent in the system (Ws)
            ls: Ls.toFixed(4),    // Average number of customers (Ls)
            idle: idle.toFixed(4),  // Proportion of time server is idle (P0)
            utilization: utilization.toFixed(4), // Server Utilization Time (ρ)
            rho: probability
        }
    }
    console.error("Invalid inputs: means must be positive, variances non-negative.");
    return null;
};

export const mmcQueueing = (arrivalMean, serviceMean, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && servers >= 1) {
        let lambda = 1 / arrivalMean;
        let mu = 1 / serviceMean;
        let rho = lambda / (servers * mu);
        if (!checkUtilizationFactor(rho)) return null;

        let sum = 0;
        let r = lambda / mu;
        for (let n = 0; n < servers; n++) {
            sum += (r ** n) / factorial(n);
        }
        let p0 = 1 / (sum + ((r ** servers) / (factorial(servers) * (1 - rho))));
        let Lq = (p0 * (r ** servers) * rho) / (factorial(servers) * ((1 - rho) ** 2));
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / mu;
        let Ls = lambda * Ws;
        let idle = p0;
        let utilization = rho;

        return {
            lq: Lq.toFixed(4),    // Number of customers in the queue (Lq)
            wq: Wq.toFixed(4),    // Time in queue (Wq)
            ws: Ws.toFixed(4),    // Average time spent in the system (Ws)
            ls: Ls.toFixed(4),    // Average number of customers (Ls)
            idle: idle.toFixed(4),  // Proportion of time server is idle (P0)
            utilization: utilization.toFixed(4), // Server Utilization Time (ρ)
            rho: rho
        }
    } else {
        console.error("Invalid input: arrivalMean and serviceMean must be greater than 0, servers must be at least 1.");
        return null;
    }
};

export const mgcQueueing = (arrivalMean, serviceMean, serviceVariance, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance >= 0 && servers >= 1) {
        let lambda = 1 / arrivalMean;
        let mu = 1 / serviceMean;
        let P = lambda / (servers * mu); // Traffic intensity
        if (!checkUtilizationFactor(P)) return null;

        let Cs2 = serviceVariance / (serviceMean ** 2); // Corrected calculation
        let Ca2 = 1; // Poisson arrivals

        // Get M/M/c metrics
        let MMC = mmcQueueing(arrivalMean, serviceMean, servers);
        let LqMMC = MMC.lq
        let p0 = MMC.idle
        if (LqMMC === null) return null;

        // Adjust for M/G/c using approximation
        let WqMMC = LqMMC / lambda; // M/M/c waiting time
        let Wq = WqMMC * ((Ca2 + Cs2) / 2); // Adjusted waiting time
        let Lq = lambda * Wq; // Adjusted queue length
        let Ws = Wq + 1 / mu;
        let Ls = lambda * Ws;
        let idle = Number(p0); // Use P0 from M/M/c as approximation
        let utilization = P;

        return {
            lq: Lq.toFixed(4),    // Number of customers in the queue (Lq)
            wq: Wq.toFixed(4),    // Time in queue (Wq)
            ws: Ws.toFixed(4),    // Average time spent in the system (Ws)
            ls: Ls.toFixed(4),    // Average number of customers (Ls)
            idle: idle.toFixed(4),  // Proportion of time server is idle (P0)
            utilization: utilization.toFixed(4), // Server Utilization Time (ρ)
            rho: P
        }
    } else {
        console.error("Invalid input: arrivalMean and serviceMean must be greater than 0, serviceVariance must be non-negative, servers must be at least 1.");
        return null;
    }
};

export const ggcQueueing = (arrivalMean, arrivalVariance, serviceMean, serviceVariance, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && arrivalVariance >= 0 && serviceVariance >= 0 && servers >= 1) {
        let lambda = 1 / arrivalMean;
        let mu = 1 / serviceMean;
        let P = lambda / (servers * mu);
        if (!checkUtilizationFactor(P)) return null;

        let Ca2 = arrivalVariance / (arrivalMean ** 2);
        let Cs2 = serviceVariance / (serviceMean ** 2);

        // Get M/G/c Lq as a base (which uses M/M/c adjusted for Cs2)
        // let [LqMGC, , , , p0] = mgcQueueing(arrivalMean, serviceMean, serviceVariance, servers);

        let MGC = mgcQueueing(arrivalMean, serviceMean, serviceVariance, servers);
        let LqMGC = MMC.lq
        let p0 = MMC.idle
        if (LqMGC === null) return null;

        // Adjust Wq for general arrivals
        let WqMMC = mmcQueueing(arrivalMean, serviceMean, servers)[0] / lambda; // Base M/M/c Wq
        let Wq = WqMMC * ((Ca2 + Cs2) / 2); // Single adjustment for G/G/c
        let Lq = lambda * Wq;
        let Ws = Wq + 1 / mu;
        let Ls = lambda * Ws;
        let idle = Number(p0); // Approximate with M/M/c P0
        let utilization = P;

        return {
            lq: Lq.toFixed(4),    // Number of customers in the queue (Lq)
            wq: Wq.toFixed(4),    // Time in queue (Wq)
            ws: Ws.toFixed(4),    // Average time spent in the system (Ws)
            ls: Ls.toFixed(4),    // Average number of customers (Ls)
            idle: idle.toFixed(4),  // Proportion of time server is idle (P0)
            utilization: utilization.toFixed(4), // Server Utilization Time (ρ)
            rho: P
        }
    } else {
        console.error("Invalid input: arrivalMean and serviceMean must be greater than 0, variances must be non-negative, servers must be at least 1.");
        return null;
    }
};