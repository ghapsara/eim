import React from 'react';
import * as d3 from 'd3';
import Gradient from './Gradient';
import Rocket from './Rocket';

const r = 170;
const numSpirals = 8;

const theta = (r) => {
  return numSpirals * Math.PI * r;
}

const start = 0; 
const end = 2.25;

const radius = d3.scaleLinear()
  .domain([start, end])
  .range([0, r]);

const points = d3.range(start, end + 0.001, (end - start) / 1000)

const spiralLinePath = d3.radialLine()
  .curve(d3.curveCardinal)
  .angle(theta)
  .radius(radius)(points);

const gradientId = 'spiral';

class Spiral extends React.Component {
  state = {
    cx: null,
    cy: null,
  }

  setFlarePosition = ({x, y}) => {
    this.setState({
      cx: x,
      cy: y,
    });
  }

  renderSpiralElem() {
    const {cx, cy} = this.state;

    const transformPosition = `translate(${cx},${cy})`;

    d3.select(this.spiralElem)
      .attr('transform', transformPosition)
      .attr('opacity', 1)
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('stroke', `url(#${gradientId}-0)`)
      .attr('d', spiralLinePath)
      .attr('stroke-dasharray', `${this.mockSpiral.getTotalLength()} ${this.mockSpiral.getTotalLength()}`)
      .attr('stroke-dashoffset', this.mockSpiral.getTotalLength())
      .transition()
      .duration(4000)
      .attr('stroke-dashoffset', 0)
      .transition()
      .duration(2000)
      .attr('opacity', 0)
      .on('end', () => {
        this.props.addSpiral();
      });
  }

  render() {
    const { cx, cy } = this.state;
    const { source, target, colors } = this.props;

    const isRocketRendered = cx !== null && cy !== null;

    return (
      <React.Fragment>
        <Gradient
          id={gradientId}
          colors={this.props.colors}
        />
        <Rocket
          addRocket={null}
          source={source}
          target={target}
          setPosition={this.setFlarePosition}
          colors={colors}
        />
        <path 
          ref={elem => this.mockSpiral = elem}
          d={spiralLinePath}
          stroke='none'
          fill='none'
        />
        <path ref={elem => this.spiralElem = elem} />
        {isRocketRendered &&
          this.renderSpiralElem()
        }
      </React.Fragment>
    );
  }
};

export default Spiral;