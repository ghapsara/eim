import React from 'react';
import Rocket from './Rocket';
import Flare from './Flare';
import Gradient from './Gradient';

const gradientId = 'rocket-flare';

class RocketFlare extends React.Component {
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

  render() {
    const { cx, cy } = this.state;
    
    const isRocketRendered = cx !== null && cy !== null;

    const { colors, source, target } = this.props;

    return(
      <React.Fragment>
        <Gradient
          id={gradientId}
          colors={colors}
        />
        <Rocket
          addRocket={this.props.addRocket}
          source={source}
          target={target}
          setPosition={this.setFlarePosition}
          colors={colors}
        />
        {isRocketRendered &&
          <Flare 
            cx={cx}
            cy={cy}
            gradientId={gradientId}
          />
        }
      </React.Fragment>
    )
  }
};

export default RocketFlare;