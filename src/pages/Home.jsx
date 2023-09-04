import React from "react";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  return (
    <div className="flex flex-col gap-4 md:flex-row w-full px-8 py-4">
      <div className="w-full flex flex-col gap-2 md:w-1/2 text-quinary ">
        <h1 className="font-bowlby text-[36px] hover:scale-90 transition-transform">
          {" "}
          Who you are, encapsulated. Find it in the bio link
        </h1>
        <div className="flex bg-white items-center gap-1 px-3 rounded-lg md:w-fit overflow-clip w-full h-[40px] ">
          <p className="text-[20px]"> listmylinks.com/ </p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="border-none outline-none h-full text-[20px]"
          />
        </div>
        <button
          className="w-fit px-4 py-1 mt-4 bg-yellow-500 rounded-lg text-black font-bold"
          onClick={() => {
            console.log("dada");
            navigate(`/register?username=${username}`);
          }}
        >
          {" "}
          Join Now{" "}
        </button>
      </div>
      <div className="w-full md:w-1/2 overflow-clip rounded-lg">
        <img
          src="/section1.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const Seciton2 = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2  gap-4 md:flex-row w-full px-8 py-4">
      <div className="px-4 hover:animate-pulse rounded-lg text-white h-[200px] w-full !aspect-square flex items-center bg-gradient-to-r from-fuchsia-500 to-cyan-500">
        <h3 className="font-bowlby text-3xl text-center">
          {" "}
          Create a profile and pick a theme{" "}
        </h3>
      </div>
      <div className="px-4 hover:animate-pulse rounded-lg text-white h-[200px] w-full !aspect-square flex items-center bg-gradient-to-r from-amber-500 to-pink-500">
        <h3 className="font-bowlby text-3xl text-center">
          {" "}
          Add your links to your profile{" "}
        </h3>
      </div>
      <div className="px-4 hover:animate-pulse rounded-lg text-white h-[200px] w-full !aspect-square flex items-center bg-gradient-to-r from-teal-400 to-yellow-200">
        <h3 className="font-bowlby text-3xl text-center">
          {" "}
          Share your ListMyLinks profile{" "}
        </h3>
      </div>
      <div className="px-4 hover:animate-pulse rounded-lg text-white h-[200px] w-full !aspect-square flex items-center bg-gradient-to-r from-fuchsia-600 to-purple-600">
        <h3 className="font-bowlby text-3xl text-center">
          {" "}
          People can reach your links on one link{" "}
        </h3>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-[400px] flex flex-col justify-start items-center border-black">
      <Section1 />
      <Seciton2 />
    </div>
  );
}
