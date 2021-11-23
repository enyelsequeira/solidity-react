import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const useVerifaction = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState(localStorage.getItem("current_count"));
  const [allWaves, setAllWaves] = useState([]);

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
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

  const getAllWaves = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // call the get getAllWaves from the contract
        const waves = await wavePortalContract.getAllWaves();

        // lets get specific data
        let wavesCleaned = [];

        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(
              wave.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: wave.message,
            twitter: wave.account,
          });
        });
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum is not present ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
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
        getAllWaves();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWaveExists = async () => {
    try {
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

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfWaveExists();
  }, [waves]);

  return [
    checkIfWalletIsConnect,
    connectWallet,
    waves,
    setWaves,
    currentAccount,
    setCurrentAccount,
    checkIfWaveExists,
    allWaves,
  ];
};

export default useVerifaction;
