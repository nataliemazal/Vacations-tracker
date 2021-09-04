

const path = require("path");
const dal = require("../dal/dal");
const fs = require("fs");

//get all vacations and number of followers
async function getAllVacationsAsync() {
    const sql = `SELECT 
    vacations.vacation_id,
    description,
    destination,
    DATE_FORMAT(start_date,"%d-%c-%Y") AS start_date,
    DATE_FORMAT(end_date,"%d-%c-%Y") AS end_date,
    price,
    image,
    COUNT(followers.uuid) as followers
    FROM vacations LEFT JOIN followers
    ON vacations.vacation_id = followers.vacation_id
    GROUP BY vacations.vacation_id;
   `
    const vacations = await dal.executeAsync(sql);
    return vacations;
}

async function getOneVacationsAsync(vacation_id) {
    const sql = `SELECT 
    vacation_id,
    description,
    destination,
    DATE_FORMAT(start_date,"%Y-%m-%d") AS start_date,
    DATE_FORMAT(end_date,"%Y-%m-%d") AS end_date,
    price,
    image
    FROM vacations
    WHERE vacation_id = ${vacation_id}
   `
    const vacation = await dal.executeAsync(sql);
    return vacation;
}

// add new vacation
async function AddVacationAsync(vacation, image) {
    const sql =
        `INSERT INTO vacations
         VALUES
         (DEFAULT,'${vacation.description}','${vacation.destination}','${vacation.start_date}','${vacation.end_date}',${vacation.price},DEFAULT) ;
   `
    const addedVacation = await dal.executeAsync(sql);
    vacation.vacation_id = addedVacation.insertId
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = `${vacation.vacation_id}${extension}`;
    vacation.image = fileName;
    const absolutePath = path.join(
        __dirname,
        "..",
        "images",
        fileName
    );
    await image.mv(absolutePath);
    const updateSql = `UPDATE vacations SET image = '${fileName}' WHERE vacation_id = ${vacation.vacation_id}`;
    await dal.executeAsync(updateSql);
    return addedVacation;
}

// edit  vacation
async function EditVacationAsync(vacation, image) {
    let setDetails = ""
    const vacationLength = Object.keys(vacation).length
    let count = 0
    for (const key in vacation) {
        if (key != "vacation_id") {
            setDetails += key + "=" + `'` + vacation[key] + `'`
            count++
            if (count !== vacationLength - 1) {
                setDetails += ","
            }
        }
    }
    const sqlUpdate = `UPDATE vacations
                   SET ${setDetails}
                   WHERE vacation_id  = ${vacation.vacation_id} `
    const updatedVacation = await dal.executeAsync(sqlUpdate);
    if (image) {
        updatedVacation.image_file = image
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = `${vacation.vacation_id}${extension}`;
        vacation.image = fileName;
        const absolutePath = path.join(
            __dirname,
            "..",
            "images",
            fileName
        );
        await image.mv(absolutePath);
        const updateSql = `UPDATE vacations SET image = '${fileName}' WHERE vacation_id = ${vacation.vacation_id}`;
        await dal.executeAsync(updateSql);
    }
    return updatedVacation;
}

// delete  vacation
function DeleteVacationAsync(vacation_id) {
    const sql =
        `DELETE FROM vacations WHERE vacation_id = ${vacation_id} ;`
    dal.executeAsync(sql);
}

async function getFollowersAsync() {
    const sql = `SELECT 
                 destination,
                 COUNT(followers.uuid) AS followers
                 FROM vacations  JOIN followers 
                 ON vacations.vacation_id = followers.vacation_id
                 GROUP BY vacations.vacation_id;`
    const followers = await dal.executeAsync(sql);
    return followers;
}



module.exports = {
    getAllVacationsAsync,
    AddVacationAsync,
    EditVacationAsync,
    DeleteVacationAsync,
    getFollowersAsync,
    getOneVacationsAsync

};