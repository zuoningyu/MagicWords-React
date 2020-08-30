import React, { useState } from 'react';
import Navigator from './Navigator';
import WordsTable from './WordsTable';
import Words from "./Words";
import { Button, makeStyles } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    
    navigator: {
        padding: '8px 16px'
    },
    functionBar: {
        padding: '8px 8px',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    table: {
        padding: '8px 16px'
    }

  }));

function Main(){

    const classes = useStyles();
    const [selectedWords, setSelectedWords] = useState(Words.golden);
    const [hiddenState, setHiddenState] = useState(false);

    const [state, setState] = React.useState({
        golden: true,
        blue: false,
        red: false,
      });

    function handleChange (event){
        const { name, checked } = event.target;
        setState({ ...state, [name]: checked });
        if (checked) {
            setSelectedWords(selectedWords.concat(Words[name]))
        } else {
            setSelectedWords(selectedWords.filter(value => !Words[name].includes(value)))
        }
    }
    
    function randomWords(){
        setSelectedWords(selectedWords.slice().sort(() => Math.random() - 0.5));
    }

    function hideWords(){
        setHiddenState(!hiddenState);
    }

    
    return (
      <div>
        <div className={classes.navigator}>
            <Navigator handleChange={handleChange} state={state}/>
        </div>

        <div className={classes.functionBar}>
            <Button variant="contained" color="primary" onClick={randomWords}>Random</Button>
        
            <Button variant="contained" color="secondary" onClick={hideWords}>{hiddenState ? "Show" : "Hide"}</Button>
        </div>
        
        <div className={classes.table}>
            <WordsTable selectedWords={selectedWords} hiddenState={hiddenState} />
        </div>
      </div>
    )
        
}

export default Main;