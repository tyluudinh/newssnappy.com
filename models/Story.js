/**
 * Created by dinhty.luu@gmail.com on 1/11/17.
 */

var BaseModel =  require('./BaseModel');
let tableName = 'story';

let Story = {
  tableName: tableName,
  findAll: (callback) => {
    BaseModel.query(`SELECT * FROM ${tableName}`, function (err, rows) {
      return callback(err, rows);
    })
  },
  findTop: (limit = 7, callback) => {
    BaseModel.query(`SELECT * FROM ${tableName} ORDER BY published DESC LIMIT ${limit}`, (err, rows) => {
      return callback(err, rows)
    })
  },
  findOne: function(espnId, callback) {
    BaseModel.query(`SELECT * FROM ${tableName} WHERE espn_story_id = ${espnId}`, function (err, rows) {
      return callback(err, rows);
    })
  },
  findLike: (limit = 30, like, callback) => {
    BaseModel.query(`SELECT * FROM ${tableName} WHERE title like ${`"%${like}%"`} OR description like ${`"%${like}%"`} OR tags like ${`"%${like}%"`} ORDER BY published DESC LIMIT ${limit}`, (err, rows) => {
      return callback(err, rows)
    })
  }
};

module.exports = Story;
