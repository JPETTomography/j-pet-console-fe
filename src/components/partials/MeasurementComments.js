// TODO: fetch + design

const MeasurementComments = (props) => {
  const { measurement } = props;

  return (
    <div>
      Comments for <strong>{measurement.name}</strong>
    </div>
  );
};

export default MeasurementComments;
