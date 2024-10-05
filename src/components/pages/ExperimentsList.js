import { experiments } from "../../data/experiments";

import ExperimentCard from "../partials/ExperimentCard";

const ExperimentsList = () => {
  return (
    <div>
      <h1>Experiments List</h1>
      <ul>
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
