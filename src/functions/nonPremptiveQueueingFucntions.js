import { factorial } from "../utils/factorial";
import { checkUtilizationFactor } from '../utils/checkUtilizationFactor'

export const mm1Queueing = (arrivalMean, serviceMean) => {
    if (arrivalMean > 0 && serviceMean > 0) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / meu;

        if (!checkUtilizationFactor(P)) return;

        let Lq = (P ** 2) / (1 - P);
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        console.log([Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)]);

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    } else {
        console.error("Invalid input: arrivalMean and serviceMean must be greater than 0.");
        return null;
    }
};


export const mg1Queueing = (arrivalMean, serviceMean, serviceVariance) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0) {
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

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    } else {
        console.error("Invalid input: arrivalMean, serviceMean and service variance must be greater than 0.");
        return null;
    }
};

export const gg1Queueing = (arrivalMean, arrivalVariance, serviceMean, serviceVariance) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0 && arrivalVariance > 0) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / meu;
        if (!checkUtilizationFactor(P)) return;

        let Ca2 = arrivalVariance / (1 / lambda) ** 2;
        let Cs2 = serviceVariance / (1 / meu) ** 2;

        let Lq = (P ** 2 * (1 + Cs2) * (Ca2 + P ** 2 * Cs2)) / (2 * (1 - P) * (1 + P ** 2 * Cs2));
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    } else {
        console.error("Invalid input: arrivalMean, serviceMean, service variance and arrival variance must be greater than 0.");
        return null;
    }
};

export const mmcQueueing = (arrivalMean, serviceMean, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && servers > 1) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / (servers * meu); // Correct traffic intensity
        if (!checkUtilizationFactor(P)) return;

        let sum = 0;
        for (let n = 0; n < servers; n++) {
            sum += (lambda / meu) ** n / factorial(n);
        }

        let p0 = 1 / (sum + ((lambda / meu) ** servers / (factorial(servers) * (1 - P))));
        let Lq = (p0 * ((lambda / meu) ** servers) * P) / (factorial(servers) * (1 - P) ** 2);
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = p0;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];

    } else {
        console.error("Invalid input: arrivalMean, serviceMean, service variance and arrival variance must be greater than 0.");
        return null;
    }
};

export const mgcQueueing = (arrivalMean, serviceMean, serviceVariance, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0 && servers > 1) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / (servers * meu);
        if (!checkUtilizationFactor(P)) return;

        let Cs2 = serviceVariance / (1 / meu) ** 2;
        let Ca2 = 1; // For M/G/C, arrival variance is not considered

        let Lq = mmcQueueing(arrivalMean, serviceMean, servers).Lq; // Get Lq from M/M/C
        let Wq = (Lq / lambda) * ((Ca2 + Cs2) / 2);
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    } else {
        console.error("Invalid input: arrivalMean, serviceMean, service variance and arrival variance must be greater than 0.");
        return null;
    }
};

export const ggcQueueing = (arrivalMean, arrivalVariance, serviceMean, serviceVariance, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0 && servers > 1) {
        let Ca2 = arrivalVariance / (1 / (1 / arrivalMean)) ** 2;
        let Cs2 = serviceVariance / (1 / (1 / serviceMean)) ** 2;

        let Lq = mgcQueueing(arrivalMean, serviceMean, serviceVariance, servers)[0];
        let Wq = (Lq / (1 / arrivalMean)) * ((Ca2 + Cs2) / 2);
        let Ws = Wq + 1 / (1 / serviceMean);
        let Ls = (1 / arrivalMean) * Ws;
        let idle = 1 - (1 / arrivalMean) / (servers * (1 / serviceMean));
        let utilization = (1 / arrivalMean) / (servers * (1 / serviceMean));

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    } else {
        console.error("Invalid input: arrivalMean, serviceMean, service variance and arrival variance must be greater than 0.");
        return null;
    }
};
