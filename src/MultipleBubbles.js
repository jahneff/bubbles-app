import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Style {
    constructor(radius, x, y){
        this.height = radius;
        this.width = radius;
        this.left = (x - (radius/2)) + "px"; //radius/2 keeps the sphere centered at the origin
        this.top = (y - (radius/2)) + "px";
    }
}

class Bubble extends React.Component {
    onMouseUp(){
        clearTimeout(this.t);
    }

  render() {
      var r = this.props.radius;
      var x = this.props.x;
      var y = this.props.y;
      const divStyle = new Style(r, x, y);
      //console.log(divStyle);
      return (
          <div
              className="Bubble"
              style={divStyle}
  //            onMouseDown={() => this.onMouseDown()}
              onMouseUp={() => this.onMouseUp()}
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
                radius: 0,
                x: null,
                y: null
            }],
            radius: 0,
            x: 0,
            y: 0,
            clicked: false,
            bubbleNumber: 0,
        };
        this.t = undefined;

    }

    shrink(i){
        this.setState({
            radius: this.state.radius + i,
        });
    }

    repeat(){
        this.shrink(2);
        this.t = setTimeout(this.repeat.bind(this), 20);
    }

    onMouseUp(){
        console.log("up");
        console.log(this.state);

        const history = this.state.history.slice(0, this.state.bubbleNumber + 1);
        clearTimeout(this.t);
        this.setState({
            history: history.concat([{
                radius: this.state.radius,
                x: this.state.x,
                y: this.state.y
            }]),
            clicked: false,
            radius: 0,
            bubbleNumber: history.length,
        });
    }
    onMouseDown(e){
        console.log("down");

        console.log(this.state);
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
               radius={this.state.history[i].radius}
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
                  radius={this.state.radius}
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
                    <Box
                        onMouseUp={() => this.onMouseUp()}
                    >
                    </Box>
                </header>
            </div>
        )
    }
}

export default Controller;
