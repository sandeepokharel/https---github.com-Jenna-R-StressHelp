const Appointment = require('../models/appointmentModel')
const jwt = require('jsonwebtoken')
// open appointment form
const bookAppointment = async (req, res) => {
    try {
        res.render('bookAppointment');
        // res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// save appointment form
const saveAppointment =  async (req, res) => {
    try {
        console.log(req.body)
        const token = req.cookies['auth'];
        const decoded = await (jwt.verify)(token, process.env.SECRET);
        const appointment = new Appointment({...req.body, userId: decoded._id})
        await appointment.save();
        res.render('bookAppointment', {successMessage: 'You have successfully book an appointment!'});
    } catch (err) {
        console.error(err);
        res.render('bookAppointment', {errorMessage: 'Something went wrong while booking an appointment!'});

        // res.render('error/500');
    }
}

module.exports = { bookAppointment, saveAppointment }