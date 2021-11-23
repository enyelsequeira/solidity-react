import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import { ethers } from "ethers";

export const WaveContext = React.createContext();

export const WaveProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [waves, setWaves] = useState(localStorage.getItem("current_count"));
  const [allWaves, setAllWaves] = useState([]);

  const [infoData, setInfoData] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInfoData((prev) => ({ ...prev, [name]: value }));
  };
  const messageData = infoData.message;
  const twitter = infoData.twitter;

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

        const waveTxn = await wavePortalContract.wave(messageData, twitter);
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

  const getAllWaves = async () => {
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

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfWaveExists();
  }, [waves]);

  return (
    <WaveContext.Provider
      value={{
        waves,
        connectWallet,
        allWaves,
        currentAccount,
        isLoading,
        wave,
        handleChange,
      }}
    >
      {children}
    </WaveContext.Provider>
  );
};
