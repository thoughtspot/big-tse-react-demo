import { Action, EmbedEvent, HostEvent } from "@thoughtspot/visual-embed-sdk";
import {
  SearchEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";

const { Header, Footer, Sider, Content } = Layout;

export const Search = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const onToggleHideActions = (checked: boolean) => {
    if (checked) {
      setHiddenActions([]);
    } else {
      setHiddenActions(actionSet);
    }
  };

  const [disabledActions, setDisabledActions] = React.useState<Action[]>([]);
  const onToggleDisabledActions = (checked: boolean) => {
    if (checked) {
      setDisabledActions([]);
    } else {
      setDisabledActions(actionSet);
    }
  };

  const changeSearch = () => {
    embedRef.current.trigger(HostEvent.Search, {
      searchQuery: "[sales] by [item type]",
      dataSources: ["cd252e5c-b552-49a8-821d-3eadaa049cca"]
    });
  };

  const onCustomAction = (e) => {
    logEvent(e);
    if (e.id === "only-this-viz") {
      embedRef.current.trigger(HostEvent.SetVisibleVizs, [
        "6d39225c-8845-44b4-b105-910981cdbba8"
      ]);
      console.log(JSON.parse(e.data));
    }
  };
  const triggerDrill = () => {};
  const reload = () => {
    embedRef.current.trigger(HostEvent.Reload, {});
  };

  return (
    <Layout>
      <Header>
        Search Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200} collapsible>
          <div className="sider-content">
            <Button onClick={changeSearch}>Change query</Button>
            <Button onClick={reload}>Reload</Button>
            <Button onClick={triggerDrill}>Drill</Button>

            <Switch
              checkedChildren="Actions shown"
              unCheckedChildren="Actions hidden"
              defaultChecked
              onChange={onToggleHideActions}
            />
            <Switch
              checkedChildren="Actions enabled"
              unCheckedChildren="Actions disabled"
              defaultChecked
              onChange={onToggleDisabledActions}
            />
          </div>
        </Sider>

        <Content>
          <SearchEmbed
            frameParams={{
              height: "720px"
            }}
            className="liveboard-content"
            ref={embedRef}
            dataPanelV2={true}
            collapseDataSources={true}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason="Pay $$$"
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
            onQueryChanged={logEvent}
            onVizPointDoubleClick={logEvent}
            onData={logEvent}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
