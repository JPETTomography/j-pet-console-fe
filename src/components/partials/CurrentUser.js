import Svg from "./Svg";

const CurrentUser = () => {
  return (
    <button type="button" className="flex items-center gap-2 outline-offset-4">
      <div className="flex flex-col items-end">
        <span className="font-semibold">Current User</span>
        <span className="text-sm text-slate-600">current.user@gmail.com</span>
      </div>
      <Svg src="/icons/chevron-down.svg" className="w-6 h-6 text-slate-400" />
    </button>
  );
};

export default CurrentUser;
