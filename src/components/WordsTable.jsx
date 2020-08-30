import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import SimpleDialog from './SimpleDialog';


function WordsTable(props){

    
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        card: {
          padding: theme.spacing(4),
          //padding: "32px 64px",
          fontSize: '3rem',
          textAlign: 'center',
          color: props.hiddenState ? "transparent" : theme.palette.text.primary
        },
    }));

    const classes = useStyles();

    function playSound(event){
        const src = `/sound/${event.target.getAttribute('name')}.wav`;
        let audio = new Audio(src);
        audio.play();
    }

    const [open, setOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = useState("");

    const handleClickOpen = (event) => {
        setOpen(true);
        setDialogTitle(event.target.getAttribute("name"));
      };

    return(
      <div>
        
        {/* <div className={classes.root}>
            <Grid container spacing={1}>
                {Object.keys(Words).map(key=>{
                    if (props.state[key]) {
                        return(
                            Words[key].map(word=>{
                                return (
                                    <Grid item xs={3}>
                                        <Card  name={word} className={classes.card} onClick={playSound}>{word}</Card>
                                    </Grid>
                                )
                            })
                        )
                    } else return null 
                })}
            </Grid>
        </div> */}

        <div className={classes.root}>
            <Grid container spacing={2}>
                {props.selectedWords.map(word=>{
                    return (
                        <Grid item xs={3}>
                            <Card  name={word} className={classes.card} onMouseDown={handleClickOpen} onClick={playSound}>{word}</Card>
                        </Grid>
                    )})}
            </Grid>
        </div>

        <SimpleDialog open={open} onClose={() => setOpen(false)} title={dialogTitle} />

      </div>
    )

}

export default WordsTable;