const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get("/getImages", (req,res) => {
    return axios.get('https://qgkpjarwfl.execute-api.us-east-1.amazonaws.com/dev/getNormalVideoFiles?offset=0&limit=6',{
        headers:{
            'x-api-key': 'jvmNAyPNr1JhiCeUlYmB2ae517p3Th0aGG6syqMb'
        }
    })
        .then(response => {
            console.log(response.data);
            res.status(200).send(response.data);
        })
        .catch(error =>{
            return res.status(error);
        })
});

module.exports = router; 