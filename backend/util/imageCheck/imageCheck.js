// Uses the python imageHash PIL to find similar images and returns them
let {PythonShell} = require('python-shell')

function downloadFile(image) {
    // Takes only the base64 of image to download
    let base64 = (image.file.split(","))[1]
    require("fs").writeFile("util/imageCheck/image.jpg",base64, 'base64', function(err) {
        if(err){
            console.log(err);
        }
    });
}

function getSimilarImages(image) {
    const path = "util/imageCheck/image.jpg"
    downloadFile(image)
    runPython()
}

function runPython() {
    let options = {
        args: ["/Users/jackhancock/Desktop/Coding/webDevelopment/reactPlayground/backend/util/imageCheck/image.jpg"]
    };

    PythonShell.run('util/imageCheck/imageCheck.py', options , function (err, results) {
        if (err) throw err;
        // console.log('results: %j', results[0]);
    })
}

function uploadImages(similarImages) {
    // Gets images, converts to base64 and sends back to frontend
    let imagePaths = similarImages.split(',')
    console.log("SIMILAR IMAGES: ", imagePaths)
}




exports.uploadImages = uploadImages;
exports.getSimilarImages = getSimilarImages;