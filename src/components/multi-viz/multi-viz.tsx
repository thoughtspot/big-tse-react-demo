import {
  Action,
  EmbedEvent,
  HostEvent,
  RuntimeFilterOp
} from "@thoughtspot/visual-embed-sdk";
import {
  LiveboardEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";
import { useGetLiveboardVizIds } from "../../services/api";

const { Header, Footer, Sider, Content } = Layout;

export const MultiViz = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const vizIds = useGetLiveboardVizIds("2cdfc5f8-3a50-41f6-b97f-dc4ef362f1a4");

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

  const applyFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: "state",
        operator: "EQ",
        values: ["michigan"]
      }
    ]);
  };
  const resetFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: "state",
        operator: "EQ",
        values: []
      }
    ]);
  };

  const onCustomAction = (e) => {
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
        Liveboard Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        {/* <Sider width={200} collapsedWidth={0} collapsible>
          <div className="sider-content">
            <Button onClick={applyFilter}>Filter Michigan</Button>
            <Button onClick={resetFilter}>Reset filter</Button>
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
        </Sider> */}

        <Content>
          {vizIds?.map((viz) => (
            <LiveboardEmbed
              frameParams={{
                height: 400,
                loading: "lazy"
              }}
              className="liveboard-content"
              ref={embedRef}
              hiddenActions={hiddenActions}
              disabledActions={disabledActions}
              disabledActionReason="Pay $$$"
              fullHeight={true}
              liveboardId="2cdfc5f8-3a50-41f6-b97f-dc4ef362f1a4"
              vizId={viz}
              onInit={logEvent(EmbedEvent.Init)}
              onLoad={logEvent("Load")}
              onLiveboardRendered={logEvent}
              onDrilldown={logEvent}
              onCustomAction={onCustomAction}
            />
          ))}
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
