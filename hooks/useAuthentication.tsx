import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const { token } = await parseCookies();
      setIsLoggedIn(!!token);
    };

    checkLogin();
  }, []);

  return isLoggedIn;
};
