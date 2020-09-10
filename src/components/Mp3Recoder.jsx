import React, { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import MicNoneRoundedIcon from '@material-ui/icons/MicNoneRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import MicIcon from '@material-ui/icons/Mic';
import ReplayIcon from '@material-ui/icons/Replay';
import PauseIcon from '@material-ui/icons/Pause';


const Recorder = new MicRecorder({ bitRate: 128 });
const useStyles = makeStyles({
    root: {
        margin: "0px 10px 100px 10px",
    },
    icon: {
        margin: "0px 10px 0px 10px",
        textAlign: "center"
    }
});

function Mp3Recoder(props) {

    const classes = useStyles();
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const [url, setUrl] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);

    const [isPlayRecord, setisPlayRecord] = useState(false);

    const src = `/sound/${props.title}.wav`;
    const [audio] = useState(new Audio(src));

    const [record, setRecord] = useState(new Audio(localStorage.getItem(props.title)));
    

    useEffect(() => {
        audio.addEventListener('ended', () => setIsPlaying(false));
        record.addEventListener('ended', () => setisPlayRecord(false));
        return () => {
          audio.removeEventListener('ended', () => setIsPlaying(false));
          record.removeEventListener('ended', () => setisPlayRecord(false));
        };
      });
    

    const start = () => {
        if (isBlocked) {
          console.log("Permission Denied");
        } else {
          Recorder.start()
            .then(() => {
                setIsRecording(true);
            })
            .catch((e) => console.error(e));
        }
      };

    const stop = () => {
        Recorder.stop()
          .getMp3()
          .then(([buffer, blob]) => {
            
            //const file = new File(buffer, "test.mp3");
            const tempUrl = URL.createObjectURL(blob);
            //setUrl(URL.createObjectURL(blob)); 
            //console.log(url);
            localStorage.setItem(props.title, tempUrl);
            setRecord(new Audio(localStorage.getItem(props.title)));

            //const url = URL.createObjectURL(blob);
            //setUrl(url);
            setIsRecording(false);
          })
          .catch((e) => console.log(e));
      };
    
    function playSound(){
        setIsPlaying(true);
        audio.play();
    }
    
    function pauseSound(){
        setIsPlaying(false);
        audio.pause();
    }

    function playRecord(){
        console.log(record.getAttribute("src"));
        if (record.getAttribute("src") !== "null") {
            setisPlayRecord(true);
            record.play();
        }
    }

    function pauseRecord(){
        setisPlayRecord(false);
        record.pause();
    }
    

    return (
        <div className={classes.root}>
            
            {!isRecording 
             ? <div>
                {!isPlaying ? <PlayCircleFilledIcon fontSize="large" className={classes.icon} color="primary" onClick={playSound}/> 
                            : <PauseCircleFilledIcon fontSize="large" className={classes.icon} color="primary" onClick={pauseSound}/>   }
                <MicIcon color="secondary"  className={classes.icon} fontSize="large" onClick={start} disabled={isRecording}/> 
                {!isPlayRecord ? <ReplayIcon color="primary" className={classes.icon} fontSize="large" onClick={playRecord}/>
                               : <PauseIcon  color="primary" className={classes.icon} fontSize="large" onClick={pauseRecord}/>}
             </div>
             : <MicOffRoundedIcon color="primary" className={classes.icon} fontSize="large" onClick={stop} disabled={!isRecording}/>} 
             <div>
                {/* <audio src={url} controls={true} /> */}
             </div>  
            
        </div>
    );


}
export default Mp3Recoder;