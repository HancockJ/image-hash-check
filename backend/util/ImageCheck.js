// Uses the python imageHash PIL to find similar images and returns them


function getFile(image) {
    const file = new File([image], "file.jpg");
    console.log(file)
}

exports.getFile = getFile;