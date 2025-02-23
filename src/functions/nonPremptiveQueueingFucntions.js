import { factorial } from "../utils/factorial";

export const mm1Queueing = (arrivalMean, serviceMean) => {
    if (arrivalMean > 0 && serviceMean > 0) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / meu;
        if (P >= 1) return null; // System must be stable

        let Lq = (P ** 2) / (1 - P);
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    }
};

export const mg1Queueing = (arrivalMean, serviceMean, serviceVariance) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / meu;
        if (P >= 1) return null;

        let Lq = ((lambda ** 2) * serviceVariance + P ** 2) / (2 * (1 - P));
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    }
};

export const gg1Queueing = (arrivalMean, arrivalVariance, serviceMean, serviceVariance) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0 && arrivalVariance > 0) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / meu;
        if (P >= 1) return null;

        let Ca2 = arrivalVariance / (1 / lambda) ** 2;
        let Cs2 = serviceVariance / (1 / meu) ** 2;

        let Lq = (P ** 2 * (1 + Cs2) * (Ca2 + P ** 2 * Cs2)) / (2 * (1 - P) * (1 + P ** 2 * Cs2));
        let Wq = Lq / lambda;
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
    }
};

export const mmcQueueing = (arrivalMean, serviceMean, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && servers > 1) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let rho = lambda / (servers * meu); // Correct traffic intensity

        if (rho >= 1) {
            console.warn("System is unstable (ρ ≥ 1). Increase servers or reduce traffic.");
            return null;
        }

        let sum = 0;
        for (let n = 0; n < servers; n++) {
            sum += (lambda / meu) ** n / factorial(n);
        }

        let p0 = 1 / (sum + ((lambda / meu) ** servers / (factorial(servers) * (1 - rho))));
        let lq = (p0 * ((lambda / meu) ** servers) * rho) / (factorial(servers) * (1 - rho) ** 2);
        let wq = lq / lambda;
        let ws = wq + 1 / meu;
        let ls = lambda * ws;
        let idle = p0;
        let utilization = rho;

        return {
            Lq: lq.toFixed(4),
            Wq: wq.toFixed(4),
            Ws: ws.toFixed(4),
            Ls: ls.toFixed(4),
            IdleProb: idle.toFixed(4),
            Utilization: utilization.toFixed(4),
        };
    }
};

export const mgcQueueing = (arrivalMean, serviceMean, serviceVariance, servers) => {
    if (arrivalMean > 0 && serviceMean > 0 && serviceVariance > 0 && servers > 1) {
        let lambda = 1 / arrivalMean;
        let meu = 1 / serviceMean;
        let P = lambda / (servers * meu);
        if (P >= 1) return null;

        let Cs2 = serviceVariance / (1 / meu) ** 2;
        let Ca2 = 1; // For M/G/C, arrival variance is not considered

        let Lq = mmcQueueing(arrivalMean, serviceMean, servers).Lq; // Get Lq from M/M/C
        let Wq = (Lq / lambda) * ((Ca2 + Cs2) / 2);
        let Ws = Wq + 1 / meu;
        let Ls = lambda * Ws;
        let idle = 1 - P;
        let utilization = P;

        return [Lq.toFixed(4), Wq.toFixed(4), Ws.toFixed(4), Ls.toFixed(4), idle.toFixed(4), utilization.toFixed(4)];
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
    }
};
