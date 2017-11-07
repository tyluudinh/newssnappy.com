/**
 * Created by dinhty.luu@gmail.com on 1/11/17.
 */
var BaseModel =  require('./BaseModel');
var moment = require('moment');
let tableName = 'video';

let Video = {
  tableName: tableName,
  findOne: function(espnId, callback) {
    BaseModel.query(`SELECT * FROM ${tableName} WHERE espn_video_id = ${espnId}`, function (err, rows) {
      return callback(err, rows);
    })
  },
  findTop: (limit= 4, callback) => {
    BaseModel.query(`SELECT * FROM ${tableName} ORDER BY published DESC LIMIT ${limit}`, (err, rows) => {
      return callback(err, rows)
    })
  },
  findTopWithoutId: (limit = 4, id, callback) => {
    BaseModel.query(`SELECT * FROM ${tableName} WHERE espn_video_id <> ${id} ORDER BY published DESC LIMIT ${limit}`, (err, rows) => {
      return callback(err, rows)
    })
  },
  findLike: (limit = 30, like, callback) => {
    BaseModel.query(`SELECT * FROM ${tableName} WHERE title like ${`"%${like}%"`} OR description like ${`"%${like}%"`} OR tags like ${`"%${like}%"`} ORDER BY published DESC LIMIT ${limit}`, (err, rows) => {
      return callback(err, rows)
    })
  }
};

module.exports = Video;
