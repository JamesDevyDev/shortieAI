"use client";

import React, { useEffect, useState } from "react";
import useAuthStore from "@/zustand/useAuthStore";
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter();
  const { loginFunction, authUser, getLoggedInUser } = useAuthStore();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getLoggedInUser();
    if (authUser) {
      router.push('/');
    }
  }, [authUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = await loginFunction(username, password);
    setIsLoading(false);

    if (data?.error) {
      setError(data.error);
      return;
    }

    setUsername('');
    setPassword('');
    router.push('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-200"
      data-theme="light"
    >
      <div className="w-full max-w-sm p-8 shadow-lg bg-gray-200 rounded-box text-[#323232]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="btn bg-[#7F81FF] w-full mt-4 text-white disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}
        </form>

        <div className="text-center mt-4">
          <a href="/auth/register" className="link link-hover text-sm text-[#7F81FF]">
            Don&apos;t have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
