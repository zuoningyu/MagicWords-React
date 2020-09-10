import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Button, CardContent, Typography, CardActions } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import SimpleDialog from './SimpleDialog';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';


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
          color: theme.palette.text.primary
        },
        word: {
            fontSize: '3rem',
            textAlign: 'center',
        },
        volume: {
            textAlign: "end"
        }
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
        <div className={classes.root}>
            <Grid container spacing={2}>
                {props.selectedWords.map(word=>{
                    return (
                        <Grid item xs={3}>
                            <Card  name={word} className={classes.card} onClick={handleClickOpen}>
                                {/* <CardContent> */}
                                    {/* <Typography className={classes.volume}>
                                        <VolumeUpOutlinedIcon fontSize="large" name={word} className={classes.icon} onClick={playSound}/>
                                    </Typography> */}
                                    {/* <Typography className={classes.word} onClick={handleClickOpen}> */}
                                        {word}
                                    {/* </Typography> */}
                                {/* </CardContent> */}
                                {/* <CardActions>
                                    <AspectRatioIcon onClick={handleClickOpen}/>
                                </CardActions> */}
                            </Card>
                        </Grid>
                    )})}
            </Grid>
        </div>

        <SimpleDialog open={open} onClose={() => setOpen(false)} title={dialogTitle} />
      </div>
    )

}

export default WordsTable;