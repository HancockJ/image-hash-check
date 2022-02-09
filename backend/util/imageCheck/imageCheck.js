// Uses the python imageHash PIL to find similar images and returns them
let {PythonShell} = require('python-shell')

// Base function for backend.
function getSimilarImages(image) {
    downloadFile(image)
    runPython()
}

// Takes only the base64 of image to download
function downloadFile(image) {
    let base64 = (image.file.split(","))[1]
    require("fs").writeFile("util/imageCheck/image.jpg",base64, 'base64', function(err) {
        if(err){
            console.log(err);
        }
    });
}

//This function starts a child process which will run the python script to search images.
function runPython() {
    let options = {
        args: ["/Users/jackhancock/Desktop/Coding/webDevelopment/reactPlayground/backend/util/imageCheck/image.jpg"]
    };

    PythonShell.run('util/imageCheck/imageCheck.py', options , function (err, results) {
        if (err) throw err;
    })
}

// Gets images, converts to base64 and sends back to frontend
function uploadImages(similarImages) {
    let imagePaths = similarImages.split(',')
    console.log("SIMILAR IMAGES: ", imagePaths)
}




exports.uploadImages = uploadImages;
exports.getSimilarImages = getSimilarImages;