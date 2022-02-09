import React, { Component } from "react";
import "./imageHash.css"
import {getSimilarImages, showSimilarImages} from "../../services/serviceImageCheck";
const backendImageDB = "http://localhost:5000/img/"



class GetImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Image being searched
            image: {
                path: null,
                file: null,
                error: null,
            },
            // List of all similar images to main
            similar: []
        };
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            if(event.target.files[0].size > 75000){
                this.setState({
                    image: {
                        path: null,
                        file: null,
                        error: "Image is too large."
                    }
                })
                return
            }
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                this.setState({
                    image: {
                        path: URL.createObjectURL(event.target.files[0]),
                        file: reader.result,
                        error: null
                    }
                })
            }
            this.findSimilar(event)
        } else {
            this.setState({
                image: {
                    path: null,
                    file: null,
                    error: "No image chosen.",
                }
            });
        }

    };
    // Returns all images that have similar hash to main
    findSimilar = (e) => {
        getSimilarImages(this.state.image)
            .then()
    }

    // Updates similar images
    showSimilar = (e) => {
        showSimilarImages()
            .then(similar => this.setState({similar}, () => console.log(this.state.similar)))
    }

    render() {
        this.findSimilar()
        let listOfImages
        if (this.state.similar[0] === "NONE") {
            listOfImages = this.state.similar.map((image)=>{
                return (
                    <p key={0}>No similar images found.</p>
                )})
        }
        else{
            listOfImages = this.state.similar.map((image)=>{
                return (
                <div className="gallery">
                    <a target="_blank" href="https://opensea.io/assets/0x0297669bb8d705a9ec5e34d4a1cbde57348d7cfe/169" rel="noreferrer">
                        <img src={backendImageDB + image} key={image} width="600" height="400" alt=""/>
                    </a>
                    <div className="desc">{image}</div>
                </div>
                )})
        }

        return (
            <div>
                <div>
                <h1>Upload Image</h1>
                <input type="file" name="myImage" accept=".jpg, .jpeg, .png" onChange={this.onImageChange} />
                <img src={this.state.image.path} alt="" />
                <p>{this.state.image.error} </p>
                    <button type="showSimilar" onClick={this.showSimilar}>Find similar images</button>
                </div>
                <div className="row">
                    <div className="column">
                        {listOfImages}
                    </div>
                </div>
            </div>
        );
    }
}

export default GetImage;

