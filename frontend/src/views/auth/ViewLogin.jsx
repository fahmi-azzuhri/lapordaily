import React from "react";
import { Typography, Input } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function ViewLogin({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  passwordShown,
  togglePasswordVisiblity,
}) {
  return (
    <div>
      <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
        Enter your email and password to sign in
      </Typography>
      <form onSubmit={handleLogin} className="mx-auto max-w-[24rem] text-left">
        <div className="mb-6">
          <label htmlFor="email">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Your Username
            </Typography>
          </label>
          <Input
            id="username"
            color="gray"
            size="lg"
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your username"
            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 border border-blue-gray-100 rounded-md p-3"
            labelProps={{
              className: "hidden",
            }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Password
            </Typography>
          </label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full pr-10 placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 border border-blue-gray-100 rounded-md p-3"
              type={passwordShown ? "text" : "password"}
            />
            <div
              onClick={togglePasswordVisiblity}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {passwordShown ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
        <button
          className="block w-full rounded-lg bg-blue-500 px-5 py-3.5 text-sm font-medium text-white hover:bg-blue-700"
          fullWidth
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
