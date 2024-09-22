const Donation = require('./donation.model');
const Contact = require('./contact.model');


const donationController = async (req, res) => {

    const { name, emailAddress } = req.body;

    try {
        // Create a new donation record
        const newDonation = await Donation.create({ name, emailAddress });

        res.json({
            success: true,
            message: "Donor details added successfully",
            data: newDonation,
        });
    } catch (error) {
        console.error('Error adding donor:', error);
        res.status(500).json({
            success: false,
            message: "Failed to add donor details",
            error: error.message,
        });
    }
};

const contactController = async (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newContact = await Contact.create({ name, email, message });
        return res.status(201).json({ message: 'Contact created successfully!', contact: newContact });
    } catch (error) {
        console.error('Error creating contact:', error);
        return res.status(500).json({ error: 'An error occurred while creating the contact.' });
    }
};

const getAllDoner = async (req, res) => {

    try {

        const donations = await Donation.findAll({
            attributes: ['name', 'createdAt'], 
        });

        res.json({
            success: true,
            message: "Donations retrieved successfully",
            data: donations,
        });

    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve donations",
            error: error.message,
        });
    }
};


module.exports = { donationController, contactController, getAllDoner };
