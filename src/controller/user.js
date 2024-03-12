import models from "../models/index.js"
import validateUser from "../validations/user.js"
import sendMail from "../utils/mail.js"
import cron from "node-cron"


const createUser = async  (req, res) => {
    try {
        const {value, error}= validateUser(req.body)
        const {username, email, birthday} = value

        if(error){
            return res.status(400).send(error.message);
        }
        const userExist = await models.User.findOne({email});
    if (userExist) {
      return (
        res.status(409).
        send({
          message:
            "This user already exist. Please sign up with a new email",
        })
      );
    }
        const user = await models.User.create({
            username,
            email,
            birthday
        });
        return res.status(200).send({
            message: 'Birthday recorded successfully',
            user: user
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
cron.schedule('0 7 * * *', () => {
    console.log('Checking birthdays...');
    getBirthdays();
    });

export {createUser, getBirthdays}