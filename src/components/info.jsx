import { data } from "autoprefixer";
import { useContext } from "react";
import { BsTwitter } from "react-icons/bs";
import { WaveContext } from "../context/waveContext";
import useFetch from "../hooks/useFetch";
const InfoCard = ({ wave }) => {
  const { data, loading } = useFetch({ keyword: wave.keyword });
  return (
    <div className="border-2 border-gray-400 p-4 shadow-lg rounded-md">
      <p className="truncate text-lg">Wave from: {wave.address}</p>
      <p className="text-base">Message: {wave.message}</p>

      <p>
        Sent on:
        <span className="font-semibold ml-2">{wave.timestamp}</span>
      </p>
      <p>
        Keyword:
        <span className="font-semibold ml-2">{wave.keyword}</span>
      </p>
      <div className="flex  items-center">
        Follow on
        <BsTwitter className="mx-2 text-blue-600" />
        <a
          className="text-blue-600"
          href={`https://twitter.com/${wave.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{wave.twitter}
        </a>
      </div>

      {data &&
        data.slice(0, 1).map((d) => {
          return (
            <div
              key={d.id}
              className="w-64 rounded-lg mx-auto mt-3 border-2 border-black"
            >
              <img
                className="rounded-lg"
                src={d.images.downsized_medium.url}
                alt={d.title}
              />
            </div>
          );
        })}
    </div>
  );
};

export default InfoCard;
