var express = require('express');
var Promise = require('bluebird');
var {LEAGUES, convertDateTime, convertTimeAgo} = require('../common/utils');

//Model
var Story = require('../models/Story');
var Video = require('../models/Video');
var router = express.Router();

var findStoryLike = Promise.promisify(Story.findLike);
var findLike = Promise.promisify(Video.findLike);



/* GET home page. */
router.get('/:slug', (req, res, next) => {
  var slug = req.params.slug, search = null;
  Object.keys(LEAGUES).forEach((key) => {
    var obj = LEAGUES[key];
    if (obj.slug === slug){
      search = obj.search;
    }
  });
  if (search === null){
    var err = new Error('Resource not Found');
    err.status =  404;
    res.render('error', {
      title: 'Resource not Found',
      error: err
    });
  }else {
    Promise.all([findStoryLike(75, search), findLike(4, `${search}`)])
      .then(results => {
        res.render('index', {
          host_url: req.protocol + '://' + req.get('host'),
          tit: `${search} | ${search} New | ${search} Video`,
          topStory: results[0],
          topVideo: results[1],
          convertDateTime: convertDateTime,
          convertTimeAgo: convertTimeAgo,
          category: search
        });
      });
  }
  
});

module.exports = router;
