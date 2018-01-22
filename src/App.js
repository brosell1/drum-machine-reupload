import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Bass from './audio/Bass.wav';
import Clap from './audio/Clap.wav';
import HiHat_Closed from './audio/HiHat_Closed.wav';
import HiHat_Open from './audio/HiHat_Open.wav';
import Snare from './audio/Snare.wav';
import Note_Low from './audio/Note_Low.wav';
import Tom_Hi from './audio/Tom_Hi.wav';
import Tom_Low from './audio/Tom_Low.wav';

const CHANGE_BAR = [8, 12, 16];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      beats: 8,
      grid: [],
      ms: 250,
      bpmField: 120,
    }
  };

  instruments = [
    this.tom_hi = new Audio(Tom_Hi),
    this.tom_low = new Audio(Tom_Low),
    this.clap = new Audio(Clap),
    this.note_low = new Audio(Note_Low),
    this.snare = new Audio(Snare),
    this.hihat_open = new Audio(HiHat_Open),
    this.hihat_closed = new Audio(HiHat_Closed),
    this.bass = new Audio(Bass),
  ]

  componentDidMount() {
    this.changeGridLength(CHANGE_BAR[0]);
  };

  handleChange = (event) => {
    this.setState({bpmField: document.getElementById("bpm").value});
  }

  handleSubmit(event) {
    this.setState({ms: 30000 / this.state.bpmField})
  }

  changeGridLength = (beats) => {
    this.setState(() => {
      return({
        beats: beats,
        grid: Array(8).fill(Array(beats).fill({val: 0, focus:false})),
      })
    })
  }

  incr = (row, col) => {
    this.setState(prevState => ({
        grid: [...prevState.grid.slice(0, row), [...prevState.grid[row].slice(0, col), {val: prevState.grid[row][col].val + 1, focus: prevState.grid[row][col].focus}, ...prevState.grid[row].slice(col + 1)], ...prevState.grid.slice(row + 1)]
      })
    )
  };

  wait = time => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

  start = () => {
    let iterations = 0;
    let b = this.state.beats;
    if(iterations < b || this.state.loop === true) {
      this.cycle(iterations % b)
    }
  };

  playSound = (item, index, iterations, i) => {
    if(item.val % 4 === 1 && index === iterations % this.state.beats) {
      this.instruments[i].pause();
      this.instruments[i].currentTime = 0;
      this.instruments[i].play();
    };
    if(item.val % 4 === 2 && index === iterations % this.state.beats) {
      this.instruments[i].pause();
      this.instruments[i].currentTime = 0;
      this.instruments[i].play();
      this.wait(this.state.ms/2).then(() => {
        this.instruments[i].pause();
        this.instruments[i].currentTime = 0;
        this.instruments[i].play();
      });
    };
    if(item.val % 4 === 3 && index === iterations % this.state.beats) {
      this.wait(this.state.ms/2).then(() => {
        this.instruments[i].pause();
        this.instruments[i].currentTime = 0;
        this.instruments[i].play();
      });
    };
  };

  cycle = iterations => {
    let b = this.state.beats;
    let arr = this.state.grid;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].map(
        (item, index) => {
          this.playSound(item, index, iterations, i)
          return {
            val: item.val,
            focus: iterations % b === index
          }
        }
      )
    }
    this.setState(() => {return ({grid: [...arr]})})
    console.log(iterations++);
    if(iterations < b || this.state.loop === true) {
      this.wait(this.state.ms).then(() => this.cycle(iterations % b))
    }
  };

  loop = () => {
    this.setState((prevState) => ({
      loop: !prevState.loop
    })
  )};

  render() {

    let style = {
      '1': { border: "2px solid yellow" },
      '2': { border: "1px solid grey" }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My React Drum Machine</h1>
        </header>
        <input type="number" id="bpm" value={this.state.bpmField} onChange={() => this.handleChange()}/><button className="actionButton" onClick={() => this.handleSubmit()}>BPM</button><br />
        <button className="actionButton" onClick={() => this.start()}>Start</button>
        <button className="actionButton" onClick={() => this.loop()}>{this.state.loop ? "Stop" : "Loop"}</button>
        <button className="actionButton" onClick={this.state.beats === CHANGE_BAR[0] ? () => this.changeGridLength(CHANGE_BAR[1]) : this.state.beats === CHANGE_BAR[1] ? () => this.changeGridLength(CHANGE_BAR[2]) : this.changeGridLength(CHANGE_BAR[0])}>Change</button>
        <div>
          {this.state.grid.map((row, yIndex) => {
            return <div key={yIndex}>
              {row.map((item, xIndex) => <button
                key={xIndex}
                className={item.val % 4 === 1 ? 'one button' : item.val % 4 === 2 ? 'two button' : item.val % 4 === 3 ? 'three button' : 'off button'}
                onClick={() => this.incr(yIndex, xIndex)}
                style={style[item.focus === true ? '1' : '2']}
                >
              </button>)}
            </div>}
          )}
        </div>
      </div>
    );
  }
}

export default App;
