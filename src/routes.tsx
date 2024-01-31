import { Home } from "./components/home/home";
import { Liveboard } from "./components/liveboard/liveboard";
import { Viz } from "./components/viz/viz";
import { TableViz } from "./components/viz/table-viz";
import { Search } from "./components/search/search";
import { FullApp } from "./components/full/full";
import { Api } from "./components/api/api";
import { SearchBar } from "./components/search-bar/search-bar";
import { MultiViz } from "./components/multi-viz/multi-viz";
import { Liveboard as PrerenderedLiveboard } from "./components/prerender/prerender";

export const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/search-bar",
    element: <SearchBar />
  },
  {
    path: "/liveboard",
    element: <Liveboard />
  },
  {
    path: "/viz",
    element: <Viz />
  },
  {
    path: "/viz-table",
    element: <TableViz />
  },
  {
    path: "/full",
    element: <FullApp />
  },
  {
    path: "/multi-viz",
    element: <MultiViz />
  },
  {
    path: "/prerender",
    element: <PrerenderedLiveboard />
  }
];
