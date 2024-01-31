import {
  AccessLevelEnum,
  Client,
  DEFAULT_CONFIGURATION,
  FormatType1Enum,
  MetadataController,
  DataController,
  SessionController,
  Type10Enum
} from "@thoughtspot/rest-api-sdk";
import { TOKEN_ENDPOINT_API, TS_HOST } from "./constants";
import React, { useState } from "react";

DEFAULT_CONFIGURATION.baseUrl = `https://${TS_HOST}`;
DEFAULT_CONFIGURATION.acceptLanguage = "*";

const apiContext = React.createContext<{
  metadataController: MetadataController | null;
  dataController: DataController | null;
}>({
  metadataController: null,
  dataController: null
});

export const useAPIClient = () => React.useContext(apiContext);

export const APIProvider = ({ children }) => {
  const [loading, uisetLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [controllers, setControllers] = React.useState<any>({});

  const init = (token: string) => {
    DEFAULT_CONFIGURATION.accessToken = token;
    let client = new Client(DEFAULT_CONFIGURATION);
    const metadataController = new MetadataController(client);
    const dataController = new DataController(client);
    setControllers({
      metadataController,
      dataController
    });
  };

  React.useEffect(() => {
    // fetch(TOKEN_ENDPOINT_API)
    //   .then((res) => res.text())
    //   .then((token) => {
    //     init(token);
    //   });
  }, []);

  return (
    <apiContext.Provider value={controllers}>{children}</apiContext.Provider>
  );
};
