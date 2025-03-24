import { checkUtilizationFactor } from "../utils/checkUtilizationFactor";

export const mm1PreemptivePriorityQueueing = (arrivalMeanHigh, arrivalMeanLow, serviceMean) => {
    if (arrivalMeanHigh > 0 && arrivalMeanLow > 0 && serviceMean > 0) {
        let lambdaHigh = 1 / arrivalMeanHigh;  // High-priority arrival rate
        let lambdaLow = 1 / arrivalMeanLow;    // Low-priority arrival rate
        let meu = 1 / serviceMean;             // Service rate
        let lambdaTotal = lambdaHigh + lambdaLow;  // Total arrival rate

        let rhoHigh = lambdaHigh / meu;
        let rhoLow = lambdaLow / meu;
        let P = lambdaTotal / meu;

        if (!checkUtilizationFactor(P)) return; // Ensure stability (ρ < 1)

        // Waiting time for High and Low Priority Jobs (Preemptive)
        let WqHigh = rhoLow / (meu - lambdaTotal);
        let WqLow = (rhoHigh + rhoLow) / (meu - lambdaTotal);

        let LqHigh = lambdaHigh * WqHigh;
        let LqLow = lambdaLow * WqLow;

        let WsHigh = WqHigh + (1 / meu);
        let WsLow = WqLow + (1 / meu);

        let LsHigh = lambdaHigh * WsHigh;
        let LsLow = lambdaLow * WsLow;

        let idle = 1 - P;
        let utilization = P;

        console.log({
            LqHigh: LqHigh.toFixed(4),
            LqLow: LqLow.toFixed(4),
            WqHigh: WqHigh.toFixed(4),
            WqLow: WqLow.toFixed(4),
            WsHigh: WsHigh.toFixed(4),
            WsLow: WsLow.toFixed(4),
            LsHigh: LsHigh.toFixed(4),
            LsLow: LsLow.toFixed(4),
            idle: idle.toFixed(4),
            utilization: utilization.toFixed(4),
        });

        return {
            LqHigh: LqHigh.toFixed(4),
            LqLow: LqLow.toFixed(4),
            WqHigh: WqHigh.toFixed(4),
            WqLow: WqLow.toFixed(4),
            WsHigh: WsHigh.toFixed(4),
            WsLow: WsLow.toFixed(4),
            LsHigh: LsHigh.toFixed(4),
            LsLow: LsLow.toFixed(4),
            idle: idle.toFixed(4),
            utilization: utilization.toFixed(4),
        };
    } else {
        console.error("Invalid input: arrivalMeanHigh, arrivalMeanLow, and serviceMean must be greater than 0.");
        return null;
    }
};


export const mg1PriorityQueueing = (jobs) => {
    jobs.sort((a, b) => a.priority - b.priority); // Sort by priority (lower value = higher priority)

    let time = 0;
    let queue = [];
    let results = [];

    for (let job of jobs) {
        while (queue.length && queue[0].priority > job.priority) {
            let executing = queue.shift();
            executing.remaining -= job.arrival - time;
            time = job.arrival;
            if (executing.remaining > 0) queue.push(executing);
        }
        queue.push({ ...job, remaining: job.service });
        queue.sort((a, b) => a.priority - b.priority);
    }

    while (queue.length) {
        let executing = queue.shift();
        results.push({ ...executing, finish: time + executing.remaining });
        time += executing.remaining;
    }
    return results;
};

export const gg1PriorityQueueing = (jobs) => {
    jobs.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
    let queue = [];
    let time = 0;
    let results = [];

    for (let job of jobs) {
        while (queue.length && queue[0].priority > job.priority) {
            let executing = queue.shift();
            executing.remaining -= job.arrival - time;
            time = job.arrival;
            if (executing.remaining > 0) queue.push(executing);
        }
        queue.push({ ...job, remaining: job.service });
        queue.sort((a, b) => a.priority - b.priority);
    }

    while (queue.length) {
        let executing = queue.shift();
        results.push({ ...executing, finish: time + executing.remaining });
        time += executing.remaining;
    }
    return results;
};

