import { useEffect, useState, } from "react";
// import SimulationGG1 from "./SimulationGG1";
// import SimulationGG2 from "./SimulationGG2";
// import SimulationMM1 from "./SimulationMM1";
// import SimulationMM2 from "./SimulationMM2";
// import SimulationMG2 from "./SimulationMG2";
// import SimulationMG1 from "./SimulationMG1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Timer, People, HourglassEmpty, Timeline, AvTimer, BarChart, KeyboardArrowDown } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { gg1Queueing, ggcQueueing, mg1Queueing, mgcQueueing, mm1Queueing, mmcQueueing } from "./functions/nonPremptiveQueueingFucntions.js";
import InputSection from './components/inputSection.jsx'

export default function App() {
  const [active, setActive] = useState("M/M/2");
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };
  const toastNotify = () =>
    toast.error("Required feilds are missing", {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
  const handleActive = (value) => {
    setArrivalMean(0);
    setArrivalDistribution("");
    setServiceDistribution("");
    setServiceMean(0);
    setActive(value);
  };



  const queueParams = [
    { label: "Number of customers in the queue (Lq):", icon: <People /> },
    { label: "Time in queue (Wq):", icon: <HourglassEmpty /> },
    { label: "Average time spent in the system (W):", icon: <Timer /> },
    { label: "Average number of customers (L):", icon: <Timeline /> },
    { label: "Proportion of time server is idle:", icon: <AvTimer /> },
    { label: "Server Utilization Time (ρ):", icon: <BarChart /> },
  ];


  const [arrivalMean, setArrivalMean] = useState(0);
  const [queueing, setQueueing] = useState([]);
  const [arrivalDistribution, setArrivalDistribution] = useState("");
  const [serviceDistribution, setServiceDistribution] = useState("");
  const [serviceMean, setServiceMean] = useState(0);
  const [arrivalVariance, setArrivalVariance] = useState(0);
  const [serviceVariance, setServiceVariance] = useState(0);
  const [activeSection, setActiveSection] = useState("calculatorSection");
  const [activeCalculator, setActiveCalculator] = useState("Simulation");
  const [servers, setServers] = useState(0);
  const [randomData, setRandomData] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]);
  const [mm1, setMm1] = useState(false);
  const [mm1Priority, setMm1Priority] = useState(false);
  const [mm2, setMm2] = useState(false);
  const [mg1, setMg1] = useState(false);
  const [mg2, setMg2] = useState(false);
  const [gg1, setGg1] = useState(false);
  const [gg2, setGg2] = useState(false);
  const [usePriority, setUsePriority] = useState(false);
  const [open, setOpen] = useState(true);


  return (
    <main
      className={`h-screen bg-[#F0F0F0]/ ${activeSection !== "calculationSection" ||
        activeCalculator !== "Simulation"
        ? "overflow-hidden"
        : "overflow-auto"
        }`}
    >
      <ToastContainer />
      <section className="flex h-screen overflow-hidden">
        <main
          className=" pl-16/ h-screen flex w-full bg-[#F0F0F0]/ overflow-hidden"
          id="calculatorSection"
        >
          <div className="text-2xl  flex/ justify-between w-[65%]/ w-full flex-[2] bg-black text-white text-center/">
            <h1 className="px-4 py-12 text-3xl font-bold">Dashboard</h1>
            <h1
              className={`p-4 cursor-pointer hover:bg-[#394144] ${activeCalculator === "Simulation" ? "bg-[#394144]/" : null
                } border-b border-t flex justify-between items-center`}
              onClick={() => {
                setActiveCalculator("Simulation");
              }}
            >
              Simulation Calculator
              <KeyboardArrowDown fontSize="large" />
            </h1>
            <Collapse
              in={activeCalculator === "Simulation"}
              className={`${activeCalculator === "Simulation" ? "block" : "hidden"
                } transition-all duration-1000 opacity-100/ transform/ translate-y-0/`}
            >
              <ul className="flex/">
                {/* <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${
                    active === "M/M/1" ? "bg-[#394144]" : "bg-transparent"
                  } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/M/1");
                  }}
                >
                  M/M/1
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${
                    active === "M/G/1" ? "bg-[#394144]" : "bg-transparent"
                  } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/G/1");
                  }}
                >
                  M/G/1
                </li> */}
                {/* <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${
                    active === "G/G/1" ? "bg-[#394144]" : "bg-transparent"
                  } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("G/G/1");
                  }}
                >
                  G/G/1
                </li> */}
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "M/M/2" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/M/2");
                  }}
                >
                  M/M/{activeCalculator === "Queueing" ? "C" : "C"}
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "M/G/2" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/G/2");
                  }}
                >
                  M/G/{activeCalculator === "Queueing" ? "C" : "C"}
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "G/G/2" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    // handleActive("G/G/2");
                  }}
                >
                  G/G/{activeCalculator === "Queueing" ? "C" : "C"}
                </li>
                {/* `<li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${
                    active === "M/M/1Priority"
                      ? "bg-[#394144]"
                      : "bg-transparent"
                  } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/M/1Priority");
                  }}
                >
                  M/M/1 priority
                </li>` */}
              </ul>
            </Collapse>
            <h1
              className={`p-4 cursor-pointer hover:bg-[#394144] ${activeCalculator === "Queueing" ? "bg-[#394144]/" : null
                } border-b border-t flex justify-between items-center`}
              onClick={() => {
                setActiveCalculator("Queueing");
              }}
            >
              Queuing Calculator
              <KeyboardArrowDown fontSize="large" />
            </h1>
            <Collapse
              in={activeCalculator === "Queueing"}
              className={`${activeCalculator === "Queueing" ? "block" : "hidden"
                } transition-all duration-1000  opacity-100/ transform/ translate-y-0/ `}
            >
              <ul className="flex/">
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "M/M/1" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left `}
                  onClick={() => {
                    handleActive("M/M/1");
                  }}
                >
                  M/M/1
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "M/G/1" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/G/1");
                  }}
                >
                  M/G/1
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "G/G/1" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("G/G/1");
                  }}
                >
                  G/G/1
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "M/M/2" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/M/2");
                  }}
                >
                  M/M/{activeCalculator === "Queueing" ? "C" : "2"}
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "M/G/2" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("M/G/2");
                  }}
                >
                  M/G/{activeCalculator === "Queueing" ? "C" : "2"}
                </li>
                <li
                  className={`hover:bg-[#394144] flex-1 text-center/ tracking-widest ${active === "G/G/2" ? "bg-[#394144]" : "bg-transparent"
                    } text-white px-10 border-b py-2 text-lg text-left`}
                  onClick={() => {
                    handleActive("G/G/2");
                  }}
                >
                  G/G/{activeCalculator === "Queueing" ? "C" : "2"}
                </li>
              </ul>
            </Collapse>
          </div>
          <section className="flex-[6] h-screen overflow-scroll px-12">
            <InputSection
              active={active}
              setArrivalMean={setArrivalMean}
              setArrivalDistribution={setArrivalDistribution}
              setServiceDistribution={setServiceDistribution}
              setServiceMean={setServiceMean}
              arrivalMean={arrivalMean}
              arrivalDistribution={arrivalDistribution}
              serviceDistribution={serviceDistribution}
              serviceMean={serviceMean}
              activeCalculator={activeCalculator}
              arrivalVariance={arrivalVariance}
              setArrivalVariance={setArrivalVariance}
              serviceVariance={serviceVariance}
              setServiceVariance={setServiceVariance}
              servers={servers}
              setServers={setServers}
              usePriority={usePriority}
              setUsePriority={setUsePriority}
            />
            <button
              className="bg-[green] hover:bg-[darkGreen] py-2 px-4 rounded-lg mt-6 text-white text-lg"
              onClick={() => {
                console.log("Active Calculator--->", active);
                if (activeCalculator === "Simulation") {
                  if (active === "M/M/1") {
                    if (arrivalMean > 0 && serviceMean > 0) {
                      setMm1(!mm1);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  } else if (active === "M/M/1Priority") {
                    console.log("prioority");
                    if (arrivalMean > 0 && serviceMean > 0) {
                      setMm1Priority(!mm1Priority);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  } else if (active === "M/M/2") {
                    if (arrivalMean > 0 && serviceMean > 0) {
                      setMm2(!mm2);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  } else if (active === "M/G/1") {
                    if (
                      arrivalMean > 0 &&
                      serviceMean > 0 &&
                      serviceDistribution.length > 0
                    ) {
                      setMg1(!mg1);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  } else if (active === "M/G/2") {
                    if (
                      arrivalMean > 0 &&
                      serviceMean > 0 &&
                      serviceDistribution.length > 0
                    ) {
                      setMg2(!mg2);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  } else if (active === "G/G/1") {
                    if (
                      arrivalMean > 0 &&
                      serviceMean > 0 &&
                      serviceDistribution.length > 0 &&
                      arrivalDistribution.length > 0
                    ) {
                      setGg1(!gg1);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  } else if (active === "G/G/2") {
                    if (
                      arrivalMean > 0 &&
                      serviceMean > 0 &&
                      serviceDistribution.length > 0 &&
                      arrivalDistribution.length > 0
                    ) {
                      setGg2(!gg2);
                      scrollToSection("calculationSection");
                    } else {
                      toastNotify();
                    }
                  }
                } else {
                  if (active === "M/M/1") {
                    setQueueing(mm1Queueing(arrivalMean, serviceMean));
                    scrollToSection("calculationSection");
                    // console.log("");
                  } else if (active === "M/M/2") {
                    setQueueing(mmcQueueing(arrivalMean, serviceMean, servers))
                    scrollToSection("calculationSection");
                  } else if (active === "M/G/1") {
                    setQueueing(mg1Queueing(arrivalMean, serviceMean, serviceVariance))
                    scrollToSection("calculationSection");
                  } else if (active === "M/G/2") {
                    setQueueing(
                      mgcQueueing(
                        arrivalMean,
                        serviceMean,
                        serviceVariance,
                        servers
                      )
                    )
                    scrollToSection("calculationSection");
                  } else if (active === "G/G/1") {
                    setQueueing(
                      gg1Queueing(
                        arrivalMean,
                        arrivalVariance,
                        serviceMean,
                        serviceVariance
                      )
                    )
                    scrollToSection("calculationSection");
                  } else if (active === "G/G/2") {
                    setQueueing(
                      ggcQueueing(
                        arrivalMean,
                        arrivalVariance,
                        serviceMean,
                        serviceVariance,
                        servers
                      )
                    )
                    scrollToSection("calculationSection");
                  }
                }
              }}
            >
              {activeCalculator === "Simulation" ? "Simulate your Data" : "Calculate Queue Parameter"}
            </button>
          </section>
        </main>
      </section>

      <main className="min-h-screen pt-16 bg-[#F0F0F0]" id="calculationSection">
        {
          // activeCalculator === "Simulation" ? (
          //   active === "M/M/1" ? (
          //     <SimulationMM1
          //       setMm1={setMm1}
          //       mm1={mm1}
          //       setArrivalMean={setArrivalMean}
          //       setServiceMean={setServiceMean}
          //       arrivalMean={arrivalMean}
          //       serviceMean={serviceMean}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : active === "M/M/1Priority" ? (
          //     <SimulationMM1Priority
          //       setMm1={setMm1Priority}
          //       mm1={mm1Priority}
          //       setArrivalMean={setArrivalMean}
          //       setServiceMean={setServiceMean}
          //       arrivalMean={arrivalMean}
          //       serviceMean={serviceMean}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : active === "M/M/2" ? (
          //     <SimulationMM2
          //       setMm2={setMm2}
          //       mm2={mm2}
          //       arrivalMean={arrivalMean}
          //       setArrivalMean={setArrivalMean}
          //       serviceMean={serviceMean}
          //       setServiceMean={setServiceMean}
          //       servers={servers}
          //       usePriority={usePriority}
          //       setUsePriority={setUsePriority}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : active === "M/G/1" ? (
          //     <SimulationMG1
          //       setMg1={setMg1}
          //       mg1={mg1}
          //       arrivalMean={arrivalMean}
          //       setArrivalMean={setArrivalMean}
          //       serviceDistribution={serviceDistribution}
          //       setServiceDistribution={setServiceDistribution}
          //       serviceMean={serviceMean}
          //       setServiceMean={setServiceMean}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : active === "M/G/2" ? (
          //     <SimulationMG2
          //       setMg2={setMg2}
          //       mg2={mg2}
          //       arrivalMean={arrivalMean}
          //       setArrivalMean={setArrivalMean}
          //       serviceDistribution={serviceDistribution}
          //       setServiceDistribution={setServiceDistribution}
          //       serviceMean={serviceMean}
          //       setServiceMean={setServiceMean}
          //       servers={servers}
          //       usePriority={usePriority}
          //       setUsePriority={setUsePriority}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : active === "G/G/1" ? (
          //     <SimulationGG1
          //       setGg1={setGg1}
          //       gg1={gg1}
          //       arrivalMean={arrivalMean}
          //       setArrivalMean={setArrivalMean}
          //       arrivalDistribution={arrivalDistribution}
          //       setArrivalDistribution={setArrivalDistribution}
          //       serviceDistribution={serviceDistribution}
          //       setServiceDistribution={setServiceDistribution}
          //       serviceMean={serviceMean}
          //       setServiceMean={setServiceMean}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : active === "G/G/2" ? (
          //     <SimulationGG2
          //       setGg2={setGg2}
          //       gg2={gg2}
          //       arrivalMean={arrivalMean}
          //       setArrivalMean={setArrivalMean}
          //       arrivalDistribution={arrivalDistribution}
          //       setArrivalDistribution={setArrivalDistribution}
          //       serviceDistribution={serviceDistribution}
          //       setServiceDistribution={setServiceDistribution}
          //       serviceMean={serviceMean}
          //       servers={servers}
          //       setServiceMean={setServiceMean}
          //       usePriority={usePriority}
          //       setUsePriority={setUsePriority}
          //       onClick={() => {
          //         scrollToSection("calculatorSection");
          //         window.location.reload();
          //       }}
          //     />
          //   ) : null
          // ) :
          (
            <section>
              <h1 className="text-center font-bold text-3xl my-1">
                {active.charAt(active.length - 1) == "2"
                  ? active.slice(0, -1) + "C"
                  : active}{" "}
                Model Queuing
              </h1>
              <div className="flex flex-col gap-4 py-4 px-8">
                {queueParams?.map((v, i) => (
                  <div key={i} className="flex w-[40%] items-center">
                    {v.icon}
                    <h1 className="ml-2">{v.label}</h1>
                    <h1 className="ml-auto">{queueing[i]}</h1>
                  </div>
                ))}
              </div>

              <button
                className={`tab-button w-32 mx-8 bg-gray-50 border styled text-lg rounded-lg block w-full/ p-2.5 dark:bg-gray-700 border-black dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:bg-blue-400 dark:focus:border-blue-500 hover:bg-black hover:bg-border-white hover:text-white transition-all duration-500`}
                onClick={() => {
                  scrollToSection("calculatorSection");
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </section>
          )}
      </main>
    </main>
  );
}
