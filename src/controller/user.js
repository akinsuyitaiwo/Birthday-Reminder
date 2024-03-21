const models = require("../models/index.js")
const validateUser = require("../validations/user.js")
const sendMail = require("../utils/mail.js")
const cron = require("node-cron")


const createUser = async  (req, res) => {
    try {
        const {value, error}= validateUser(req.body)
        const {username, email, birthday} = value

        if(error){
            return res.status(400).send(error.message);
        }
        const user = await models.User.create({
            username,
            email,
            birthday
        });
        return res.status(200).render(("response"),
        {
            user
        })
    } catch (error) {
        console.error("error creating user", error.message)
        return res.status(500).send({
            message: "Server error"})
    }
}

const getBirthdays = async() =>{
    try {
        const currentDate =  new Date()
        const currentMonth = currentDate.getMonth() +1;
        const users = await models.User.find({birthdayMonth: currentMonth, birthdayDay: currentDate.getDate()});
        if (users.length > 0) {
            console.log(`Today's Birthdays:`);
            users.forEach(async user => {
                console.log(`${user.name} - ${user.birthdayMonth}/${user.birthdayDay}`);
                const subject = "Happy Birthday";
                const message = "Happy birthday! May your day be filled with joy, laughter, and unforgettable moments. Here's to another year of blessings, growth, and endless happiness. Cheers to you!";
                await sendMail(user.email, subject, message);
            });
        } else {
            console.log('No birthdays today.');
        }
       
        return {
            message:"Email sent successfully!"
        };
    } catch (error) {
        console.error("error getting birthdays", error.message);
    };
}


module.exports = {createUser, getBirthdays}