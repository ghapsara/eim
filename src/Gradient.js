import React from 'react';
import { range } from 'd3';

class Gradient extends React.Component {
  render() {
    const { id, colors } = this.props;

    const colorScale = [...range(0, 100, 100/(colors.length -1)), 100].map(d => `${d}%`);
    const colorsReversed = colors.slice().reverse();

    return (
      <defs>
        <linearGradient id={`${id}-0`} x1="0%" y1="0%" x2="100%" y2="0%">
          {colors.map((d, i) => {
            const offsetColor = colorScale[i];
            const key = `${id}-0-${d}-${i}`;
            return (
              <stop
                key={key}   
                stopColor={d}
                offset={offsetColor}
              />
            )
          })}
        </linearGradient>
        <linearGradient id={`${id}-1`} x1="0%" y1="0%" x2="100%" y2="0%">
          {colorsReversed.map((d, i) => {
            const offsetColor = colorScale[i];
            const key = `${id}-1-${d}-${i}`;
            return (
              <stop
                key={key}
                stopColor={d}
                offset={offsetColor}
              />
            )
          })}
        </linearGradient>
      </defs>
    )
  }
};

export default Gradient;