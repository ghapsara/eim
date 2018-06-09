import React from 'react';
import { range } from 'd3';
import Rocket from './Rocket';
import Flare from './Flare';

const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flareCount: 1,
    };
  }

  componentDidMount() {
    // d3 timer
    // generate flare 
    // clear dom at desired tick
    // let tick = 0;
    // setInterval(() => {
    //   tick += 1;

    //   this.setState({ flareCount: this.state.flareCount + 1 });
      
    //   if (tick % 5 === 0) {
    //     this.setState({ flareCount: 0 });
    //   };

    // }, 2000);
    // using line horizontal for path tweening AWESOME
  }

  render() {
    const { flareCount } = this.state;
    return (
      <svg width={svgWidth} height={svgHeight}>
        <rect x={0} y={0} width={svgWidth} height={svgHeight} fill="black" />
        {/* {range(flareCount).map((d) => 
          <Flare 
            key={d}
            scheme={d}
          />
        )} */}
        <Rocket />
      </svg>
    );
  }
};

export default App;