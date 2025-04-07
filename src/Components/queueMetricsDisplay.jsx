import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Timer, People, HourglassEmpty, Timeline, AvTimer, BarChart, Speed } from "@mui/icons-material";


const MetricsDisplay = ({ metrics }) => {
    // const formatValue = (value) => {
    //     // return value.toFixed(4);
    //     console.log(value)
    // };
    // console.log(metrics)

    const isSystemStable = metrics.rho < 1;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-5">
            <Card>
                <CardHeader className="pb-2 flex-row items-center">
                    <People className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium align-middle">Lq - Queue Length</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <div className="text-2xl font-bold">{formatValue(metrics.lq)}</div> */}
                    <div className="text-2xl font-bold">{metrics.lq}</div>

                    <p className="text-xs text-muted-foreground">
                        Average number of customers in queue
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2 flex-row items-center">
                    <Timeline className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium">Ls - System Length</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.ls}</div>
                    <p className="text-xs text-muted-foreground">
                        Average number of customers in system
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2 flex-row items-center">
                    <HourglassEmpty className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium">Wq - Wait Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.wq}</div>
                    <p className="text-xs text-muted-foreground">
                        Average waiting time in queue
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2 flex-row items-center">
                    <Timer className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium">Ws - System Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.ws}</div>
                    <p className="text-xs text-muted-foreground">
                        Average time spent in system
                    </p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader className="pb-2 flex-row items-center">
                    <BarChart className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium">Server Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">{(metrics.utilization) * 100}%</span>
                        <span className={`text-sm ${isSystemStable ? "text-green-500" : "text-red-500"}`}>
                            {isSystemStable ? "System Stable" : "System Unstable"}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden relative">
                        <div
                            className={`h-full transition-all duration-300 ${metrics.rho >= 1 ? "bg-red-100" : "bg-black"
                                }`}
                            style={{ width: `${Math.min(metrics.utilization * 100, 100) ?? 0}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Percentage of time servers are busy
                    </p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader className="pb-2 flex-row items-center">
                    <AvTimer className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium">Server Idle Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold mb-2">{((metrics.idle) * 100)}%</div>
                    <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden relative">
                        <div
                            className={`h-full transition-all duration-300 ${metrics.rho >= 1 ? "bg-red-100" : "bg-black"
                                }`}
                            style={{ width: `${((metrics.idle) * 100)}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Percentage of time servers are idle
                    </p>
                </CardContent>
            </Card>

            <Card className="md:col-span-4">
                <CardHeader className="pb-2 flex-row items-center">
                    <Speed className="m-0 mr-2 flex items-center justify-center" />
                    <CardTitle className="text-sm font-medium">Traffic Intensity (ρ)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">{metrics.rho?.toFixed(4)}</span>
                        <span className={`text-sm ${metrics.rho < 1 ? "text-green-500" : "text-red-500"}`}>
                            {metrics.rho < 1 ? "Queue will not grow indefinitely" : "Queue will grow indefinitely"}
                        </span>
                    </div>
                    {/* <Progress value={Math.min(metrics.rho * 100, 100)} className={`h-2 ${metrics.rho >= 1 ? "bg-red-100" : ""}`} /> */}
                    <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden relative">
                        <div
                            className={`h-full transition-all duration-300 ${metrics.rho >= 1 ? "bg-red-100" : "bg-black"
                                }`}
                            style={{ width: `${Math.min(metrics.rho * 100, 100) ?? 0}%` }}
                        >
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                        ρ = λ/(cμ) - Must be less than 1 for queue stability
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default MetricsDisplay;
