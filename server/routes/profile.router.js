const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    let queryText = 'SELECT * FROM profiles WHERE user_id = $1;';
    pool.query(queryText, [req.params.id])
    .then((result) => {
        console.log('got profiles from database', result.rows);
        res.send(result.rows);   
    }).catch((error) => {
        console.log('error getting profiles from database', error);
        res.sendStatus(500);    
    })
});

router.put('/:id', (req, res) => {
    let queryText = 'UPDATE profiles SET bio = $1, contact_info = $2 WHERE id = $3;';
    pool.query(queryText, [req.body.bio, req.body.contact_info, req.params.id]).then((result) => {
        console.log('successfully updated profile');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error updating profile', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    let queryText = 'DELETE FROM profiles WHERE id = $1;';
    pool.query(queryText, [req.params.id])
    .then((result) => {
        console.log('successfully deleted profile');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting profile', error);
        res.sendStatus(500);
    })  
});

router.put(`/update/:id`, (req, res) => {
    console.log(req.params.id, '----adsfasdfasdf------', req.body.bio);
    let id = req.params.id;
    let bio = req.body.bio;
    let contactInfo = req.body.contact_info;
    let email = req.body.email;
    let queryText = 'UPDATE profiles SET bio=$1, contact_info=$2 WHERE user_id=$3';
    pool.query(queryText, [bio, contactInfo, id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})



module.exports = router;