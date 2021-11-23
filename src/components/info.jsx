import { BsTwitter } from "react-icons/bs";
const InfoCard = ({ wave }) => {
  return (
    <div className="border-2 border-black p-4 shadow-lg rounded-md">
      <p className="truncate text-lg">Wave from: {wave.address}</p>
      <p className="text-base">Message: {wave.message}</p>

      <p>
        Sent on:
        <span className="font-semibold ml-2">{wave.timestamp}</span>
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
    </div>
  );
};

export default InfoCard;
