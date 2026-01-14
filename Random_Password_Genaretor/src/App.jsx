import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) chars += "0123456789";
    if (charAllow) chars += "!@#$%^&*_";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numAllow, charAllow]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg">
        
        <h1 className="text-white text-2xl mb-4 text-center">
          Password Generator
        </h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-3 py-2 rounded-l-md bg-gray-700 text-white outline-none"
          />
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 cursor-pointer"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label className="text-gray-300 text-sm">
            Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <input
              type="checkbox"
              checked={numAllow}
              onChange={() => setNumAllow((prev) => !prev)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2 text-gray-300 text-sm font-Poppins">
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            Symbols
          </label>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-Poppins cursor-progress"
        >
          Generate Password
        </button>
      </div>
    </div>
    
  );
}

export default App;
