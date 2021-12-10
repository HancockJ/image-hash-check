export async function getSimilarImages(image) {
    const response = await fetch(`/api/imageCheck`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({image: image})
        }
    )
    return await response.json();
}
