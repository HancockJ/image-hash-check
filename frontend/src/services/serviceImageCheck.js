export async function getSimilarImages(image) {
    await fetch(`/api/imageCheck`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({image: image})
        }
    )

}

export async function showSimilarImages() {
    try{
        const response = await fetch('/api/similarImages');
        return await response.json();
    }catch(error) {
        // console.log(error)
        return error;
    }
}
