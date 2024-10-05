const ExperimentCard = (props) => {
  const {
    id,
    name,
    description,
    coordinator,
    place,
    state,
    critical,
    duration,
  } = props;

  return (
    <a
      href={`/experiments/${id}`}
      className="flex flex-col gap-4 p-4 rounded-lg border border-slate-200 divide-y divide-slate-200 hover:bg-sky-50 transition-colors duration-300"
    >
      <div className="grid gap-2">
        <div className="flex justify-between gap-4">
          <h2>{name}</h2>
          <div className="flex gap-4">
            {critical && (
              <div className="rounded py-0.5 px-2.5 bg-rose-50 border border-rose-200 text-rose-700 capitalize">
                critical
              </div>
            )}
            <div
              className={`rounded py-0.5 px-2.5 border ${
                state === "ongoing"
                  ? "bg-sky-200 border-sky-300 text-sky-800"
                  : "bg-slate-600 border-slate-600 text-white"
              } capitalize`}
            >
              {state}
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <p>{description}</p>
          {duration && <div className="text-red-700 font-bold">DURATION</div>}
        </div>
      </div>
      <div className="flex justify-between gap-4 pt-2">
        <span>{place}</span>
        <span>{coordinator}</span>
        <div className="flex gap-4">
          <span>Calibration</span>
          <span>Software version</span>
        </div>
      </div>
    </a>
  );
};

export default ExperimentCard;
