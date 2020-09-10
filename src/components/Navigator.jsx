import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Words from "./Words";




function Navigator(props){


    return (
        <FormGroup row>
            {Object.keys(Words).map(key => {
                return(
                    <FormControlLabel
                        control={<Checkbox checked={props.state[key]} onChange={props.handleChange} name={key} />}
                        label={key.slice(0,1).toUpperCase()+key.slice(1,)+" Words"}
                    />
                )
            })}
        </FormGroup>
    )
}

export default Navigator;