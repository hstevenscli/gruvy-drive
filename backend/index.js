const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { spawn } = require('child_process')
const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl-exec');
// const ls = spawn(


var app = express();

function getFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = now.getFullYear()
    
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: function (request, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));


// TODO
// Add the ability to name the file so its not assigned a random string of letters and numbers
app.post("/upload", upload.array('file', 10), function (request, response) {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    console.log("IP:", ip, "uploading file")
    if (request.files) {
        response.status(200).send("File uploaded successfully")
        console.log(request.files)
        // console.log("Name:", request.file.originalname)
        // let oldPath = request.file.path
        // let newPath = "uploads/" + request.file.originalname
        // fs.rename(oldPath, newPath, (err) => {
        //     if (err) {
        //         console.error(err)
        //     }
        //     console.log("Rename complete")
        // })
    } else {
        response.status(500).send("Files failed to upload")
    }
})

app.get("/uploads", function (request, response) {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    console.log("IP:", ip, "requesting file list")

    fs.readdir("./uploads", function (err, files) {
        if (err) {
            console.error("Failed to read uploads directory")
            return response.status(500).send("Failed to read from directory")
        }
        response.json(files)
    })
})

app.get("/uploads/:filename", function (request, response) {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    console.log("IP:", ip, "downloading file")

    let filename = request.params.filename
    let filepath = path.join(__dirname, "uploads", filename)

    console.log("Attempting to download", filename)

    response.download(filepath, function (err) {
        if (err) {
            console.error("Error downloading")
            if (!response.headersSent) {
                response.status(500).send('Error downloading file')
            }
        } else {
            console.log('user downloaded file:', filename)
        }
    })
})


app.post("/youtube", function (request, response) {
    console.log()
})


app.delete("/uploads/:filename", function (request, response) {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    console.log("IP:", ip, "deleting file")

    let filename = request.params.filename
    let filepath = path.join(__dirname, "uploads", filename)

    console.log("Attempting to delete:", filename)
    
    fs.rm(filepath, function (err) {
        if (err) {
            console.error("Error downloading")
            if (!response.headersSent) {
                response.status(500).send('Error deleting file')
            }
        } else {
            response.status(200).send("File deleted")
        }
    })
})





app.listen(8080, function () {
    console.log("server running")
})
