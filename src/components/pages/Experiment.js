import { experiments } from "../../data/experiments";

import { useParams } from "react-router-dom";

import Svg from "../partials/Svg";

const Experiment = () => {
  const { experiment_id } = useParams();
  const experiment = experiments.find((experiment) => {
    return experiment.id.toString() === experiment_id;
  });

  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <a
        href="/experiments"
        className="flex items-center gap-2 max-w-max font-semibold	text-sky-700 hover:text-sky-900 hover:underline transition-colors duration-300"
      >
        <Svg src="/icons/arrow-left.svg" className="w-5 h-5" />
        <span>Back to experiments list</span>
      </a>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4">
          <h1>{experiment.name}</h1>
          <div className="flex gap-4">
            {experiment.critical && (
              <div className="rounded py-0.5 px-2.5 bg-rose-50 border border-rose-200 text-rose-700 capitalize">
                critical
              </div>
            )}
            <div
              className={`rounded py-0.5 px-2.5 border ${
                experiment.state === "ongoing"
                  ? "bg-sky-200 border-sky-300 text-sky-800"
                  : "bg-slate-600 border-slate-600 text-white"
              } capitalize`}
            >
              {experiment.state}
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <p className="text-xl">{experiment.description}</p>
          {experiment.duration && (
            <div className="flex items-center gap-2 text-sm">
              <Svg src="/icons/calendar-days.svg" className="w-6 h-6" />
              <span className="text-red-700 font-bold">DURATION</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Svg src="/icons/map-pin.svg" className="w-6 h-6" />
          {experiment.place}
        </div>
      </div>
      {experiment.critical && (
        <div className="flex gap-3 p-6 rounded-2xl bg-rose-50 text-lg text-rose-700">
          <Svg src="/icons/x-circle.svg" className="w-7 h-7" />
          <div>
            <p className="font-bold">{experiment.critical.title}</p>
            <p>{experiment.critical.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiment;
