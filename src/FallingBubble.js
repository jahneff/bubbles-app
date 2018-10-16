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
          >
          </div>
      );
  }
}

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 0,
            x: 0,
            y: 0,
            clicked: false,
        };
        this.t = undefined;
        this.u = undefined;

    }

    shrink(i){
        this.setState({
            radius: this.state.radius + i,
        });
    }

    fall(i){
        this.setState({
            y: this.state.y + i,
        });
    }

    shrinkWrap(){
        this.shrink(2);
        this.t = setTimeout(this.shrinkWrap.bind(this), 20);
    }

    fallWrap(){
        this.fall(1);
        this.u = setTimeout(this.fallWrap.bind(this), 5);
        if(this.state.y > 400){
            clearTimeout(this.u);

        }
    }

    onMouseUp(){
        clearTimeout(this.t);
        this.setState({}, this.fallWrap.bind(this));
    }

    onMouseDown(e){
        clearTimeout(this.u);
        console.log(this.state);
        this.setState({
            clicked: true,
            radius: 0,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        }, this.shrinkWrap);
    }


  render() {

       let bubbles = [];

      return (
      <div className="Box"
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)}
      >
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
