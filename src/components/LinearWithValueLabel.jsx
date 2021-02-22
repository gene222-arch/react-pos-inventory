import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';

const LinearProgressWithLabel = (props) => {
    return (
        <Box display="flex" flexDirection='column' alignItems='flex-start'>
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={props.value} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">
                    {props.label} {props.progress} of {props.maxValue}
                </Typography>
            </Box>
        </Box>
    );
}


const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });
  
const LinearWithValueLabel = ({label = 'Label', extension = '', value = 0, progress, minValue, maxValue}) => 
{
    const classes = useStyles();
    const normalize = value => ((value - parseInt(minValue)) * 100) / (parseInt(maxValue) - parseInt(minValue));

    return (
        <div className={classes.root}>
            <LinearProgressWithLabel 
                label={label} 
                progress={progress}
                value={normalize(value)} 
                minValue={minValue} 
                maxValue={maxValue}/>
        </div>
    );
}

export default LinearWithValueLabel