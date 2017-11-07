var express = require('express');
var Promise = require('bluebird');
var {convertDateTime, convertTimeAgo} = require('../common/utils');

//Model
var Story = require('../models/Story');
var Video = require('../models/Video');
var router = express.Router();

var findTopStory = Promise.promisify(Story.findTop);
var findTopVideo = Promise.promisify(Video.findTop);
var findOne = Promise.promisify(Story.findOne);


/* GET home page. */
router.get('/', (req, res, next) => {
  Promise.all([findTopStory(75), findTopVideo(4)])
    .then(results => {
      res.render('index', {
        host_url: req.protocol + '://' + req.get('host'),
        title: 'HomePage | Newssnappy Football | Soccer new ',
        topStory: results[0],
        topVideo: results[1],
        convertDateTime: convertDateTime,
        convertTimeAgo: convertTimeAgo,
        category: 'Football',
        tit: 'Newssnappy | Football New | Soccer new'
      });
    });
});

module.exports = router;
