const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

function getFeed(req,res,next) {
    const user = req.user;
    const after = req.query.after || 0;
    const before = req.query.before || Date.now();
    const event = req.query.event;
    const limit = parseInt(req.query.limit);

    Event.find({
        $or: [
            { _id: { $in: user.willAttendEvents.concat(user.mayAttendEvents) } },
            { creator: { $in: user.following.concat([ user._id ]) } },
            { tags: { $in: user.interests } }
        ],
        $or: [
            { date: { $gte: after, $le: before } },
            { date: before, _id: { $gte: event} }
        ]
    })
    .limit(limit)
    .sort([['date', 1], ['_id', 1]])
    .exec()
    .then(docs => {
        return res.status(200).send(docs || []);
    })
    .catch(err => {
        return res.status(500).send(err);
    });
}

const uniqueArray = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
}

module.exports = {
    getFeed
}