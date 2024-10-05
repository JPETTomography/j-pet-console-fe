import { experiments } from "../../data/experiments";

import { useParams } from "react-router-dom";

const Experiment = () => {
  const { experiment_id } = useParams();
  const experiment = experiments.find((experiment) => {
    return experiment.id.toString() === experiment_id;
  });

  return (
    <div>
      <a href="/experiments">
        <span>Back to experiments list</span>
      </a>
      <h1>{experiment.name}</h1>
    </div>
  );
};

export default Experiment;
