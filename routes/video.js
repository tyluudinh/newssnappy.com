var express = require('express');
var Promise = require('bluebird');
var moment = require('moment');
var {convertDateTime, convertTimeAgo} = require('../common/utils');
//Model
var Video = require('../models/Video');
var router = express.Router();

var findTopVideo = Promise.promisify(Video.findTop);
var findTopWithoutId = Promise.promisify(Video.findTopWithoutId);
var findLike = Promise.promisify(Video.findLike);
var findOne = Promise.promisify(Video.findOne);


/* GET home page. */
router.get('/:slug/:id', (req, res, next) => {
  Promise.all([findOne(req.params.id), findTopWithoutId(6, req.params.id)])
    .then(results => {
      var video = results[0];
      if (video.length === 0){
        next();
        return false;
      }
      res.render('layout/video', {
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        video: video[0],
        videos: results[1],
        convertDateTime: convertTimeAgo,
        convertDuration: convertDuration
      })
    });
});

router.get('/highlight', (req, res, next) => {
  Promise.all([findLike(100, 'Highlight')])
    .then(results => {
      var videos = results[0];
      res.render('layout/highlight', {
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        videos: videos,
        title: 'Video Highlight |',
        category: 'Highlight',
        convertDateTime: convertTimeAgo,
        convertDuration: convertDuration
      })
    });
});
router.get('/', (req, res, next) => {
  Promise.all([findTopVideo(200)])
    .then(results => {
      var videos = results[0];
      res.render('layout/highlight', {
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        videos: videos,
        title: 'Newssnappy Videos',
        category: 'All',
        convertDateTime: convertTimeAgo,
        convertDuration: convertDuration
      })
    });
});

function convertDuration (duration) {
  var time = moment.duration(duration * 1000), min = time.minutes(), second = time.seconds();
  min = min < 10 ? `0${min}` : min;
  second = second < 10 ? `0${second}` : second;
  return `${min}:${second}`;
}

module.exports = router;
