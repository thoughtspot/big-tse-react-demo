import {
  AccessLevelEnum,
  Client,
  DataController,
  DEFAULT_CONFIGURATION,
  FormatType1Enum,
  MetadataController,
  SessionController,
  Type10Enum
} from "@thoughtspot/rest-api-sdk";
import { Layout, Button, Select } from "antd";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import "@inovua/reactdatagrid-enterprise/index.css";
import React from "react";
import {
  useEventLogger,
  actionSet,
  convertToRowOriented
} from "../../utils/utils";
import { useAPIClient } from "../../api-client";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export const Api = () => {
  const logEvent = useEventLogger();
  const { metadataController, dataController } = useAPIClient();
  const [options, setOptions] = React.useState([
    {
      name: "loading ...",
      id: ""
    }
  ]);
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const populateAnswers = async () => {
    setLoading(true);
    const answers: any = await metadataController?.searchObjectHeader({
      type: Type10Enum.ANSWER
    });
    setLoading(false);
    if (answers) {
      setOptions(
        answers?.result.headers.map((a) => ({ name: a.name, id: a.id }))
      );
    }
  };
  React.useEffect(() => {
    populateAnswers();
  }, [metadataController]);

  const loadAnswer = async (id: string) => {
    setLoading(true);
    const { result } = await dataController?.answerData({
      id: id
    });
    const { rows, columns } = convertToRowOriented(result);
    setRows(rows);
    setColumns(columns);
    setLoading(false);
  };

  return (
    <Layout>
      <Header>
        API Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200}>
          <div className="sider-content">
            <div>Select answer</div>
            <Select style={{ width: 120 }} onChange={loadAnswer}>
              {options.map((option) => (
                <Option value={option.id}>{option.name}</Option>
              ))}
            </Select>
          </div>
        </Sider>

        <Content>
          <ReactDataGrid
            dataSource={rows}
            columns={columns}
            enableColumnAutosize
            loading={loading}
            rowHeight={40}
            style={{ minHeight: 550 }}
          ></ReactDataGrid>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
