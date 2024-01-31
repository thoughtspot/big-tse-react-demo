import React from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyComponent from "react-plotly.js/factory";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

export const Pivot = ({ data }) => {
  const [state, setState] = React.useState({});
  return (
    <PivotTableUI
      data={data}
      onChange={(s) => setState(s)}
      renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
      {...state}
    />
  );
};
