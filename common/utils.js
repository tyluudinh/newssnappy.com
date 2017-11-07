/**
 * Created by dinhty.luu@gmail.com on 6/11/17.
 */
var moment = require('moment');
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
module.exports = {
  
  setPublished: (published) => {
    return moment(published).utc().format(DATE_TIME_FORMAT);
  },
  convertDateTime: (published) => {
    return moment.parseZone(published).local().format('MMM D, hh:SS A');
  },
  convertTimeAgo: (published) => {
    var publishedDateTime = moment.parseZone(published).local();
    var duration = moment.duration((moment().unix() - publishedDateTime.unix()) * 1000);
    if (duration.days() > 0){
      return publishedDateTime.format('MMM D, hh:SS A');
    }
    if (duration.hours() === 0){
      return `${duration.minutes()} minutes ago`;
    }
    return `${duration.hours()} hours ago`;
  },
  DATE_TIME_FORMAT: DATE_TIME_FORMAT,
  
  LEAGUES: {
    premier_league: {
      slug: 'premier-league',
      search: 'English Premier League'
    },
    laliga: {
      slug: 'la-liga',
      search: 'Spanish Primera División'
    },
    ligue1: {
      slug: 'ligue-1',
      search: 'French Ligue 1'
    },
    bundesliga: {
      slug: 'bundesliga',
      search: 'German Bundesliga'
    },
    seriea: {
      slug: 'serie-a',
      search: 'Italian Serie A'
    },
    c1: {
      slug: 'uefa-champion-league',
      search: 'UEFA Champions League'
    },
    c2: {
      slug: 'uefa-europa-league',
      search: 'UEFA Europa League'
    }
    
  }
};
