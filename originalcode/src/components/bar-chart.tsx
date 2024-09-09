import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: number[];
}

function BarChart(props: ChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const data = props.data;

  useEffect(() => {
    if (data.length > 250) {
      return;
    }
    const svg = d3
      .select(ref.current)
      .attr("width", 500)
      .attr("height", 300)
      .style("background", "#f4f4f4")
      .style("margin-top", "50")
      .style("overflow", "visible");

    const xScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, 500])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data)])
      .range([300, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      // @ts-ignore
      .tickValues(xScale.domain().filter((d, i) => !(i % 10)));
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // Remove old axes
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();

    // Append new axes
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0, 300)")
      .call(xAxis);
    svg.append("g").attr("class", "y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      // @ts-ignore
      .attr("x", (_, i) => xScale(i.toString()))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => 300 - yScale(d))
      .attr("fill", "orange");
  }, [data]);

  return <svg ref={ref}></svg>;
}

export default BarChart;
