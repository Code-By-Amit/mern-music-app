const { validationResult } = require("express-validator");
const Artist = require("../models/artist.model");
const { uploadOnCloudinary } = require("../services/uploadOnCloudinary");

const createArtist = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, bio } = req.body;

        let image
        if (req.file) {
            const response = await uploadOnCloudinary(req.file.path)
            image = response.secure_url
        }
        if (!name || !image) {
            return res.status(400).json({ message: "Please Provide name and image" });
        }

        await Artist.create({ name, bio, image })

        res.status(201).json({ message: "Artist Created Sucessfully" });
    } catch (error) {
        console.log("Error in create Artist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


const getAllArtist = async (req, res, next) => {
    try {
        const { search, limit = 10, page = 1, all, some, fields } = req.query
        const query = search ? { name: RegExp(search, 'i') } : {};

        if (all == "true") {
            const artists = await Artist.find({})
            return res.status(200).json({ message: "All Artists", artists })
        }

        if (some == 'true') {
            const artists = await Artist.aggregate([{ $sample: { size: Number(limit) } }])
            return res.status(200).json({ message: "Some Artist", artists })
        }

        if (fields) {
            const artists = await Artist.find(query).skip((page - 1) * limit).limit(Number(limit)).select(fields.replace(/,/g, ' '));  // Convert comma to space for Mongoose
            return res.status(200).json({ message: `Artists`, artists })
        }

        const artists = await Artist.find(query).skip((page - 1) * limit).limit(Number(limit))

        if (!artists) {
            return res.status(404).json({ message: "Failed to Get Artist" })
        }

        res.status(200).json({ message: `Page ${page} Artist`, artists })
    } catch (error) {
        console.log("Error in getAllArtist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const getArtistById = async (req, res, next) => {
    try {
        const id = req.params.id

        const artist = await Artist.findById(id).populate('songs')
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }

        res.status(200).json({ message: `Artist By id ${id}`, artist })
    } catch (error) {
        console.log("Error in getArtistById handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const deleteArtistById = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id)
        const artist = await Artist.findByIdAndDelete(id);
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }

        res.status(200).json({ artist })
    } catch (error) {
        console.log("Error in deleteArtistById handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const updateArtistInfo = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, bio, image } = req.body;
        const artist = await Artist.findById(id);
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;
        if (image) updateData.image = image;

        const updatedArtist = await Artist.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select('-password');

        res.status(200).json({ updatedArtist })
    } catch (error) {
        console.log("Error in updateArtistInfo handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

module.exports = {
    createArtist,
    getAllArtist,
    getArtistById,
    updateArtistInfo,
    deleteArtistById
}