import React from 'react';
import * as d3 from 'd3';


const flyDuration = 2000;
const vanishDuration = 1000;

const link = d3.linkVertical()
  .x(d => d.x)
  .y(d => d.y);

class Rocket extends React.Component {
  parsePosition = (positionString) => {
    const formatted = positionString.replace('translate', '').replace('(','').replace(')', '').replace(' ', '');
    const [x, y] = formatted.split(',');

    return {
      x: parseInt(x, 10), 
      y: parseInt(y, 10),
    };
  }

  componentDidMount() {
    const rocketNodeColor = this.props.colors[0];

    if (this.linkElem !== null ) {
      d3.select(this.element)
        .append('path')
        .attr('class', 'line-path')
        .attr('fill', 'none')
        .attr('stroke', rocketNodeColor)
        .attr('stroke-width', 2)
        .attr('d', () => d3.select(this.linkElem).attr('d'))
        .attr('stroke-dasharray', `${this.linkElem.getTotalLength()} ${this.linkElem.getTotalLength()}`)
        .attr('stroke-dashoffset', this.linkElem.getTotalLength())
        .transition()
        .duration(flyDuration)
        .attr('stroke-dashoffset', 0);
        
      d3.select(this.element)
        .append('circle')
        .attr('r', 10)
        .attr('fill', rocketNodeColor)
        .transition()
        .duration(flyDuration)
        .attrTween('transform', () => {
          const linkNodeLength = this.linkElem.getTotalLength();

          return (d) => {
            const p = this.linkElem.getPointAtLength(d * linkNodeLength);
            return `translate(${p.x}, ${p.y})`;
          };
        })
        .on('end', () => {
          const circle = d3.select(this.element)
            .select('circle');

          const position = this.parsePosition(circle.attr('transform'));

          this.props.setPosition(position);
          
          if(this.props.addRocket) {
            this.props.addRocket();
          }
          
          circle
            .attr('opacity', 1)
            .transition()
            .duration(vanishDuration)
            .attr('opacity', 0);

          d3.select(this.element)
            .select('.line-path')
            .attr('opacity', 1)
            .transition()
            .duration(vanishDuration)
            .attr('opacity', 0);
        }); 
      }
  }

  render() {
    const { source, target } = this.props;
    const linkPath = link({
      source,
      target,
    });

    return(
      <g ref={elem => this.element = elem}>
        <path ref={elem => this.linkElem = elem} d={linkPath} stroke="none" fill="none" />
      </g>
    )
  }
};

export default Rocket;