import { experiments } from "../../data/experiments";

import ExperimentCard from "../partials/ExperimentCard";

const ExperimentsList = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8 p-6">
      <h1>Experiments List</h1>
      <ul className="list-none grid gap-4">
        {experiments.map((experiment, index) => {
          return (
            <li key={index}>
              <ExperimentCard {...experiment} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperimentsList;
