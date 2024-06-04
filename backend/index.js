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
    response.download(filepath, function (err) {
        if (err) {
            console.error("Error downloading")
            response.status(500).send('Error downloading file')
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
