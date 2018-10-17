import React, { Component } from 'react';
import './App.css';

class Style {
    constructor(diameter, x, y){
        this.height = diameter;
        this.width = diameter;
        this.left = (x - (diameter/2)) + "px"; //diameter/2 keeps the sphere centered at the origin
        this.top = (y - (diameter/2)) + "px";
    }
}

class Bubble extends React.Component {
    render() {
      var r = this.props.diameter;
      var x = this.props.x;
      var y = this.props.y;
      const divStyle = new Style(r, x, y);
      return (
          <div
              className="Bubble"
              style={divStyle}
          >
          </div>
      );
  }
}

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diameter: 0,
            x: 0,
            y: 0,
            vy: 0,
            clicked: false,
        };
        this.t = undefined;
        this.u = undefined;

    }
    grow(i){
        this.setState({
            diameter: this.state.diameter + i,
        });
    }

    growWrap(){
        this.grow(1);
        this.t = setTimeout(this.growWrap.bind(this), 10);
    }

    fall(i){
        this.setState({
            y: this.state.y + i,
            vy: this.state.vy + .01,
        });
    }

    fallWrap(){
        this.fall(this.state.vy);
        this.u = setTimeout(this.fallWrap.bind(this), 1);



        if(this.state.y >= 400 - (this.state.diameter/2)){
            this.setState({
                y: 400 - (this.state.diameter/2),
                vy: -.9 * this.state.vy,
            }, function(){
                console.log("Should be negative: " + this.state.vy);
                if(Math.abs(this.state.vy) < .2){
                    clearTimeout(this.u);
                }
            });
        }

    }

    onMouseUp(){
        clearTimeout(this.t);
        this.setState({
            vy: .01,
        }, this.fallWrap);
    }

    onMouseDown(e){
        clearTimeout(this.u);
        this.setState({
            clicked: true,
            diameter: 0,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        }, this.growWrap);

    }


  render() {
        return (
          <div className="Box"
                    onMouseDown={this.onMouseDown.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}
              >
              <Bubble
                  diameter={this.state.diameter}
                  x={this.state.x}
                  y={this.state.y}
              >
              </Bubble>
              <div>
                  {this.state.x}, {this.state.y}
              </div>
          </div>
        );
  }
}

class Controller extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Box>
                    </Box>
                </header>
            </div>
        )
    }
}

export default Controller;
