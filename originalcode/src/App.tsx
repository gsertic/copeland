//import { useElementData } from "@sigmacomputing/plugin";
import { useMemo } from "react";
import TreeChart from "./components/treemap2";
import { client, useConfig, useElementData, useElementColumns } from "@sigmacomputing/plugin"

client.config.configureEditorPanel([
  { name: "source", type: "element" },
  { name: "column", type: "column", source: "source", allowMultiple: true },
  //{ name: "measures", type: "column", source: "source", allowMultiple: true },
]);

function App() {
  ///const config = useConfig();
  //Deprecated: const [data, setData] = useState<number[]>([]);
  //Deprecated: const [data] = useState<number[]>([]);
  ///const sigmaData = useElementData(config.source);
  ///const data = sigmaData[config["source"]];

  const config = useConfig();
  const sigmaCols = useElementColumns(config.source);
  const sigmaData = useElementData(config.source);

  const data = useMemo(() => {
    const result = [];
    if (Object.keys(sigmaData).length) {
      const entries = Object.entries(sigmaData);
      for (let i = 0; i < entries[0][1].length; i++) {
        const row: any = {};
        for (const [columnId, values] of entries) {
          if (sigmaCols[columnId] && sigmaCols[columnId].name) {
            const columnName = sigmaCols[columnId].name.toLowerCase();
            let value = values[i];
            if (columnName === 'date') {
              value = new Date(values[i]);
            }
            row[columnName] = value;
          }
        }
        result.push(row);
      }
    }
    result.sort((a, b) => (a.date > b.date) ? 1 : -1)
    return result;
  }, [sigmaCols, sigmaData])

  //console.log("Before transformation", data)
  //data.map((row) => (
  //  row = Object.values(row)
  //))
  console.log("After transformation", data)

  // handling for async loading call below
  if (!data || !data.length) {
    return (<div>Loading...</div>)
  }


  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex flex-col gap-10 pt-10">
          {<TreeChart data={data} />}
        </div>
      </main>
    </>
  );
}

export default App;
