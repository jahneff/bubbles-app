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
            history: [],
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

    fall(){
        this.setState({
            y: this.state.y + this.state.vy,
            vy: this.state.vy + .01,
        });
    }

    fallWrap(){
        this.fall();
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

    growWrap2(){
        const updateDiameter = ({diameter}) => ({diameter: diameter + 1});
        const history = this.state.history.slice(0, -1);
        const latest = this.state.history.slice(this.state.history.length - 1);

        this.setState(
            {
                history: history.concat([{
                    diameter: latest[0].diameter + 1,
                    x: latest[0].x,
                    y: latest[0].y,
                    vy: 0
                }]),
            }, function() {
            this.u = setTimeout(this.growWrap2.bind(this), 1);
        });
    }

    fall2(i){
        this.setState({
            y: this.state.y + i,
            vy: this.state.vy + .01,
        });
    }

    fallWrap2(){
        //this.fall2(this.state);
        console.log(this.state.history);
            const updateBubble = ({diameter, x, y, vy}) => ({
                diameter: diameter,
                x: x,
                y: (y > (400 - (diameter/2)))? (400 - (diameter/2)) : y + vy,
                vy: (y > (400 - (diameter/2)))? vy * -.9 : vy + 0.1
            });
            this.setState(state => ({history: state.history.map(updateBubble)}), function() {
                this.t = setTimeout(this.fallWrap2.bind(this), 1);
            });


    }

    onMouseUp(){
        console.log(this.state.history);
        const history = this.state.history.slice(0, -1);
        const latest = this.state.history.slice(this.state.history.length - 1);

        clearTimeout(this.u);
        this.setState({
            history: history.concat([{
                diameter: latest[0].diameter,
                x: latest[0].x,
                y: latest[0].y,
                vy: .01
            }]),
            vy: .01,
        }, function(){
            //this.fallWrap();
            clearTimeout(this.t);
            this.fallWrap2();
        });
    }

    onMouseDown(e){
        clearTimeout(this.u);
        const history = this.state.history.slice(0);
        console.log(this.state.history.length);
        this.setState({
            history: history.concat([{
                diameter: 0,
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
                vy: 0
            }]),
            clicked: true,
            diameter: 0,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        }, this.growWrap2);

    }


  render() {
      let bubbles = [];
      for (let i = 0; i < this.state.history.length; i++){
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
