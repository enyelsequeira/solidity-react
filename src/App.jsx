import { ethers } from "ethers";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/loader";
import abi from "./utils/WavePortal.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [waves, setWaves] = useState(localStorage.getItem("current_count"));

  // address of account

  const contractAddress = "0xfFd2563B1453e1aDf31Afac811311edBf50D1c6f";

  const contractABI = abi.abi;

  const checkIfWalletIsConnect = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask");
        return;
      } else {
        console.log(`We have the ethereum object ${ethereum}`);
      }

      // check if we are authorized to access users wallet

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        // we grab the first account
        const account = accounts[0];
        console.log(`Found an authorized Account: ${account}`);

        setCurrentAccount(account);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // connect to wallet

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(`connected, ${accounts[0]}`);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const checkIfWaveExists = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let count = await wavePortalContract.getTotalWaves();
        window.localStorage.setItem("current_count", count);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // info this is what we actually use to talk to the Ethereum nodes.
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(wavePortalContract.getTotalWaves());

        let count = await wavePortalContract.getTotalWaves();
        // console.log(`Retrieving the count ${count.toNumber()} `);
        setWaves(count.toNumber());

        // execute wave from your smart contract

        const waveTxn = await wavePortalContract.wave();
        setIsLoading(true);
        // console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        // console.log("Mined -- ", waveTxn.hash);
        setIsLoading(false);

        count = await wavePortalContract.getTotalWaves();
        // console.log(`Retrieving the total count ${count.toNumber()} `);

        setWaves(count.toNumber());
      } else {
        console.log("No ethereum object");
        throw new Error("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfWaveExists();
  }, [waves]);

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

        {isLoading && <Loader />}

        <motion.button
          className={`w-[fit-content] flex  px-3 py-2 border-2 bg-gradient-to-r from-purple-300  to-red-300 font-extrabold tracking-wider mx-auto rounded-t-lg rounded-r-lg ${
            isLoading ? "from-purple-500  to-gray-500" : ""
          }`}
          onClick={wave}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isLoading ? "Loading..." : "Wave at me 👋🏼"}
        </motion.button>

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
      </motion.div>
    </div>
  );
}

export default App;
