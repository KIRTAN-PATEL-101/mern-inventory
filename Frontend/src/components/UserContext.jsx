import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
      axios
            .get(
                `http://localhost:8000/`
            )
            .then((response) => {
                const posts = response.data;
                this.setState({ posts });
            });
  }, [])

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
};