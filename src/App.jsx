import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); //light mode
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let characterSets = [];
    if (includeLetters)
      characterSets.push(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      );
    if (includeNumbers) characterSets.push("0123456789");
    if (includeSymbols) characterSets.push("!@#$%^&*()_+[]{}|;:,.<>?/");

    if (characterSets.length === 0) {
      setPassword(""); // No options selected, return empty password
      return;
    }

    let newPassword = [];

    //  Ensure at least one character from each selected set
    characterSets.forEach((set) => {
      newPassword.push(set.charAt(Math.floor(Math.random() * set.length)));
    });

    //  Fill the rest of the password randomly
    const allCharacters = characterSets.join(""); // Merge all selected sets
    for (let i = newPassword.length; i < length; i++) {
      newPassword.push(
        allCharacters.charAt(Math.floor(Math.random() * allCharacters.length))
      );
    }
    //  Shuffle the password to avoid predictable patterns
    newPassword = newPassword.sort(() => Math.random() - 0.5).join("");

    setPassword(newPassword);
  }, [length, includeNumbers, includeLetters, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-6 transition-all duration-300${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl transition-all duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Password Generator
        </h1>

        <input
          type="text"
          value={password}
          ref={passwordRef}
          readOnly
          className={`w-full p-3 text-lg rounded text-center mb-4 focus:outline-none ${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        />

        <button
          onClick={copyToClipboard}
          className={`w-full p-3 rounded mb-4 ${
            isDarkMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-700 hover:bg-blue-800"
          } text-white focus:outline-none`}
        >
          Copy to Clipboard
        </button>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <label>Length: {length}</label>
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center">
            <label>Include Letters</label>
            <input
              type="checkbox"
              checked={includeLetters}
              onChange={() => setIncludeLetters(!includeLetters)}
              className="rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <label>Include Symbols</label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          onClick={generatePassword}
          className={`w-full p-3 rounded text-white ${
            isDarkMode
              ? "bg-green-500 hover:bg-green-600"
              : "bg-green-700 hover:bg-green-800"
          } focus:outline-none`}
        >
          Generate Password
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ext-sm font-semibold transitio${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            } text-gray focus:outline-none`}
          >
            Switch to {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
