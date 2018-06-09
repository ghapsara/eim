import React from 'react';
import { range, scaleBand } from 'd3';

class MockPath extends React.Component {
  componentDidMount() {
    const { totalNode } = this.props;

    const nodeScale = scaleBand()
      .domain(range(totalNode))
      .range([0, this.pathRef.getTotalLength()])
      .paddingInner(10);

    const nodes = range(totalNode).map(d => {
      const position = nodeScale(d);
      const {
        x,
        y
      } = this.pathRef.getPointAtLength(position);

      return {
        x,
        y
      }
    });

    const removedCentroidNode = nodes.slice(1, nodes.length);

    this.props.addNodePositions(removedCentroidNode);
  }

  circleGen = (cx, cy, r) => {
    return `
      M ${cx} ${cy}
      m ${-r}, 0
      a ${r},${r} 0 1,0 ${r * 2},0
      a ${r},${r} 0 1,0 ${-r * 2},0
    `;
  }

  render() {
    const {
      cx,
      cy,
      radius
    } = this.props;

    const circlePath = this.circleGen(cx, cy, radius);

    return ( 
      <path 
        ref={elem => this.pathRef = elem}
        d={circlePath}
        fill="none"
        stroke="none" 
      />
    );
  }
};

export default MockPath;