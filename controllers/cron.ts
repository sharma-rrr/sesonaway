import cron from 'node-cron';
import db from '../models';
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');


class Cronjob {
   
    // async updateDailyRewards() {
    //     try {
    //         var sql = `  update Users set Dailyreward =0`
    //         var result1 = await MyQuery.query(sql, { type: QueryTypes.UPDATE });
    //         console.log('Daily rewards updated successfully.');
    //     } catch (error) {
    //         console.error('Error updating daily rewards:', error);
    //     }
    // }
    
}

export default new Cronjob();
