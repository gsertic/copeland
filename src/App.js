import { useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import addTreemapModule from "highcharts/modules/treemap";
import { client, useConfig, useElementData } from "@sigmacomputing/plugin";
//npm install highcharts highcharts-react-official

client.config.configureEditorPanel([
  { name: "source", type: "element" },
  { name: "dimension", type: "column", source: "source", allowMultiple: true },
  { name: "measures", type: "column", source: "source", allowMultiple: true },
]);

addTreemapModule(Highcharts);

function App() {
  const config = useConfig();
  const sigmaData = useElementData(config.source);
  const ref = useRef();
  const options = useMemo(() => {
    const dimensions = config.dimension;
    const measures = config.measures;
    if (!(dimensions && measures)) return false;

    // transform sigmaData --> treemap data
    let dataMap = [];
    const delim = "__";
    function getParent(i, j) {
      if (i > 0) {
        return getId(i - 1, j);
      } else {
        return undefined;
      }
    }
    function getId(i, j) {
      const parent = getParent(i, j);
      let id = "";
      if (parent) {
        id = parent + delim;
      }
      id += dimensions[i] + delim + sigmaData[dimensions[i]][j];
      return id;
    }
    if (sigmaData?.[dimensions[0]]) {
      for (let i = 0; i < dimensions.length; i++) {
        for (let j = 0; j < sigmaData[dimensions[i]].length; j++) {
          const name = sigmaData[dimensions[i]][j];
          const value = sigmaData[measures[i]][j];
          const id = getId(i, j);
          const parent = getParent(i, j);
          const dataPoint = {
            id,
            name,
            value,
            ...(parent && { parent }),
          };
          dataMap[id] = dataPoint;
        }
      }
      // convert object map to array
      let data = [];
      let i = 0;
      for (var key in dataMap) {
        data[i] = dataMap[key];
        i++;
      }

      const options = {
        title: {
          text: undefined,
        },
        chart: {
          height: window.innerHeight,
          backgroundColor: "transparent",
        },
        plotOptions: {
          series: {
              animation: false
          }
        },
        series: [
          {
            levels: [
              {
                level: 1,
                colorByPoint: true,
                borderWidth: 6,
                levelIsConstant: false,
                dataLabels: {
                  enabled: true,
                  align: "left",
                  verticalAlign: "top",
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                },
              },
            ],
            type: "treemap",
            allowDrillToNode: true,
            layoutAlgorithm: "squarified",
            dataLabels: {
              enabled: true,
            },
            data: data,
          },
        ],
      };
      return options;
    }
  }, [config, sigmaData]);

  return (
    <div>
      {options && <HighchartsReact highcharts={Highcharts} options={options} ref={ref} />}
    </div>
  );
}

export default App;