import React from 'react';
import { range, randomUniform } from 'd3';
import RocketFlare from './RocketFlare';
import Firework from './Firework';
import Spiral from './Spiral';
import Message from './Message';

const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;

const wrapperStyle = {
  overflow: 'hidden',
  position: 'fixed',
};

const colors = [
  '#f09d19', '#ffdb9b',
  '#c48294', '#4f6db2', 
  '#7b1d31', '#e7e7e7',
  '#dc8249', '#68c8af',
  '#d92192', '#0123a7',
  '#fb1243', '#74d2a8', 
  '#6f8df8', '#d9bfce', 
  '#ff0621', '#f69202',
];

class App extends React.Component {
  state = {
    rockets: [0],
  }

  addRocket = () => {
    setTimeout(() => {
      this.setState({
        rockets: [...this.state.rockets, this.state.rockets.length]
      })
    }, 5000)
  }

  addFirework = () => {
    this.setState({
      rockets: [...this.state.rockets, this.state.rockets.length]
    })
  }

  generateColor = () => {
    const colorRange = range(Math.ceil(randomUniform(1, 4)()));
    return colorRange.map(d => {
      const key = Math.ceil(randomUniform(0, colors.length -1)());
      return colors[key];
    })
  }

  renderFireWorks = (key, color, { source, target }) => {
    return (
      <Firework 
        key={key}
        colors={color}
        source={source}
        target={target}
        addFirework={this.addFirework}
      />
    )
  }

  renderRocketFlare = (key, color, { source, target }) => {
    return (
      <RocketFlare 
        key={key} 
        colors={color}
        source={source}
        target={target}
        addRocket={this.addRocket}
      />
    );
  }

  renderSpiral = (key, color, {source, target}) => {
    return (
      <Spiral
        key={key}
        colors={color}
        source={source}
        target={target}
        addSpiral={this.addFirework}
      />
    );
  }

  render() {
    const color = this.generateColor();

    const elementType = [
      this.renderFireWorks,
      this.renderRocketFlare,
      this.renderSpiral,
    ];
    
    const source = {
      x: window.innerWidth / 2,
      y: window.innerHeight,
    };

    const target = {
      x: window.innerWidth / 2,      
      y: window.innerHeight * 0.4,
    };

    const position = { source, target };
    
    return (
      <div style={wrapperStyle}>
        <svg width={svgWidth} height={svgHeight}>
          <rect x={0} y={0} width={svgWidth} height={svgHeight} fill="#272631" />
          {this.state.rockets.map(d => {
            const lastIndex = d + 1 === this.state.rockets.length;
            const elementKey = d % 3;
            return lastIndex && elementType[elementKey](d, color, position);
          })}
        </svg>
        <Message />
      </div>
    );
  }
};

export default App;