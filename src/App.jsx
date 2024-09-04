import React, { useState, useCallback } from 'react';
  
function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '`~!@#$%^&*[]{}()';

    for (let i = 0; i < length; i++) {
      let char = str.charAt(Math.floor(Math.random() * str.length));
      pass += char;
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => alert('Password copied to clipboard!'))
        .catch(err => alert('Failed to copy password.'));
    }else{
      alert('Generate a password first')
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Password Generator</h1>
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-xl mb-2" htmlFor="length">
            Password Length
          </label>

          <input
            type="text"
            id="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="1"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <input
            type="range"
            id="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="1"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Include Numbers</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Include Special Characters</span>
          </label>
        </div>
        <button
          onClick={passwordGenerator}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Generate Password
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy to Clipboard
        </button>
        {password && (
          <div className="mt-4 p-4 bg-gray-800 text-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Generated Password</h2>
            <p>{password}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
