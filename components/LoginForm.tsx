import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/utils/token';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // only avoids error if 200 and has token
      await login(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/'); // change this to your desired route
    }
  }, [isLoggedIn, router]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
