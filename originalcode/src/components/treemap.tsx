import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: number[];
}

function TreeChart(props: ChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const data = props.data;

  useEffect(() => {
    if (data.length > 250) {
      return;
    }



  // set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
width = 445 - margin.left - margin.right,
height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(ref.current)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


// stratify the data: reformatting for d3.js
try{
var root = d3.stratify()
  .id(function(d : any) { return d.name; })   // Name of the entity (column name is name in csv)
  .parentId(function(d : any) { return d.parent; })   // Name of the parent (column name is parent in csv)
  (data);
root.sum(function(d : any) { return +d.value })   // Compute the numeric value for each entity

// Then d3.treemap computes the position of each element of the hierarchy
// The coordinates are added to the root object above
d3.treemap()
  .size([width, height])
  .padding(4)
  (root)


console.log(root.leaves())
// use this information to add rectangles:
svg
  .selectAll("rect")
  .data(root.leaves())
  .enter()
  .append("rect")
    .attr('x', function (d : any) { return d.x0; })
    .attr('y', function (d : any) { return d.y0; })
    .attr('width', function (d : any) { return d.x1 - d.x0; })
    .attr('height', function (d : any) { return d.y1 - d.y0; })
    .style("stroke", "black")
    .style("fill", "#69b3a2");

// and to add the text labels
svg
  .selectAll("text")
  .data(root.leaves())
  .enter()
  .append("text")
    .attr("x", function(d : any){ return d.x0+10})    // +10 to adjust position (more right)
    .attr("y", function(d : any){ return d.y0+20})    // +20 to adjust position (lower)
    .text(function(d : any){ return d.data.name})
    .attr("font-size", "15px")
    .attr("fill", "white")
}
catch(e){console.error(e)}
    /*const svg = d3
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
      .attr("fill", "orange");*/
  }, [data]);

  return <svg ref={ref}></svg>;
}

export default TreeChart;