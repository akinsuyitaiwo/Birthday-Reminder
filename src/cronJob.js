const cron = require("node-cron")

cron.schedule('0 7 * * *', () => {
    console.log('Checking birthdays...');
    getBirthdays();
    });