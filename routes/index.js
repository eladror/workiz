const express = require("express");
const router = express.Router();

let queues = {};

router
    .route("/:queue_name")
    .get((req, res) => {
        let timeout = req.query.timeout ? parseInt(req.query.timeout) : 10000;

        setTimeout(() => {
            let message;
            if (queues[req.params.queue_name] && queues[req.params.queue_name].length > 0) {
                message = queues[req.params.queue_name].shift();
            } else {
                return res.status(204).send('Mo message found');
            }
            return res.json(message);
        }, timeout);
    })
    .post((req, res) => {
        if (!queues[req.params.queue_name]) {
            queues[req.params.queue_name] = [];
        }

        queues[req.params.queue_name].push(req.body);

        return res.json({message: "created"});
    });

module.exports = router;