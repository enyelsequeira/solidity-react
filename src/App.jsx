import "./App.css";

function App() {
  const wave = () => {};
  return (
    <div className="container mx-auto h-ful border-2 border-black">
      <h1 class="text-center  my-5 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-red-600">
        Send a wave and chill 👋🏼
      </h1>

      <div className="bg-gradient-to-r from-pink-600 to-blue-400">
        <div className=" flex flex-col items-center space-y-5 ">
          <p className="text-2xl">
            My name is Enyel, I am currently working on learning about web3 and
            solidity ecosystem.
          </p>

          <p>Lets connect and build something together.</p>
        </div>

        <button
          className="w-[fit-content] flex  px-3 py-2 border-2 bg-gradient-to-r from-purple-300  to-red-300 font-extrabold tracking-wider mx-auto"
          onClick={wave}
        >
          Wave at Me
        </button>
      </div>
    </div>
  );
}

export default App;
