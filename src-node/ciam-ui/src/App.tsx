import React from "react";
import {
  useMsal,
  useIsAuthenticated,
  useAccount,
} from "@azure/msal-react";
import axios from "axios";
import { loginRequest } from "./authConfig";

const App: React.FC = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(instance.getActiveAccount() ?? undefined);

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      instance.setActiveAccount(loginResponse.account);
      console.log("Login success", loginResponse);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  const callApi = async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: instance.getActiveAccount() ?? undefined,
      });

      console.log("Access token:", response.accessToken);

      const apiResponse = await axios.get("https://localhost:5001/secure", {
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });

      alert(`API says: ${JSON.stringify(apiResponse.data)}`);
    } catch (err) {
      console.error("API call failed", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>CIAM React Frontend</h2>

      {!isAuthenticated ? (
        <button onClick={handleLogin}>Sign In</button>
      ) : (
        <>
          <p>Signed in as: {account?.username}</p>
          <button onClick={callApi}>Call Protected API</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default App;
