import React from 'react';
import { linkVertical } from 'd3';

const link = linkVertical()
  .x(d => d.x)
  .y(d => d.y);

class Rocket extends React.Component {
  state = {
    linePath: '',
    position: {
      source: {
        x: window.innerWidth / 4,
        y: window.innerHeight,
      },
      target: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
    }
  }

  render() {
    const { position: { source, target } } = this.state;
    const linkPath = link({
      source,
      target,
    });

    return(
      <path d={linkPath} stroke="red" fill="none" strokeWidth={3}/>
    )
  }
};

export default Rocket;