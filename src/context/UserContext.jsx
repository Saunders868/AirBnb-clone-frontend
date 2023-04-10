import { useEffect } from "react";
import { createContext, useState } from "react";
import { PROFILE_URL } from "../constants";
import { axiosFetch } from "../utils/fetch";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      const fetchData = async () => {
        const response = await axiosFetch({
          method: "get",
          url: PROFILE_URL,
        });

        if (response.status === 200) {
          setUser(response.responseData);
          setReady(true);
        } else {
          setUser(null);
          setReady(true);
        }
      };

      fetchData();
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
