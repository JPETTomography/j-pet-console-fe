import usePasswordToggle from "../../utils/usePasswordToggle";

const PasswordInput = () => {
  const [InputType, Icon] = usePasswordToggle();

  return (
    <div className="grid gap-2 focus-within:text-sky-700 group/input">
      <label
        for="password"
        className="max-w-max hover:text-sky-700 transition-colors duration-300"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={InputType}
          id="password"
          name="password"
          className="w-full p-4 pr-12 rounded border border-slate-300 group-hover/input:border-sky-700 focus:outline-sky-700 text-slate-800 transition-colors duration-300"
        />
        {Icon}
      </div>
    </div>
  );
};

export default PasswordInput;
