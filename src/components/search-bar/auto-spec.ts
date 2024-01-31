import { InsightFlow } from "visual-insights";
import { convertToRowOriented } from "../../utils/utils";

export const getAutoSpec = (columns, data) => {
  if (!columns.length) return;
  console.log(columns, data);
  const vie = new InsightFlow.VIEngine();
  const columnNames = columns.map(({ column }) => column.name);
  const { rows } = convertToRowOriented({
    columnNames,
    data
  });
  const fields = columns.map(({ column }) => {
    return {
      key: column.name,
      fid: column.name,
      name: column.name
    };
  });
  vie.setData(rows).setFields(fields);
  //debugger;
  //console.log(vie.specification());
};
