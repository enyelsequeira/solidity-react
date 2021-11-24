import { motion } from "framer-motion";
import { useContext } from "react";
import HelloWave from "../../images/hello.svg";
import { WaveContext } from "../context/waveContext";

const InputForm = () => {
  const { wave, isLoading, handleChange } = useContext(WaveContext);
  return (
    <div className="flex flex-col md:flex-row md:py-9 md:px-4 items-center">
      <form className="w-full md:w-[50%] py-5 space-y-7" onSubmit={wave}>
        <input
          type="text"
          name="message"
          placeholder="Enter your message"
          className="mx-auto flex w-full  md:w-2/3 my-2 px-8 py-2 rounded-r-lg rounded-t-3xl caret-red-400 placeholder-blue-800"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="twitter"
          placeholder="Let's connect on twitter"
          className="mx-auto flex w-full  md:w-2/3 my-2 px-8 py-2 rounded-r-lg rounded-t-3xl caret-red-400 placeholder-blue-800"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="keyword"
          placeholder="Give me a word and I'll give you a giff"
          className="mx-auto flex w-full  md:w-2/3 my-2 px-8 py-2 rounded-r-lg rounded-t-3xl caret-red-400 placeholder-blue-800"
          onChange={handleChange}
          required
        />
        <motion.input
          className={`w-[fit-content] flex  px-3 py-2 border-2 bg-gradient-to-r from-purple-300  to-red-300 font-extrabold tracking-wider mx-auto rounded-t-lg rounded-r-lg ${
            isLoading ? "from-purple-500  to-gray-500" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            wave();
          }}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          value={isLoading ? "Loading..." : "Wave at me 👋🏼"}
        />
      </form>
      <img
        src={HelloWave}
        alt="hello wave"
        className="hidden md:block md:w-[50%]"
      />
    </div>
  );
};

export default InputForm;
