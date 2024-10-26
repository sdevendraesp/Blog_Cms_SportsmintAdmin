import React, { createContext, useContext, useState } from "react";

// Step 1: Create a context to manage the body class
export const UserContext = createContext();

// Step 2: Create a context provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState({
    todos: [],
  }); // Initialize user state
  const [customTheme, setcustomTheme] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser ,customTheme, setcustomTheme }}>
      {children}
    </UserContext.Provider>
  );
}
