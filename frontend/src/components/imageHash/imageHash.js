import React, { Component } from "react";
import "./imageHash.css"
// import {getAllCustomers} from "../../services/serviceCustomer";
import {getSimilarImages} from "../../services/serviceImageCheck";
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
        console.log("Finding all similar images!")
        getSimilarImages(this.state.image)
            .then(similar => this.setState({similar}, () => console.log('Images fetched...', this.state.similar)))
    }

    render() {
        return (
            <div>
                <div>
                <h1>Upload Image</h1>
                <input type="file" name="myImage" accept=".jpg, .jpeg, .png" onChange={this.onImageChange} />
                <img src={this.state.image.path} alt="" />
                <p>{this.state.image.error} </p>
                    <button type="findSimilar" onClick={this.findSimilar}>Find similar images</button>
                </div>
                <div className="row">
                    <div className="column">
                        <img src={backendImageDB + this.state.similar[0]} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default GetImage;

