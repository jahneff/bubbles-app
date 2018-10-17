import React, { Component } from 'react';
import logo from './logo.svg';
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
            history: [{
                diameter: 0,
                x: null,
                y: null
            }],
            diameter: 0,
            x: 0,
            y: 0,
            clicked: false,
            bubbleNumber: 0,
        };
        this.t = undefined;

    }

    grow(i){
        this.setState({
            diameter: this.state.diameter + i,
        });
    }

    repeat(){
        this.grow(2);
        this.t = setTimeout(this.repeat.bind(this), 20);
    }

    onMouseUp(){
        const history = this.state.history.slice(0, this.state.bubbleNumber + 1);
        clearTimeout(this.t);
        this.setState({
            history: history.concat([{
                diameter: this.state.diameter,
                x: this.state.x,
                y: this.state.y
            }]),
            clicked: false,
            diameter: 0,
            bubbleNumber: history.length,
        });
    }

    onMouseDown(e){
        this.setState({
            clicked: true,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
        this.repeat();
    }


  render() {
       let bubbles = [];
       for (let i = 1; i <= this.state.bubbleNumber; i++){
           bubbles.push(
           <Bubble
               diameter={this.state.history[i].diameter}
               x={this.state.history[i].x}
               y={this.state.history[i].y}
               key={i}
           >
           </Bubble>
           )
       }

      return (
      <div className="Box"
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)}
      >
          {bubbles}
          {this.state.clicked ?
              <Bubble
                  diameter={this.state.diameter}
                  x={this.state.x}
                  y={this.state.y}
              >
              </Bubble> :
              null
          }
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
