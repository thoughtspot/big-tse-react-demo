import { Action, EmbedEvent, HostEvent } from "@thoughtspot/visual-embed-sdk";
import {
  SearchBarEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch } from "antd";
import _ from "lodash";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";
import { Pivot } from "./pivot";
import "./search-bar.css";

const { Header, Footer, Sider, Content } = Layout;

export const SearchBar = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [data, setData] = React.useState<any[]>([]);

  const changeSearch = () => {
    embedRef.current.trigger(HostEvent.Search, {
      searchQuery: "[sales] by [item type]",
      dataSources: ["cd252e5c-b552-49a8-821d-3eadaa049cca"]
    });
  };

  const onData = React.useCallback(
    ({ data: result }) => {
      console.log(result);
      const cols = result.embedAnswerData.columns.map(
        ({ column }) => column.name
      );
      const data = result.embedAnswerData.data.columnDataLite.map(
        (dv) => dv.dataValue
      );
      const rows = _.zip(...data);
      const pivotData = [cols, ...rows];
      console.log(pivotData);

      setData(pivotData);
    },
    [setData]
  );

  return (
    <Layout>
      <Header>
        Search Bar Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={320}>
          <div className="sider-content">
            <SearchBarInternal onData={onData} />
          </div>
        </Sider>

        <Content style={{ height: "600px" }}>
          <Pivot data={data} />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

const SearchBarInternal = React.memo(({ onData }) => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();

  return (
    <SearchBarEmbed
      frameParams={{
        height: "100%"
      }}
      className="search-bar"
      ref={embedRef}
      dataSources={[
        "235f049a-e201-4e67-9bf5-14fcf3f264cf", //view
        "cd252e5c-b552-49a8-821d-3eadaa049cca", //sample-retail
        "aabe9f0b-620a-4f16-82a0-f8385518d52e", //sf-france
        "25267a89-32e2-4749-bcb9-ff5d5e6a1b2a", //unique-501-ui-ws
        "08f07a95-1f6d-45f3-a41e-790e0a813de3" //date
      ]}
      onInit={logEvent(EmbedEvent.Init)}
      onLoad={logEvent("Load")}
      onDrilldown={logEvent}
      onQueryChanged={logEvent}
      onData={onData}
      onError={logEvent}
    />
  );
});
