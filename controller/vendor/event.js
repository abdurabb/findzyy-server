const Event = require('../../models/vendor/event')
const { handleError } = require('../../handler/handleError')


const addEvent = async (req, res) => {
    try {
        if (!req.body.startDate || !req.body.startTime || !req.body.endDate || !req.body.endTime) {
            return res.status(400).json({ message: 'Missing required data' })
        }
        const startTimestamp = new Date(`${req.body.startDate}T${req.body.startTime}:00`);
        const endTimestamp = new Date(`${req.body.endDate}T${req.body.endTime}:00`);

        await Event.create({
            ...req?.body,
            vendorId: req?.user?._id,
            startDate: startTimestamp,
            endDate: endTimestamp,
            startTime: startTimestamp,
            endTime: endTimestamp,
        })
        return res.status(200).json({ message: 'Event Created' })
    } catch (error) {
        handleError(error, res)
    }
}

const getEvent = async (req, res) => {
    try {
        const { filter, date } = req.query;
        const filterEnum = ['upcoming', 'past']
        let eventDates = []

        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit;
        let query = { vendorId: req?.userId }

        if (date) {
            const day = new Date(date);
            const month = day.getMonth() + 1;
            const year = day.getFullYear();


            const startOfDay = new Date(day);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(day);
            endOfDay.setHours(23, 59, 59, 999);

            // query.startDate = { $gte: startOfDay };
            // query.endDate = { $lte: endOfDay };

            query.startDate = { $lt: endOfDay }
            query.endDate = { $gt: startOfDay }


            const agg = await Event.aggregate([
                {
                    $match: {
                        vendorId: req.userId,
                        startDate: { $lt: new Date(year, month, 1) },
                        endDate: { $gte: new Date(year, month - 1, 1) }
                    }
                },
                {
                    $addFields: {
                        numDays: {
                            $add: [
                                {
                                    $dateDiff: {
                                        startDate: {
                                            $ifNull: [
                                                {
                                                    $max: [
                                                        "$startDate",
                                                        new Date(year, month - 1, 1)
                                                    ]
                                                },
                                                "$startDate"
                                            ]
                                        },
                                        endDate: {
                                            $ifNull: [
                                                {
                                                    $min: [
                                                        "$endDate",
                                                        new Date(year, month, 1)
                                                    ]
                                                },
                                                "$endDate"
                                            ]
                                        },
                                        unit: "day"
                                    }
                                },
                                1
                            ]
                        }
                    }
                },
                {
                    $addFields: {
                        days: { $range: [0, "$numDays"] }
                    }
                },
                { $unwind: "$days" },
                {
                    $addFields: {
                        dayDate: {
                            $dateAdd: {
                                startDate: {
                                    $ifNull: [
                                        {
                                            $max: [
                                                "$startDate",
                                                new Date(year, month - 1, 1)
                                            ]
                                        },
                                        "$startDate"
                                    ]
                                },
                                unit: "day",
                                amount: "$days"
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$dayDate",
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id": 1 } }
            ]);

            eventDates = agg.map(a => ({
                date: a._id,
                count: a.count
            }));


        } else {
            if (!filterEnum.includes(filter)) { return res.status(400).json({ message: 'Invalid Filter' }) }
            filter == "upcoming" ? query.endDate = { $gte: new Date() } : query.endDate = { $lt: new Date() }
        }


        let events = [], total = 0
        if (filter == 'upcoming') {
            events = await Event.find(query).sort({ createdAt: 1 }).skip(skip).limit(limit).lean()
            total = await Event.countDocuments(query)
        } else {
            events = await Event.find(query).sort({ createdAt: 1 }).skip(skip).limit(limit).lean()
            total = await Event.countDocuments(query)
        }


        return res.status(200).json({ message: 'Events', events, total, eventDates, isFullDayOff: req?.user?.isFullDayOff, totalPage: Math.ceil(total / limit) })
    } catch (error) {
        handleError(error, res)
    }
}

const updateEvent = async (req, res) => {
    try {
        const { startDate, startTime, endDate, endTime, eventName, clientName, lat, lng, location, description, eventId } = req?.body;
        if (!eventId) { return res.status(400).json({ message: 'Event id is missing' }) }
        const event = await Event.findById(eventId)
        if (!event) { return res.status(400).json({ message: 'Event is missing' }) }

        let startTimestamp;
        let endTimestamp;

        if (startDate) {
            if (!startTime) { return res.status(400).json({ message: 'start time is missing' }) }
            startTimestamp = new Date(`${req.body.startDate}T${req.body.startTime}:00`);

            event.startDate = startTimestamp
            event.startTime = startTimestamp

        }
        if (endDate) {
            if (!endTime) { return res.status(400).json({ message: 'start time is missing' }) }
            endTimestamp = new Date(`${req.body.endDate}T${req.body.endTime}:00`);

            event.endDate = endTimestamp
            event.endTime = endTimestamp
        }
        if (eventName) { event.eventName = eventName }
        if (clientName) { event.clientName = clientName }
        if (lat) { event.lat = lat }
        if (lng) { event.lng = lng }
        if (location) { event.location = location }
        if (description) { event.description = description }
        await event.save()
        return res.status(200).json({ message: 'Event updated' })

    } catch (error) {
        handleError(error, res)
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        if (!eventId) { return res.status(400).json({ message: 'EventId is missing' }) }
        await Event.findByIdAndDelete(eventId)
        return res.status(200).json({ message: 'Event Deleted' })
    } catch (error) {
        handleError(error, res)
    }
}

const fullDayOff = async (req, res) => {
    try {
        req?.user?.isFullDayOff == false ? req.user.isFullDayOff = true : req.user.isFullDayOff = false
        await req.user.save()
        return res.status(200).json({ message: 'Full Day Off' })
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    addEvent, getEvent, updateEvent, deleteEvent, fullDayOff
}