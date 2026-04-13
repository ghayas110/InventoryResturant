"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


const SignIn: React.FC = () => {
  const router = useRouter();
  const handleSubmit =  () => {
   router.push("/Dashboard/InventoryDashboard");
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-boxdark">
        <div className="w-full max-w-md rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-12.5">
          <div className="text-center mb-8 flex flex-col items-center">
            <Link className="mb-4 inline-block" href="/">
              <Image
                src={"/images/logo/queata_logo.png"}
                alt="Queata Batery Traders Logo"
                width={176}
                height={176}
                className="mx-auto"
              />
            </Link>
            <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Queata Batery Traders
            </h2>
            <p className="mt-2 text-sm text-slate-400 dark:text-gray-400">
              Solar & Battery Inventory Management System
            </p>
          </div>

          <form>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="6+ Characters, 1 Capital letter"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5" onClick={handleSubmit}>
              <input
                type="button"
                value="Sign In"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>

            <div className="mt-6 text-center">
              <p>
                Don’t have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
