"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [dob, setDob] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when submit is triggered
    const genAI = new GoogleGenerativeAI(
      "AIzaSyCZbMGms1R4FC30ykDKyOo9Oj2g-YoHMdI"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `I am ${prompt} and my DOB is ${dob?.toLocaleDateString()} and I want to know about my future. Just give me a funny and cute future prediction. And add a funny and tricky line at the end response.`
    );
    setResponse(result.response.text().replace(/\*\*/g, ''));
    setLoading(false); // Stop loading once the result is available
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full pr-0 md:pr-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">✨ Fill in Your Details ✨</h1>

          <form onSubmit={submitHandler} className="mb-6">
            <div className="border h-[50px] mb-4">
              <input
                type="text"
                value={prompt}
                placeholder="Enter your name..."
                className="w-full p-3  focus:outline-none focus:border-purple-500 shadow-inner"
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="relative border h-[50px] mb-4">
              <DatePicker
                selected={dob} // Keep it null initially
                onChange={(date) => setDob(date)}
                className="w-full p-3 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 pr-10 custom-datepicker"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select your date of birth"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                openToDate={new Date("2000-01-01")} // This is the default open date when calendar opens
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {/* Calendar Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m4 8h-8M4 7h16a2 2 0 002 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"
                  />
                </svg>
              </div>
            </div>

            <input
              type="submit"
              value="✨ Reveal My Future ✨"
              className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 cursor-pointer transition duration-200 shadow-lg"
              disabled={loading} // Disable submit button during loading
            />
          </form>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center relative md:flex md:w-1/6">
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="w-0.5 h-full bg-gray-300"></div>
          </div>
          <h2 className="absolute text-center px-3 bg-white text-lg font-semibold text-purple-500 first-yr">
            Your Future
          </h2>
        </div>

        {/* Response Section */}
        <div className="w-full pl-0 md:pl-4 flex-grow">
          <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">🔮 Your Future 🔮</h1>

          <div className="bg-gray-50 p-4 h-[400px] rounded-lg border border-gray-200 overflow-y-auto scrollable-element">
            {response ? (
              <p className="mt-2 text-gray-700">{response}</p>
            ) : (
              <p className="mt-2 text-gray-500">Your prediction will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
