import { React, useState,useEffect } from 'react';
import { PlayPause, Reset, ProgressBar } from '../components/Buttons';
import './Timer.css';

const decrementTimer = (time) => {
    return new Date(time.getTime()-1000);
}

const parseHours = (time) => {
    let op = ''+time.getHours();
    if(op.length === 1)
        op = '0'+op;
    return op;
}
const parseMin = (time) => {
    let op = ''+time.getMinutes();
    if(op.length === 1)
        op = '0'+op;
    return op;
}
const parseSec = (time) => {
    let op = ''+time.getSeconds();
    if(op.length === 1)
        op = '0'+op;
    return op;
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

const isTimeZero = (time) => {
    if(+parseHours(time) === 0 && +parseMin(time)===0 && +parseSec(time) === 0)
        return true;
    return false;
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const Timer = () => {

    const [play, setPlay] = useState(true);
    const [initial,setInitial] = useState(0);
    const [time, setTime] = useState(new Date(2020, 0, 0, 0, 0, 0, 0));
    const secondsPassed = (initial-time.getTime())/1000;
    const totalSeconds = (initial-new Date(2020, 0, 0, 0, 0, 0, 0).getTime())/1000;
    let progress = 100*secondsPassed/totalSeconds;
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    if(totalSeconds <= 0)
        progress = 0;
    useEffect(()=>{
        
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        const timer=setTimeout(() => {
            if(!play && isTimeZero(time)){
                setPlay(true);
                alert("countdown zero");
            }
            if(!play && !isTimeZero(time))
                setTime(decrementTimer(time));
            
          }, 1000);
          return () => {clearTimeout(timer);window.removeEventListener('resize', handleResize);}

    },[play,time]);

   
    return (
        <div className='timer-main'>
            <div className='top'>
            <div className='prog'>
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                    <ProgressBar progress={progress} size={Math.min(400,windowDimensions.width*0.8)} />
                </div>
                <div className='input' >
                    <input className='hour' value={parseHours(time)} onChange={(e)=>{
                        if(!isNumeric(e.target.value))
                            return;
                        let hour = e.target.value.substring(0,2);
                        if(+hour<24){
                            setInitial(time.setHours(+hour));
                            setTime(new Date(time.setHours(+hour)));
                        }
                    }} /> {'  :  '}
                    <input className='min' value={parseMin(time)} onChange={(e)=>{
                        if(!isNumeric(e.target.value))
                            return;
                        let min = e.target.value.substring(0,2);
                        if(+min<60){
                            setInitial(time.setMinutes(+min));
                            setTime(new Date(time.setMinutes(+min)));
                        }
                    }}/> {'  :  '}
                    <input className='sec' value={parseSec(time)} onChange={(e)=>{
                        if(!isNumeric(e.target.value))
                            return;
                        let sec = e.target.value.substring(0,2);
                        if(+sec<60){
                            setInitial(time.setSeconds(+sec));
                            setTime(new Date(time.setSeconds(+sec)));
                        }
                    }}/>
                </div>
                
            </div>
            </div>
            <div className='controls'>
                <div className='control'>
                    <PlayPause play={play} togglePlay={() => {
                         setPlay(!play);
                    }} />
                </div>
                <div className='control'>
                    <Reset resetInput={() => { setInitial(0);setTime(new Date(2020, 0, 0, 0, 0, 0, 0)) }} />
                </div>
            </div>

        </div>
    )
}

export default Timer;