import React, { Component } from "react";
import "./imageHash.css"
// import {getAllCustomers} from "../../services/serviceCustomer";
import {getSimilarImages} from "../../services/serviceImageCheck";

class GetImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            similar: []
        };
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            console.log("RAN")
            let img = event.target.files[0];
            console.log(URL.createObjectURL(img));
            console.log("Images:::::::::::::")
            console.log(img)
            this.setState({
                image: URL.createObjectURL(img),
            });
        } else {
            this.setState({
                image: "No image chosen.",
            });
        }

    };

    findSimilar = (e) => {
        console.log("Finding all similar images!")
        getSimilarImages(this.state.image)
            .then(similar => this.setState({similar}, () => console.log('Images fetched...', similar)))

    }

    render() {
        return (
            <div>
                <div>
                <h1>Upload Image</h1>
                <input type="file" name="myImage" onChange={this.onImageChange} />
                <img src={this.state.image} alt="" />
                <p> image url={this.state.image} </p>
                    <button type="findSimilar" onClick={this.findSimilar}>Find similar images</button>
                </div>
                <div className="row">
                    <div className="column">
                        <img src={this.state.image} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default GetImage;

