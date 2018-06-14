import React from 'react';
import MockPath from './MockPath';
import { range } from 'd3';
import { spring, Motion } from 'react-motion';

const MOTION_CONFIG = {
  stiffness: 40,
  damping: 30,
};

const OPACITY_CONFIG = {
  stiffness: 15,
  damping: 30,
};

const totalNode = 50;
const flareRadius = 180;

class Flare extends React.Component {
  state = {
    nodePositions: []
  }

  addNodePositions = (nodes) => {
    this.setState({ nodePositions: nodes });
  }

  renderNodes = () => {
    const { cx, cy, gradientId } = this.props;
    const { nodePositions } = this.state;

    const flareIds = range(4);
    const flareId = flareIds.map(d => d === 0 || d === flareIds.length -1 ? '0': '1');
    
    const nodeLength = nodePositions.length;

    return (
      nodePositions.map((d, i) => {
        const iterator = i % 4 === 0 ? i + 1: i;
        const determiner = Math.floor(iterator * (4 / nodeLength));
        
        const strokeId = `url(#${gradientId}-${flareId[determiner]})`;

        return (
          <Motion
            key={`${i}`}
            defaultStyle={{
              x: cx, 
              y: cy,
              opacity: 1,
            }}
            style={{
              x: spring(d.x, MOTION_CONFIG), 
              y: spring(d.y, MOTION_CONFIG),
              opacity: spring(0, OPACITY_CONFIG),
            }}
          >
            {({x, y, opacity}) =>
              <line
                opacity={opacity}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={strokeId}
                strokeWidth={2}
              />
            }
          </Motion>
        );
      })
    );
  }

  render() {
    const { cx, cy } = this.props;

    const shouldRenderMock = this.state.nodePositions.length === 0;

    return (
      <g ref={elem => this.nodeWrapper = elem}>
        {shouldRenderMock?
          <MockPath
            cx={cx}
            cy={cy}
            radius={flareRadius}
            addNodePositions={this.addNodePositions}
            totalNode={totalNode}
          />
          :
          this.renderNodes()
        }
      </g>
    );
  }
};

export default Flare;