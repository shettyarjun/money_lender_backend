const asyncHandler = require('express-async-handler');
const Money = require('../models/moneyModel');

const getmoneylends = asyncHandler(async (req, res) => {
    const moneylends = await Money.find({ user_id: req.user.id });
    if (!moneylends) {
        return res.status(404).json({ message: "No moneylends found" });
    }
    else {
        res.status(200).json(moneylends);
    }
});

const createmoneylend = asyncHandler(async (req, res) => {
    const { name, money_taken, money_given, date } = req.body;

    try {
        if (!name || !money_taken || !money_given || !date) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const existingMoney = await Money.findOne({ name: name });
        if (existingMoney) {
            return res.status(400).json({ message: "Name already exists" });
        }

        const money = await Money.create({
            name,
            money_taken,
            money_given,
            date,
            user_id: req.user.id
        });

        res.status(200).json(money);
    } catch (error) {
        console.error("Error creating money lend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const updatemoneylend = asyncHandler(async (req, res) => {
    const money = await Money.findById(req.params.id,{ user_id: req.user.id });
    if (!money) {
        res.status(404);
        throw new Error("user not found");
    }
    if (money.user_id.toString() !== req.user.id) {
        res.status(403);
        res.json({ message: "Not authorized to update" });
    }
    const updatemoney = await Money.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json(updatemoney);
});

const deleteAllmoneylends = asyncHandler(async (req, res) => {
    try {
        const money = await Money.findById(req.params.id, { user_id: req.user.id});
        if (!money) {
            return res.status(404).json({ message: "Money lend not found" });
        }

        if (money.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this money lend" });
        }

        await Money.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Money lend has been deleted" });
    } catch (error) {
        console.error("Error deleting money lend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = { getmoneylends, createmoneylend, updatemoneylend, deleteAllmoneylends };
