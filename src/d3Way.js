import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';

const vizHeight = window.innerHeight / 2;
const vizWidth = window.innerWidth / 2 ;

class d3Way extends Component {

  circleGen(cx, cy, r) {
    return `
      M ${cx} ${cy}
      m ${-r}, 0
      a ${r},${r} 0 1,0 ${r * 2},0
      a ${r},${r} 0 1,0 ${-r * 2},0
    `;
  }

  componentDidMount() {
    const vizContainer = d3.select(this.vizRef);

    const flare = vizContainer.selectAll('.flare')
      .data(d3.range(3));
    
    const circle = flare.enter()
      .append('g')
      .attr('class', 'flare');
    // const arc = d3.arc()
    //   .innerRadius(50)
    //   .outerRadius(40)
    //   .startAngle(0)
    //   .endAngle(Math.PI * 2);

    // const shadowCircle = vizContainer.append('path')
    //   .attr('d', arc)
    //   .attr('fill', 'none')
    //   .attr('stroke', 'red')
    //   .attr('transform', `translate(${vizWidth/2}, ${vizHeight/2})`);

    // console.log(shadowCircle.node().getTotalLength());

    const circlePath = this.circleGen(vizWidth/2, vizHeight/2, 50);

    const shadowCircle = vizContainer.append('path')
      .attr('d', circlePath)
      .attr('fill', 'none')
      // .attr('stroke', 'red');

    const outerCircleScale = d3.scaleBand()
      .domain(d3.range(10))
      .range([0, shadowCircle.node().getTotalLength()]);
      // .paddingInner(10);

    const circlePoint= d3.range(10).map(d => {
      const position = outerCircleScale(d);
      const { x, y } = shadowCircle.node().getPointAtLength(position);
      return {
        x, y
      }
    });

    circle.selectAll('circle')
      .data(circlePoint)
      .enter()
      .append('circle')
      .attr('fill', 'red')
      .attr('r', (d, i) => i === 0 ? 0:5)
      .attr('cx', d => vizWidth/2) // centroid
      .attr('cy', d => vizHeight/2)
      .attr('opacity', 1)
      .transition()
      .duration(1000)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

  }

  render() {
    return (
      <div className="App">
        <svg ref={ref => this.vizRef = ref} width={vizWidth} height={vizHeight}/>
      </div>
    );
  }
}

export default d3Way;
