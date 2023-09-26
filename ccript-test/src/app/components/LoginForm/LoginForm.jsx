'use client';

import { useState } from 'react';

function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const inputFormSubmitHandler = async (e) => {
    e.preventDefault();

    // Create a JSON object with the username and password
    const requestBody = {
      username: name,
      password,
    };

    try {
      const res = await fetch('https://hiring-test-task.vercel.app/api/login', {
        method: 'POST', // Use POST method for login
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestBody), // Convert the object to JSON
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login successful:', data);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <img
            src="/ccript-logo.png"
            alt="Login"
            className="w-[144.31px] h-[50.62px]"
          />
        </div>
        <form onSubmit={inputFormSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring
              focus:ring-[#0AA36E] focus:ring-offset-2"
              placeholder="Enter your name here"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring 
              focus:ring-[#0AA36E] focus:ring-offset-2"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center w-full bg-[#0AA36E] hover:bg-[#0b855a] rounded-lg transition-all duration-300 cursor-pointer">
            <button
              type="submit"
              className=" text-white font-bold py-2 px-4 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
