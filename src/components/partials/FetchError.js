import Svg from "../partials/Svg";

const FetchError = (props) => {
  const { error, fetchFun } = props;

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4 text-xl font-medium">
      <p>The following error occured while loading the list:</p>
      <div className="flex gap-4 w-full max-w-4xl p-4 rounded-xl bg-red-50 border border-red-600 text-red-600">
        <Svg src="/icons/exclamation-circle.svg" className="w-6 h-6" />
        {error}
      </div>
      <p>Please, try again or check your connection.</p>
      <button onClick={fetchFun} className="flex gap-3 px-5 py-3 rounded bg-sky-700 hover:bg-sky-600 text-base text-white">
        <span>Retry</span>
        <Svg src="/icons/arrow-path-rounded-square.svg" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FetchError;
