import React from 'react';
import chroma from 'chroma-js';
import * as d3 from 'd3';
import MockPath from './MockPath';
import Rocket from './Rocket';

const flareRadius = 170;
const totalNode = 25;
const totalCircle = 7;
const circleRadius = 5;

class Firework extends React.Component {
  state = {
    nodes: [],
    nodePositions: [],
    cx: null,
    cy: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.nodes.length !== prevState.nodes.length) {
      this.renderCircle();
    }
  }

  addNode = (nodes) => {
    this.setState({
      nodes: nodes
    });
  }

  setFlarePosition = ({x, y}) => {
    this.setState({
      cx: x,
      cy: y,
    });
  }

  generatePath = (x1, y1, x2, y2) => {
    return `M ${x1},${y1} L ${x2},${y2}`;
  }

  renderMockLine = () => {
    const { nodes, cx, cy } = this.state;

    return (nodes.map((d, i) => <path
        key={i}
        stroke='none'
        fill='none'
        d={this.generatePath(cx, cy, d.x,d.y)}
    />))
  }

  renderCircle = () => {
    const line = d3.select(this.flareElem)
      .selectAll('path');

    const nodePositions = line.nodes().map(node => {

      const scaleDistance = d3.scaleBand()
        .domain(d3.range(totalCircle))
        .range([0, node.getTotalLength()]);

      const positions = d3.range(totalCircle)
        .map(d => {
          const distance = scaleDistance(d);
          const { x, y } = node.getPointAtLength(distance);
          return { x, y };
        })

      return positions;
    })

    this.setState({
      nodePositions: nodePositions
    });

    const { cx, cy } = this.state;
    const colors = chroma.scale(this.props.colors).mode('lch').colors(totalCircle);

    const circleBase = d3.select(this.circleElem)
      .selectAll('g')
      .data(nodePositions)
      .enter()
      .append('g');

    const circle = circleBase
      .selectAll('circle')
      .data(d => d)
      .enter()
      .append('circle')
      .attr('fill', (d, i) => colors[i])
      .attr('r', circleRadius)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('opacity', 1)
      .transition()
      .duration(2000)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .transition()
      .duration(2000)
      .attr('opacity', 0);      

    const totalCircleNode = circle.nodes().length;

    let ci = 0
    circle.on('end', (d, i) => {
      ci += 1;
      if(ci === totalCircleNode) {
        this.props.addFirework();
      }
    })
  }

  renderFlare = () => {
    const { cx, cy } = this.state;
    const shouldRenderMockPath = this.state.nodes.length === 0;

    return (
      shouldRenderMockPath ? <MockPath
        cx={cx}
        cy={cy}
        radius={flareRadius}
        addNodePositions={this.addNode}
        totalNode={totalNode}
      />:
      <g ref={elem => this.flareElem = elem}>{this.renderMockLine()}</g>
    );
  }

  render() {    
    const { cx, cy } = this.state;
    
    const { source, target } = this.props;

    const isRocketRendered = cx !== null && cy !== null;

    return (
      <React.Fragment>
        <Rocket
          addRocket={null}
          source={source}
          target={target}
          setPosition={this.setFlarePosition}
          colors={this.props.colors}
        />
        {isRocketRendered && this.renderFlare()}
        <g ref={elem => this.circleElem = elem} />
      </React.Fragment>
    )
  }
};

export default Firework;