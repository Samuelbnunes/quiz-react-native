import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import Home from "../pages/Home";

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Home onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <AuthStack onLogin={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}
