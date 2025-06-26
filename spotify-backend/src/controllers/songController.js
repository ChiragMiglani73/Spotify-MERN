import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong=async(req,res)=>{
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;

        if (!req.files || !req.files.audio || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "Please provide both audio and image files"
            });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        if (!name || !desc) {
            return res.status(400).json({
                success: false,
                message: "Please provide song name and description"
            });
        }

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:"video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }
        const song = songModel(songData);
        await song.save();

        res.json({
            success: true,
            message: "Song added successfully"
        });
        
    } catch (error) {
        console.error("Error in addSong:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add song"
        });
    }
}

const listSong=async(req,res)=>{
    try {
        const allSongs=await songModel.find();
        res.json({success:true, songs:allSongs});
        
    } catch (error) {
        res.status(500).json({
            success:false, 
            message: error.message || "Failed to fetch songs"
        });
    }
}

const removeSong=async(req,res)=>{
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Song removed successfully"});
        
    } catch (error) {
        res.status(500).json({
            success:false, 
            message: error.message || "Failed to remove song"
        });
    }
}

export {addSong, listSong,removeSong};