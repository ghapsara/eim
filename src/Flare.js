import React, { Fragment } from 'react';
import MockPath from './MockPath';
import { randomUniform, range } from 'd3';
import { spring, Motion } from 'react-motion';
import Gradient from './Gradient';

const MOTION_CONFIG = {
  stiffness: 40,
  damping: 30,
};

// your best color here
const colorSchemes = [
  [],
  [],
  [],
  [],
  [],
];

const boundary = {
  left: 180,
  right: window.innerWidth - 180,
  top: 180,
  bottom: window.innerHeight - 180,
}

class Flare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodePositions: [],
      // totalNode: randomUniform(10, 30)(),
      totalNode: 50,
      cx: randomUniform(boundary.left, boundary.right)(),
      cy: randomUniform(boundary.top, boundary.bottom)(),
      radius: 180,
      colors: ["#e64f7f","#fbc0bd"],
      id: 'flare',
    }
  }

  addNodePositions = (nodes) => {
    this.setState({ nodePositions: nodes });
  }

  animationEnd = () => {
    console.log('end');
  }

  renderNodes = () => {
    const { nodePositions, cx, cy, id } = this.state;

    const flareIds = range(4);
    const flareId = flareIds.map(d => d === 0 || d === flareIds.length -1 ? '0': '1');
    
    const nodeLength = nodePositions.length;

    return (
      nodePositions.map((d, i) => {
        const iterator = i % 4 === 0 ? i + 1: i;
        const determiner = Math.floor(iterator * (4 / nodeLength));
        
        const strokeId = `url(#${id}-${flareId[determiner]})`;

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
              opacity: spring(0, {
                stiffness: 20,
                damping: 30,
              }),
            }}
            onRest={i === 0 ? this.animationEnd : null}
          >
            {({x, y, opacity}) =>
              <line
                // opacity={opacity}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                // stroke={strokeId}
                stroke="#e64f7f"
                strokeWidth={2}
              />
            }
          </Motion>
        );
      })
    );
  }

  render() {
    // props
    const { cx, cy, radius, totalNode, id, colors } = this.state;
    
    const shouldRenderMock = this.state.nodePositions.length === 0;

    return (
      <Fragment>
        <Gradient id={id} colors={colors}/>
        <g>
          {shouldRenderMock?
            <MockPath
              cx={cx}
              cy={cy}
              radius={radius}
              addNodePositions={this.addNodePositions}
              totalNode={totalNode}
            />
            :
            this.renderNodes()
          }
        </g>
      </Fragment>
    );
  }
};

export default Flare;