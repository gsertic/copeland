import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: number[];
}

function TreeChart(props: ChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  props
  //const data = [300, 200, 150, 100, 50].sort((a, b) => b - a)


  const data = props.data.sort((a, b) => b - a);
  const sum = data.reduce((s, i) => s + i, 0);

  useEffect(() => {
    //if (data.length > 250) {
    //  return;
    //}

    const svg = d3
      .select(ref.current)
      .attr("width", 500)
      .attr("height", 300)
      .style("background", "#f4f4f4")
      .style("margin-top", "50")
      .style("overflow", "visible");

    const width = parseInt(svg.attr('width'));
    const height = parseInt(svg.attr('height'));
    //const unit = width * height / sum;
    const bounds = { top: 0, left: 0, right: width, bottom: height };

    let weightLeft = sum;
    let x, y, w, h;

    data.forEach(d => {
      const hSpace = bounds.right - bounds.left;
      const vSpace = bounds.bottom - bounds.top;
      //const area = d / unit;
      x = bounds.left;
      y = bounds.top;
      if (hSpace > vSpace) {
        w = (d / weightLeft) * hSpace;
        h = vSpace;
        bounds.left = x + w;
      }
      else {
        w = hSpace;
        h = (d / weightLeft) * vSpace;
        bounds.top = y + h;
      }
      weightLeft -= d;
      svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', w)
        .attr('height', h)
        .style('fill', 'blue')
        .style('stroke', 'white')
        .style('stroke-width', 3)
      svg.append('text')
        .text(d)
        .attr('x', x + w / 2)
        .attr('y', y + h / 2)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('fill', 'white')
    });
  }, [data]);

  return <svg ref={ref}></svg>;
}

export default TreeChart;