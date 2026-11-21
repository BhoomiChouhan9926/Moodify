const { request } = require('express')
const id3 = require('node-id3')
const storageService = require('../services/storage.service')
const songModel = require('../models/songs.model')

async function uploadSongController(req,res){
    const {mood} = req.body
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer:songBuffer,
            filename : tags.title + ".mp3",
            folder : "Moodify/songs"
        }),
        storageService.uploadFile({
            buffer:tags.image.imageBuffer,
            filename:tags.title + ".jpeg",
            folder : "Moodify/posters"
        })
    ])

    const song = await songModel.create({
        title : tags.title,
        url:songFile.url,
        posterUrl:posterFile.url,
        mood
    })
   
    res.status(200).json({
        message: "Song created successfully",
        song
    })



}


async function getSongsByMoodController(req,res){
    const {mood} = req.query
    const songs = await songModel.find({mood})
    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    })
}
module.exports = {
    uploadSongController,
    getSongsByMoodController
}