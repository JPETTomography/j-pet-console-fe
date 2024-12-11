import { CONTACT_MAIL } from "../../const";

import PasswordInput from "../partials/PasswordInput";

const Login = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex-1 flex justify-center items-center p-4">
        <section className="grid gap-16 w-full max-w-lg">
          <img
            src="/images/logos/logo-full-v.svg"
            alt="J-PET logotype"
            className="w-20"
          />

          <h1 className="text-center">Login</h1>
          <form className="grid gap-8">
            <div className="grid gap-2 focus-within:text-sky-700 group/input">
              <label
                htmlFor="login"
                className="max-w-max hover:text-sky-700 transition-colors duration-300"
              >
                Login
              </label>
              <input
                type="text"
                id="login"
                name="login"
                className="p-4 rounded border border-slate-300 group-hover/input:border-sky-700 focus:outline-sky-700 text-slate-800 transition-colors duration-300"
              />
            </div>
            <div className="grid gap-2">
              <PasswordInput />

              <a
                href={`mailto:${CONTACT_MAIL}`}
                className="max-w-max ml-auto text-xs text-slate-700 hover:text-slate-900 hover:underline focus:outline-offset-4 transition-colors duration-300"
              >
                Forgot password
              </a>
            </div>
            <button
              type="submit"
              className="p-4 rounded bg-sky-700 hover:bg-sky-900 focus:outline-sky-700 focus:outline-offset-4 text-white font-medium transition-colors duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center">
            You don’t have an account yet?
            <br />
            Please contact with our{" "}
            <a
              href={`mailto:${CONTACT_MAIL}`}
              className="text-sky-600 hover:text-sky-800 font-semibold focus:outline-offset-4 transition-colors duration-300"
            >
              administration
            </a>
            .
          </p>
        </section>
      </div>
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/login-bg.png"
          })`,
        }}
        className="hidden lg:block overflow-hidden bg-cover bg-top bg-no-repeat"
      ></div>
    </div>
  );
};

export default Login;
