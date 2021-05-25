import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axiosInstance from '../axios';
import {Card, CardMedia, IconButton, Typography, CardActions } from '@material-ui/core';
import Moment from 'react-moment';

// Css for material UI property 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardMedia: {
        paddingTop: '100%', // 16:9
    },
    Grid :{
        padding: '5%',
    }
  }));

  
const WelcomePAge = () => {
    const classes = useStyles();
    const [array, setArray] = useState([]);
    const [test, setTest] = useState(false);

    const statusMap = new Map();
    statusMap.set("STATUS_NONE","https://interview-images-roads.s3.amazonaws.com/STATUS_NONE.png");
    statusMap.set("STATUS_DOWNLOADED","https://interview-images-roads.s3.amazonaws.com/STATUS_DOWNLOADED.png");
    statusMap.set("STATUS_UPLOADED","https://interview-images-roads.s3.amazonaws.com/STATUS_UPLOADED.png");

    useEffect(() => {
         axiosInstance
			.get('api/getImages')
			.then(response => { 
                // if valid number, then goz to otp page
                setArray(response.data)
			})
			.catch(error => {
                console.log(`reponse: ${error}`)   
			});
    }, [test])
    return(
        // Trying to restrict the width to get an app like experience.
        <div className={classes.root}>
            <Container maxWidth="lg">
                
                <Grid container
                    spacing={3}
                    className={classes.Grid} 
                    align="center"
                    justify="center"
                >
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h4">
                            Video Files
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton>
                            <img alt = " search icon " src ="https://interview-images-roads.s3.amazonaws.com/Search.png" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton>
                            <img alt = " calender icon " src ="https://interview-images-roads.s3.amazonaws.com/Calendar.png" />
                        </IconButton>
                    </Grid>
                    {   
                        array.map((data)=>{
                            return (
                                <Grid item key={data.id} item xs={6}>
                                    <Card>
                                        <CardMedia
                                            className={classes.cardMedia} 
                                            image = {data.thumbnail}
                                            title="Image title"
                                        />
                                        <CardActions>
                                            <Grid item key={data.id} item xs={6}>
                                                <Typography noWrap>
                                                    <Moment format="YYYY/MM/DD@hh:mm:ss">
                                                        {data.dateTime}
                                                    </Moment>
                                                </Typography>
                                            </Grid>
                                            <Grid item key={data.id} item xs={6}>
                                                <img alt = " status icon " src = { statusMap.get(data.status)} /><br></br>
                                                {data.fileSize}
                                            </Grid>
                                        </CardActions>            
                                    </Card>         
                                </Grid>
                            );
                        })}
                </Grid>
            </Container>
        </div>
    );


}

export default WelcomePAge