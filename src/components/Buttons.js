import {React} from 'react';
import './Buttons.css';
import {FiRotateCcw} from "react-icons/fi";
import CircularProgress from '@material-ui/core/CircularProgress';

const ProgressBar = ({progress,size}) => {
    return (<>
        <CircularProgress size={size} thickness={0.35} variant="determinate" color="secondary" value={progress}/>
        <CircularProgress size={size} thickness={0.25} variant="determinate" style={{color:'white' ,marginLeft:-1*size,opacity:'5%'}} value={100} />
    </>);
}

const PlayPause = ({play,togglePlay}) => {
    return (
        <div className='button-outer' style={{backgroundColor:'black',padding:'5px',cursor:'pointer'}}  onClick={()=>{togglePlay()}}>
            <div className={play?'play':'pause'}></div>
        </div>
    )
}

const Reset = ({resetInput}) => {
    
    return (
        <div className='button-outer' onClick={()=>{resetInput()}}>
            <FiRotateCcw size={'100px'} style={{cursor:'pointer'}} />
        </div>
        
    )
}

export {PlayPause,Reset,ProgressBar};