const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
    const queryText = `SELECT user_id, username, email, contact_info, type FROM profiles JOIN users ON users.id = users.id;`;
    pool.query(queryText)
        .then((result) => {
            console.log('back from the database with all users');
            res.send(result.rows);
        }).catch((error) => {
            console.log('error getting all users', error);
            res.sendStatus(500);
        })
})

router.get('/articles', (req, res) => {
    // const queryText = `SELECT articles.id, date_posted, research_date, 
    //     research_title, institution_name, institution_url, funding_source, related_articles, 
    //     admin_comment, statuses.status, research_type, username, email FROM articles
    //     JOIN statuses ON articles.status = statuses.id
    //     RIGHT JOIN research_type ON articles.research_type = research_type.id
    //     JOIN research_phase ON articles.research_phase = research_phase.id
    //     LEFT JOIN users ON user_id = users.id
    //     ORDER BY date_posted ASC;`
    const queryText = `SELECT * FROM articles`;
    pool.query(queryText)
        .then((result) => {
            console.log('back from the databse with all the approved articles', result);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error getting approved articles', error);
            res.sendStatus(500);
        })
})

module.exports = router;