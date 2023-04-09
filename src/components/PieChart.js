import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = svg.attr("width");
    const height = svg.attr("height");
    const radius = Math.min(width, height) / 2 - 10;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal().range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const data_ready = pie(Object.entries(data));

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    g.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "red")
      .style("stroke-width", "90px")
      .style("opacity", 0.7);

  }, [data]);

  return <svg ref={svgRef} width={300} height={300}></svg>;
};

export default PieChart;
