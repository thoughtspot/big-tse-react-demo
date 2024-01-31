import {
  Action,
  EmbedEvent,
  HostEvent,
  Page
} from "@thoughtspot/visual-embed-sdk";
import {
  AppEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch, Select } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export const FullApp = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const [page, setPage] = React.useState(Page.Home);
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

  const handlePathChange = (value: Page) => {
    setPage(value);
  };

  const onDialogOpen = (e) => {
    logEvent(e);
  };
  const onDialogClose = (e) => {
    logEvent(e);
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
        Full App Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200}>
          <div className="sider-content">
            <Select
              defaultValue={Page.Home}
              style={{ width: 120 }}
              onChange={handlePathChange}
            >
              <Option value={Page.Home}>Home</Option>
              <Option value={Page.Liveboards}>Liveboards</Option>
              <Option value={Page.Data}>Data</Option>
              <Option value={Page.Answers}>Answers</Option>
              <Option value={Page.Search}>Search</Option>
            </Select>
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
          <AppEmbed
            frameParams={{
              height: 600
            }}
            className="liveboard-content"
            ref={embedRef}
            pageId={page}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason="Pay $$$"
            path="/pinboards"
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
            onQueryChanged={logEvent}
            onAlert={logEvent}
            onDialogOpen={onDialogOpen}
            onDialogClose={onDialogClose}
            onRouteChange={logEvent}
            showPrimaryNavbar={true}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
