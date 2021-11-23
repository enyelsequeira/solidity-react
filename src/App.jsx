import { motion } from "framer-motion";
import { useContext } from "react";
import "./App.css";
import InfoCard from "./components/info";
import InputForm from "./components/input";
import Loader from "./components/loader";
import { WaveContext } from "./context/waveContext";

function App() {
  const { isLoading, waves, connectWallet, allWaves, currentAccount } =
    useContext(WaveContext);

  console.log({ isLoading: isLoading });
  return (
    <div className="container mx-auto min-h-[100vh] bg-gradient-to-r from-purple-100 to-red-100 rounded-2xl">
      <h1 className="text-center my-5 py-12 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-red-600">
        Send a wave and chill 👋🏼
      </h1>

      <motion.div className="bg-gradient-to-r  from-purple-200 to-red-200 rounded-2xl mt-11 py-10 ">
        <div className=" flex flex-col items-center space-y-5">
          <p className="text-2xl md:text-3xl leading-loose tracking-wide my-2 p-7 w-full md:w-2/3  text-center">
            My name is Enyel, I am currently working on learning about{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 uppercase">
              {" "}
              web3
            </span>{" "}
            and
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 uppercase">
              {" "}
              solidity{" "}
            </span>{" "}
            ecosystem.
          </p>

          <p className="text-2xl tracking-wide p-6 text-center">
            Lets{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 uppercase">
              {" "}
              Connect
            </span>{" "}
            and{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 uppercase">
              {" "}
              build
            </span>{" "}
            something together.
          </p>

          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-600 py-3">
            Current waves {waves}
          </p>
        </div>

        <InputForm />

        {isLoading && isLoading && <Loader />}

        {!currentAccount && (
          <motion.button
            className="w-[fit-content] flex  px-3 py-2 border-2 bg-gradient-to-r from-purple-300  to-red-300 font-extrabold tracking-wider mx-auto rounded-t-lg rounded-r-lg"
            onClick={connectWallet}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Connect Wallet
          </motion.button>
        )}
        {/* all waves here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-1 py-2">
          {allWaves.map((wave, index) => {
            console.log(wave);
            return <InfoCard key={index} wave={wave} />;
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
