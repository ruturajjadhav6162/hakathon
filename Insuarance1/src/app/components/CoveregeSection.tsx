"use client"
import { useState, useEffect } from "react";

const CoverageSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <section className={`p-6 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Coverage Details</h2>
        </div>

        <div className="flex-col md:grid-cols-2 gap-10 mt-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">What is Covered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Accidents</h4>
                <p>Coverage for damages resulting from collisions, regardless of fault.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center ">Theft</h4>
                <p>Protection against loss or damage due to vehicle theft.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Fire</h4>
                <p>Compensation for damages caused by fire incidents.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Natural Calamities</h4>
                <p>Coverage for damages from events like floods, earthquakes, and storms.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Third-Party Liability</h4>
                <p>Protection against legal liabilities for injuries or damages to third parties.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Personal Accident</h4>
                <p>Coverage for injuries or death caused to the driver and passengers in the insured vehicle.</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 ">What is Not Covered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Normal Wear and Tear</h4>
                <p>Excludes coverage for damages due to regular use and aging of the vehicle.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Driving Under the Influence</h4>
                <p>Claims arising from accidents while driving under the influence of alcohol or drugs are not covered.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Driving Without a Valid License</h4>
                <p>Excludes coverage if the driver does not possess a valid driving license.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Commercial Use</h4>
                <p>Does not cover damages if the vehicle is used for commercial purposes not specified in the policy.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Intentional Damage</h4>
                <p>Excludes coverage for damages caused intentionally by the policyholder or authorized driver.</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-center">Unauthorized Modifications</h4>
                <p>Excludes coverage for damages resulting from unauthorized modifications to the vehicle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;