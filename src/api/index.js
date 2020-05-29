const { Router } = require('express');
const db = require('../api/db');
const router = Router();

router.get('api/user', (req, res) => {
    res.send(db.getList("users"))
});

router.get('/api/user/:id', (req, res) => {
    res.send(db.findObject("users", req.params.id))
});

module.exports = router