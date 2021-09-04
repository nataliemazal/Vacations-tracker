const { request } = require("express");
const dal = require("../dal/dal");


//get all vacations 
async function getUserVacationsAsync(uuid) {
  const sql = `SELECT 
  vacations.vacation_id,
  description,
  destination,
  DATE_FORMAT(start_date,"%d-%c-%Y") AS start_date,
  DATE_FORMAT(end_date,"%d-%c-%Y") AS end_date,
  price,
  image,
  COUNT(followers.uuid) AS followers,
 Userfollow.vacation_id AS isUserFollow
  FROM vacations LEFT JOIN followers 
  ON vacations.vacation_id = followers.vacation_id
 LEFT JOIN (select * from followers where followers.uuid = '${uuid}') Userfollow
 ON Userfollow.vacation_id = followers.vacation_id
 GROUP BY vacations.vacation_id
ORDER BY isUserFollow DESC;
   `
  const followedVacations = await dal.executeAsync(sql);
  return followedVacations;
}



//follow vacation get object with user id and vacation id and checking: if exist -> remove , if not exist -> insert
async function followVacationAsync(user_vacation) {
  const sqlUserFollow = `SELECT uuid, vacation_id FROM followers WHERE uuid = '${user_vacation.uuid}' AND vacation_id = '${user_vacation.vacation_id}' `;
  const user = await dal.executeAsync(sqlUserFollow);
  if (user.length > 0) {
    const sql = `DELETE FROM followers WHERE uuid = '${user_vacation.uuid}' AND vacation_id = ${user_vacation.vacation_id}`
    const removefollow = await dal.executeAsync(sql);
    return removefollow;
  }
  else {
    const sql = `INSERT INTO followers VALUES (${user_vacation.vacation_id},'${user_vacation.uuid}')`
    const follow = await dal.executeAsync(sql);
    return follow;
  }
}



module.exports = {
  getUserVacationsAsync,
  followVacationAsync

};
