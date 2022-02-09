# Image Hash Checking Service
Created by Jack Hancock.

Please see the Demo folder for a short video and screenshots of the website in
action.

## Overview
The goal of this project was to create a website that would allow a user 
to upload their own image and then search through a large database of images to find all 
similar images.

The idea behind this project was to create a way for someone to search a blockchain 
and find all NFT's that have a similar image to the one being searched. This could 
help a user determine that they are buying the original NFT. 

My project uses a simple folder of images on the backend. In a production version
the product would be connected to a database from Opensea, Rarible, IPFS, or something
created specifically for this purpose.

## Usage
To run this project use 'npm start' inside this main folder.
This will start the front and backend servers concurrently.

## Technology
### Frontend
Built with React \
Allows user to upload an image and then submit it to be searched. The image's data packet will be sent to the backend 
server through its API. The backend server will return a list of all similar or identical images.

### Backend
Express.js backend that calls my python script. \
This python script uses the ImageHash library (https://pypi.org/project/ImageHash/)
to create an average hash of every file in the current backend database. 
The script then takes in a new picture and compares its hash with the database hashes.
Average hash works by making all similar images have the same hash. The returned images will all 
be similar or identical to the image searched.
