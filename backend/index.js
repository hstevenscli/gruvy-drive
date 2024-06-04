const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

var app = express();
const upload = multer({ dest: "uploads/" })

app.use(express.static("public"))



// TODO
// Add the ability to name the file so its not assigned a random string of letters and numbers
app.post("/upload", upload.single('file'), function (request, response) {
    if (request.file) {
        response.status(200).send("File uploaded successfully")
        console.log(request.file)
        console.log("Name:", request.file.originalname)
        let oldPath = request.file.path
        let newPath = "uploads/" + request.file.originalname
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(err)
            }
            console.log("Rename complete")
        })
    } else {
        response.status(400).send("File failed to upload")
    }
})

app.get("/uploads", function (request, response) {
    fs.readdir("./uploads", function (err, files) {
        if (err) {
            console.error("Failed to read uploads directory")
            return response.status(500).send("Failed to read from directory")
        }
        for (let i = 0; i < files.length; i++) {
            console.log(files[i])
        }
        response.json(files)
    })
})

app.get("/uploads/:filename", function (request, response) {
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
    // fs.readFile("./uploads/" + filename, "utf-8",(err, data) => {
    //     if (err) throw err
    //     console.log(data)
    //     if (data) {
    //         response.json(data)
    //     }
    // })
})






app.listen(8080, function () {
    console.log("server running")
})
