var express = require('express');
var Promise = require('bluebird');
var moment = require('moment');

//Model
var Story = require('../models/Story');
var router = express.Router();

var findTopStory = Promise.promisify(Story.findTop);
var findOne = Promise.promisify(Story.findOne);


/* GET home page. */
router.get('/:slug/:id', (req, res, next) => {
  Promise.all([findOne(req.params.id), findTopStory(7)])
    .then(results => {
      var story = results[0];
      if (story.length === 0){
        next();
        return false;
      }
      res.render('layout/story', {
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        updatedAt: moment(story.published).utc().format('YYYY-MM-DD HH:mm:ss'),
        story: story[0],
        listTagStory: results[1],
      })
    });
  
});

module.exports = router;
