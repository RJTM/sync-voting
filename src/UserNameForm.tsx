import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export function UserNameForm() {
  const [userName, setUserName] = useLocalStorage<string | undefined>(
    "userName",
    undefined
  );

  const [draftName, setDraftName] = useState<string>();

  const onSave: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setUserName(draftName);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="flex flex-col space-y-4 items-center" onSubmit={onSave}>
        <h1 className="font-bold text-3xl text-white drop-shadow">
          Hello 👋, what's your name?
        </h1>
        <input
          type="text"
          placeholder="John Doe"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDraftName(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={(draftName ?? "").length === 0}
        >
          Save
        </button>
      </form>
    </div>
  );
}
