export async function getSimilarImages(image) {
    await fetch(`/api/imageCheck`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({image: image})
        }
    )
    console.log("About to find similar images")
    try{
        const response = await fetch('/api/similarImages');
        return await response.json();
    }catch(error) {
        return [];
    }
}


