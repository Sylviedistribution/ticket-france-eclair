// hooks/useCurrentUser.ts
import { useEffect, useState } from 'react';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const item = localStorage.getItem("user");
    /*console.log("user in localStorage:", item);*/
    const user = JSON.parse(item || "null");
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  return { currentUser, isLoading };
}

export default useCurrentUser;