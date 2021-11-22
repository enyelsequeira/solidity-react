import { motion } from "framer-motion";
import "./App.css";

function App() {
  const wave = () => {};
  return (
    <div className="container mx-auto min-h-[100vh] bg-gradient-to-r from-purple-100 to-red-100 rounded-2xl">
      <h1 class="text-center my-5 py-12 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-red-600">
        Send a wave and chill 👋🏼
      </h1>

      <div className="bg-gradient-to-r  from-purple-200 to-red-200 rounded-2xl mt-11 py-10 ">
        <div className=" flex flex-col items-center space-y-5">
          <p className="text-2xl md:text-3xl leading-loose tracking-wide my-2 p-7 w-full md:w-2/3  text-center">
            My name is Enyel, I am currently working on learning about web3 and
            solidity ecosystem.
          </p>

          <p className="text-2xl tracking-wide p-6 text-center">
            Lets connect and build something together.
          </p>
        </div>

        <motion.button
          className="w-[fit-content] flex  px-3 py-2 border-2 bg-gradient-to-r from-purple-300  to-red-300 font-extrabold tracking-wider mx-auto rounded-t-lg rounded-r-lg"
          onClick={wave}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Wave at Me
        </motion.button>
      </div>
    </div>
  );
}

export default App;
