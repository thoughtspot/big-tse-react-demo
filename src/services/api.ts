import React from "react";
import { TS_HOST } from "../constants";

export const useGetLiveboardVizIds = (liveboardId: string) => {
  const [data, error, loading] = useTSApi("metadata/search", "POST", {
    metadata: [{ identifier: liveboardId, type: "LIVEBOARD" }],
    include_details: true
  });

  const vizs =
    data?.[0].metadata_detail.reportContent.sheets[0].sheetContent
      .visualizations;
  return vizs?.map((viz) => viz.header.id);
};

export const useTSApi = (endpoint, method, payload) => {
  const [data, setData] = React.useState();
  const [err, setErr] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    fetch(`https://${TS_HOST}/api/rest/2.0/${endpoint}`, {
      method,
      headers: {
        "Content-type": "application/json",
        accept: "*/*"
      },
      body: JSON.stringify(payload),
      mode: "cors",
      credentials: "include"
    }).then(
      async (resp) => {
        if (!resp.ok) {
          return setErr({
            status: resp.status,
            message: resp.statusText
          });
        }
        const data = await resp.json();
        setData(data);
      },
      (err) => {
        setErr(err);
      }
    );
  }, []);
  return [data, err, loading];
};
