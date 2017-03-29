# asmr-video-app
## Project Two Assignment: ASMR Video App

An application to share your favorite ASMR videos

[Heroku Link](https://secret-gorge-32743.herokuapp.com)

[App Wireframe](https://drive.google.com/open?id=0B3Sl5935K7mwckxPNWhSM2JIV2s)

## App Overview

This application allows users to share their favorite ASMR videos and provide specific information about each one.

## Unsolved Problems:

* Password is not able to be edited.
* Embedded YouTube video player should be styled.

## User Stories

As a user I would like to:
* Create an account
* Successfully login
* User can see other users videos
* Post videos
* Edit video information
* Edit user information
* Delete a video
* Successfully logout and login again without any issues

## Stretch Goals

* Add a search function
* Simplify video upload

## Entity Relationship Diagrams (Database Modeling)

User = {
	username: String,
	email: String,
	password: String,
	about: String,
  	videos: [VideoSchema],
  	created_at: Date,
  	updated_at: Date
}

Video = {
	artist_name: String,
	video_title: String,
	genre: String,
	language: String,
	triggers: String,
	date: String,
	video_length_mins: String,
	url: String
}

## Trello

[Trello Link](https://trello.com/b/QYhNeRO2/wdi-project-two)

## Portfolio with link added

[Portfolio Link](http://peter-colella-portfolio.bitballoon.com/)