import React, { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import MicNoneRoundedIcon from '@material-ui/icons/MicNoneRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const Recorder = new MicRecorder({ bitRate: 128 });
const useStyles = makeStyles({
    root: {
        margin: "0px 10px 50px 10px",
    },
    icon: {
        margin: "0px 10px 10px 10px"
    }
});

function Mp3Recoder(props) {

    const classes = useStyles();
    const [isRecording, setIsRecording] = useState(false);
    const [url, setUrl] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);

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

            //const url = URL.createObjectURL(blob);
            //setUrl(url);
            setIsRecording(false);
          })
          .catch((e) => console.log(e));
      };
    
      return (
        <div className={classes.root}>
            {!isRecording 
             ? <MicNoneRoundedIcon color="primary"  className={classes.icon} fontSize="large" onClick={start} disabled={isRecording}/> 
             : <MicOffRoundedIcon color="secondary" className={classes.icon} fontSize="large" onClick={stop} disabled={!isRecording}/>} 
             <PlayCircleOutlineIcon color="primary" className={classes.icon} fontSize="large" onClick={()=>{new Audio(localStorage.getItem(props.title)).play()}}/>
             <div>
                {/* <audio src={url} controls={true} /> */}
             </div>  
            
        </div>
      );


}
export default Mp3Recoder;