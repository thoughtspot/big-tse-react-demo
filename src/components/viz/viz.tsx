import { Action, EmbedEvent, HostEvent } from "@thoughtspot/visual-embed-sdk";
import {
  LiveboardEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";

const { Header, Footer, Sider, Content } = Layout;

export const Viz = () => {
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
        <Sider width={200}>
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
        </Sider>

        <Content>
          <LiveboardEmbed
            frameParams={{
              height: 400
            }}
            className="liveboard-content"
            ref={embedRef}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason="Pay $$$"
            fullHeight={true}
            liveboardId="c6746439-61cd-431c-a0d2-0328c9519057"
            vizId="53bc1596-dacd-489d-837f-98272a2c08a2"
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onLiveboardRendered={logEvent}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
