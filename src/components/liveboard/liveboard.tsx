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
import { Layout, Button, Switch, Select, Typography } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";
import "./liveboard.css";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export const Liveboard = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const [fullHeight, setFullHeight] = React.useState(false);
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

  const applyFilter = (colName: string, value: string) => {
    console.log(colName, value);
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: colName.toLowerCase(),
        operator: "EQ",
        values: [value]
      }
    ]);
  };

  const onDoubleClick = (event: any) => {
    console.log(event);
    const point = event.data.selectedPoints[0].selectedAttributes[0];
    const colName = point.column.name;
    const value = point.value;
    applyFilter(colName, value);
  };

  const onFilterSelect = (value: string) => {
    applyFilter("state", value);
  };

  const resetFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: "state",
        operator: "EQ",
        values: []
      },
      {
        columnName: "product type",
        operator: "EQ",
        values: []
      }
    ]);
  };

  const onCustomAction = (e) => {
    logEvent(e);
    if (e.id === "only-this-viz") {
      embedRef.current.trigger(HostEvent.SetVisibleVizs, [
        "715e4613-c891-4884-be44-aa8d13701c06"
      ]);
      console.log(JSON.parse(e.data));
    }
  };
  const onToggleFullHeight = (checked: boolean) => {
    setFullHeight(checked);
  };

  const selectVizs = () => {
    embedRef.current.trigger(HostEvent.SetVisibleVizs, [
      "715e4613-c891-4884-be44-aa8d13701c06",
      "3f84d633-e325-44b2-be25-c6650e5a49cf"
    ]);
  };
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
        <Sider width={200} collapsedWidth={0} collapsible>
          <div className="sider-content">
            <Typography.Text>Filter</Typography.Text>
            <Select
              style={{ width: 140 }}
              placeholder="Select filter"
              onChange={onFilterSelect}
            >
              <Option value="michigan">Michigan</Option>
              <Option value="massachusettes">Massachusettes</Option>
              <Option value="illinois">Illinois</Option>
              <Option value="new hampsire">New Hampshire</Option>
              <Option value="maryland">Maryland</Option>
            </Select>

            <Button onClick={resetFilter}>Reset filter</Button>
            <Button onClick={reload}>Reload</Button>
            <Button onClick={selectVizs}>Selected Vizs</Button>
            <Switch
              checkedChildren="Height is Adaptive"
              unCheckedChildren="Height is static"
              onChange={onToggleFullHeight}
            />
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

        <Content style={{ overflow: "scroll", height: "720px" }}>
          {/* ThoughtSpot liveboard Embed */}
          <LiveboardEmbed
            frameParams={{
              height: 1200
            }}
            className="liveboard-content"
            ref={embedRef}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason="Pay $$$"
            fullHeight={fullHeight}
            liveboardId="795de2ca-c7b6-44bd-afea-7112550ccda6"
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onLiveboardRendered={logEvent}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
            onVizPointDoubleClick={onDoubleClick}
            runtimeFilters={[
              {
                columnName: "state",
                operator: RuntimeFilterOp.EQ,
                values: ["Michigan"]
              }
            ]}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
