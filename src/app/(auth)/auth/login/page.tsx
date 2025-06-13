"use client";

import React from "react";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-200"
      data-theme="light"
    >
      <div className="w-full max-w-sm p-8 shadow-lg bg-gray-200 rounded-box text-[#323232]">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Login
        </h2>
        <form className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text ">username</span>
            </div>
            <input
              type="username"
              placeholder="Enter your username"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text ">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </label>

          <button className="btn bg-[#7F81FF] w-full mt-4 text-white">Login</button>
        </form>

        <div className="text-center mt-4">
          <a href="/auth/register" className="link link-hover text-sm text-[#7F81FF]">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
