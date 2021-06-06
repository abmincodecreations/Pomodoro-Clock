
import './App.css';
import React from 'react';
import BeepAudio from './audio/Beepaudio.wav'

const song = new Audio(BeepAudio);

const SetTimer=(props)=>(
  <div className="timer-container">
    <h3>{props.tittle}</h3>
    <div className="flex actions-wrpper regultors">
      <button onClick={props.handleDecrease}><i className="fas fa-minus"></i></button>
      <span>{props.count}</span>
      <button onClick={props.handleIncrease} ><i className="fas fa-plus"></i></button>
    </div>
  </div>
  );

class App extends React.Component{
  constructor(props) {
    super(props);
    this.loop=undefined;
    this.state = {
      breakCount:5,
      sessionCount:25,
      clockCount:25*60,
      currentTimer:'Session',
      isplaying:false,
      loop: undefined,
      reset:false,
    };
  }

handlePlayPause=()=>{
  const {isplaying}=this.state;
  if(isplaying){
    clearInterval(this.loop);
    this.setState({
      isplaying:false,
    });
  }else{
    this.setState({
      isplaying:true,
    });
    this.loop=setInterval(() => {
      const {clockCount , currentTimer , breakCount,  sessionCount }=this.state;
      
      if(clockCount===0){
        this.setState({
         currentTimer: (currentTimer==='Session')? 'Break' :'Session',
         clockCount : (currentTimer==='Session')?(breakCount*60):(sessionCount*60)
        });
       
        song.play();
      }else{
        this.setState({
          clockCount:clockCount-1
         });
      }
    },1000);
  }
}
handleReset = ()=>{
    this.setState({
      breakCount:5,
      sessionCount:25,
      clockCount:25*60,
      currentTimer:'Session',
      isplaying:false,
      reset: true,
    });

    setInterval(() => {
      this.setState({
        reset: false,
      });
    },4000);
     song.pause();
     song.currentTime=0;

  clearInterval(this.loop);
}
handleBreakDecrease=()=>{
  const {breakCount , isplaying ,currentTimer}=this.state;
  if(breakCount>1){
    if(!isplaying && currentTimer==='Break'){
      this.setState({
        breakCount: breakCount-1,
        clockCount: (breakCount-1)*60
      });
    }
    else{
      this.setState({
        breakCount: breakCount-1
      });
    }
  }
}

handleBreakIncrease=()=>{
  const { breakCount ,currentTimer ,isplaying }=this.state;
  if(breakCount<60){
    if(!isplaying && currentTimer==='Break'){
      this.setState({
        breakCount: breakCount+1,
        clockCount: (breakCount+1)*60
      });
    }else{
      this.setState({
        breakCount: breakCount+1,
      });
    }
 }
}
handleSessionDecrease=()=>{
  const {sessionCount, isplaying ,currentTimer}=this.state;
  if(sessionCount>1){
    if(!isplaying && currentTimer==='Session'){
      this.setState({
        sessionCount: sessionCount-1,
        clockCount: (sessionCount-1)*60
      });
    }
 }
}

handleSessionIncrease=()=>{
  const {sessionCount, isplaying ,currentTimer}=this.state;
  if(sessionCount<60){
    if(!isplaying && currentTimer==='Session'){
      this.setState({
        sessionCount: sessionCount+1,
        clockCount: (sessionCount+1)*60
      });
    }
 }
}

componentWillUnmount=()=>{
  clearInterval(this.loop);
}

convertTime=(count)=>{
  const minutes= Math.floor(count/60);
  let seconds=count%60;
  seconds =seconds < 10 ? ('0'+seconds): seconds;
  return `${minutes}:${seconds}`;
}
  render(){
    const { 
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isplaying
     }=this.state;

    const breakProps ={
      tittle:'Break Time',
      count:breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease
    };
    const sessionProps ={
      tittle:'Session Time',
      count:sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease
    };

    return (
      <div>
      <a  href="https://abmincodecreations.github.io/"><button class="nav-btn" ><i class="fas fa-home">Home</i></button></a>
      <div className="clock">
        <div className="flex flex-responsive">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-box-continer">
          <p><emphasize>Pomodoro</emphasize> <emphasize>Clock</emphasize></p>
          <p>{currentTimer}</p>
          <span class="timer">{this.convertTime(clockCount)}</span>
          <div className="flex">
          <button onClick={this.handlePlayPause}><i className={`fas fa-${ isplaying ? 'pause' :'play'}`}></i></button>
          <button onClick={this.handleReset} ><i className={`fas fa-sync ${this.state.reset? 'spinMovement' :' '}  `}></i></button>
          </div>
        </div>
      </div>
         <div className='footer-bar mt-4'>
            <p className="footertext">
              <a className="no-decoration" href="https://abmincodecreations.github.io/">
                &copy;Designed and developed By Abhishek Mishra
              </a>
             </p>
          </div>
      </div>
    );
  }
  
}


export default App;
