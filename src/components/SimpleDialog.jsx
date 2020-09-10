import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import Mp3Recoder from './Mp3Recoder';




function SimpleDialog(props) {

    const [hiddenState, setHiddenState] = useState(false);

    const useStyles = makeStyles({
        dialog: {
          textAlign: "center",
        },
        dialogTitle: {
            margin: "60px 150px 0px 150px",
            
            '& h2':{
                fontSize: "6rem",
                color: hiddenState ? "transparent" : "black"
            }
        },
        icon: {
            margin: "-30px 10px 10px 10px"
        }
      });
    
    const classes = useStyles();

    function playSound(event){
        console.log(event.target);
        const src = `/sound/${event.target.getAttribute('name')}.wav`;
        let audio = new Audio(src);
        audio.play();
    }
    
    return (
        <Dialog className={classes.dialog} onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
          <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">{props.title}</DialogTitle>
          <span>
            {/* { !hiddenState ? 
            <VisibilityOffIcon fontSize="large" className={classes.icon} onClick={() => setHiddenState(!hiddenState)} color="secondary" /> 
            : <VisibilityIcon fontSize="large" className={classes.icon} onClick={() => setHiddenState(!hiddenState)} color="secondary" />} */}
            {/* <VolumeUpOutlinedIcon fontSize="large" className={classes.icon} color="primary" onClick={playSound} name={props.title} /> */}
            <Mp3Recoder title={props.title}/>
          </span>
          
        </Dialog>
      );


}

export default SimpleDialog;