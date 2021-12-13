import React, { Component } from "react";
import "./imageHash.css"
// import {getAllCustomers} from "../../services/serviceCustomer";
import {getSimilarImages, showSimilarImages} from "../../services/serviceImageCheck";
const backendImageDB = "http://localhost:5000/img/"

class GetImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                path: null,
                file: null,
                error: null,
            },
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

    findSimilar = (e) => {
        getSimilarImages(this.state.image)
            .then()
    }

    showSimilar = (e) => {
        showSimilarImages()
            .then(similar => this.setState({similar}, () => console.log(this.state.similar)))
    }

    render() {
        this.findSimilar()
        let listOfImages = this.state.similar.map((image)=>{
            return (
                <img src={backendImageDB + image} alt="" key={image}/>
        )})

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

