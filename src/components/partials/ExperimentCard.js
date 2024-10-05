const ExperimentCard = (props) => {
  const { id } = props;

  return <a href={`/experiments/${id}`}>EXPERIMENT CARD</a>;
};

export default ExperimentCard;
