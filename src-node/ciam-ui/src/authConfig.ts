import { LogLevel, ILoggerCallback } from "@azure/msal-browser";




export const msalConfig = {
  auth: {
    clientId: "",
    authority: "",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
     loggerCallback: ((level: LogLevel, message: string, containsPii: boolean) => {
  if (!containsPii) {
    console.log("[MSAL]", message);
  }
}) as ILoggerCallback,

      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};


export const loginRequest = {
  scopes: ["api://clientId/access_as_user"],
};
