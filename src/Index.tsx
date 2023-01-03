import { nanoid } from "nanoid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";

export function Index() {
  const userName = useReadLocalStorage<string>("userName");
  const [scoreRoom] = useState(() => nanoid());
  const [estimateRoom] = useState(() => nanoid());

  return (
    <div className="w-screen h-screen flex flex-col space-y-8 justify-center items-center">
      <h1 className="font-bold text-3xl text-white drop-shadow">
        Hello {userName} 😃, what would you like to do?
      </h1>

      <div className="flex space-x-6">
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to={`room/score/${scoreRoom}`}
        >
          Score ⭐️
        </Link>
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          to={`room/estimate/${estimateRoom}`}
        >
          Estimate 📊
        </Link>
      </div>
    </div>
  );
}
