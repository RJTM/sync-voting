import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useParams } from "react-router-dom";
import { useDocumentTitle, useReadLocalStorage } from "usehooks-ts";
import useStore from "./score.store";

export function ScoreRoom() {
  const params = useParams();
  const userName = useReadLocalStorage("userName") as string;
  const {
    shouldReveal,
    liveblocks: { enterRoom, leaveRoom },
  } = useStore();
  const setName = useStore((state) => state.setName);

  useDocumentTitle("Scoring...");

  useEffect(() => {
    if (userName != null) {
      setName(userName);
    }
  }, [userName]);

  useEffect(() => {
    enterRoom(params.roomId!);

    return () => {
      leaveRoom(params.roomId!);
    };
  }, [enterRoom, leaveRoom]);

  return (
    <div>
      <div className="flex justify-end p-4">
        <Others />
      </div>
      {shouldReveal ? <Results /> : <Voting />}
    </div>
  );
}

function Others() {
  const others = useStore((store) => store.liveblocks.others);

  return (
    <ul className="flex h-10">
      {others.map((other) => (
        <UserBubble
          key={other.connectionId}
          name={other.presence.name}
          voted={other.presence.hasVoted}
        />
      ))}
    </ul>
  );
}

type UserBubbleProps = {
  name?: string;
  voted?: boolean;
};

function UserBubble({ name, voted = false }: UserBubbleProps) {
  const displayName = name == "" || name == null ? "Anon" : name;
  const initials = displayName.split(" ").map((nameSegment) => nameSegment[0]);

  return (
    <li
      className={`rounded-full w-10 h-10 bg-gray-400 text-white flex justify-center items-center ${
        voted && "border-2 border-green-500"
      }`}
      title={displayName}
    >
      <span>{initials}</span>
    </li>
  );
}

const OPTIONS = [...Array(5).keys()].map((i) => i + 1);

function Voting() {
  const {
    score,
    setScore,
    reveal,
    liveblocks: { others },
  } = useStore();

  const peopleThatHaveVoted = others.reduce(
    (sum, user) => (user.presence?.hasVoted ? sum + 1 : sum),
    0
  );

  useHotkeys("1", () => setScore(1));
  useHotkeys("2", () => setScore(2));
  useHotkeys("3", () => setScore(3));
  useHotkeys("4", () => setScore(4));
  useHotkeys("5", () => setScore(5));

  return (
    <div className="flex flex-col space-y-10">
      <h1 className="text-center text-white drop-shadow text-4xl font-bold my-20">
        {score != null ? (
          <span>
            You voted {score} {"⭐️".repeat(score)}
          </span>
        ) : (
          <span>You haven't voted 😭</span>
        )}
      </h1>
      <div className="flex justify-around">
        {OPTIONS.map((option) => (
          <button
            className="w-16 h-16 rounded bg-blue-500 text-3xl text-white font-bold shadow hover:border-2 hover:border-white"
            key={option}
            onClick={() => setScore(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <h4 className="text-center text-white text-xl drop-shadow">
        {peopleThatHaveVoted + (score != null ? 1 : 0)} out of{" "}
        {others.length + 1} have voted
      </h4>
      <div className="text-center">
        <button
          onClick={() => reveal()}
          className="text-white bg-blue-700 hover:bg-blue-800 shadow focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Reveal
        </button>
      </div>
    </div>
  );
}

function Results() {
  const {
    score,
    liveblocks: { others },
    reset,
  } = useStore();

  const usersWithScore = others.filter(
    (user) => user.presence != null && user.presence.score != null
  );
  const othersSum = usersWithScore.reduce(
    (sum, user) => user.presence.score! + sum,
    0
  );

  const overallScore =
    score != null
      ? (othersSum + score) / (usersWithScore.length + 1)
      : othersSum / usersWithScore.length;

  return (
    <div className="ml-10 flex flex-col space-y-10">
      <ul>
        {usersWithScore.map((user) => (
          <li key={user.connectionId} className="text-white font-bold text-xl">
            {user.presence!.name} {"⭐️".repeat(user.presence.score!)}{" "}
            {user.presence!.score}
          </li>
        ))}
      </ul>
      {!isNaN(overallScore) ? (
        <h2 className="text-white text-2xl font-bold drop-shadow text-center">
          Score: {overallScore}
        </h2>
      ) : null}
      <div className="text-center">
        <button
          onClick={() => reset()}
          className="text-white bg-blue-700 hover:bg-blue-800 shadow focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to voting
        </button>
      </div>
    </div>
  );
}
