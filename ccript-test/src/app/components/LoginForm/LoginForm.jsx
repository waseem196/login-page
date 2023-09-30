import { LoginContext } from '@/context/LoginContext';
import { useContext, useState } from 'react';
import Button from '../Button/Button';

function LoginForm() {
  const { loginHandler } = useContext(LoginContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('Sign In');

  const inputFormSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading('Logging in...');

    const requestBody = {
      username: name,
      password,
    };

    try {
      const res = await fetch('https://hiring-test-task.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        const data = await res.json();
        loginHandler(data.token);
        setLoading('Sign In');
      } else {
        setLoading('Sign In');
        console.error('Sign In failed');
      }
    } catch (error) {
      setLoading('Sign In');
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 md:w-96 px-4">
        <div className="flex justify-center mb-6">
          <img
            src="/ccript-logo.png"
            alt="Sign In"
            className="w-[144.31px] h-[50.62px]"
          />
        </div>
        <form onSubmit={inputFormSubmitHandler}>
          <div className="mb-4">
            <Button
              label="Username"
              placeholder="Enter your name here"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Button
              label="Password"
              placeholder="Enter Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`text-center w-full hover:bg-[#0b855a] rounded-lg transition-all duration-300 cursor-pointer text-white font-bold py-2 px-4 focus:outline-none ${
              loading === 'Sign In'
                ? 'bg-[#0AA36E]'
                : 'bg-[#28db9c] hover:bg-[#28db9c]'
            }`}
          >
            {loading}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
