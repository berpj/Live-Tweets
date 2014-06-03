Live-Tweets
===========

**Visualize tweets and twitpics in real time on a world map.**

![alt tag](https://raw.githubusercontent.com/berpj/live-tweets/master/screenshots.png)

## Technologies

Server    | Client
--------- | -------------
Node.js   | Backbone (WIP)
Express   | Jquery
Socket.io | Google Map
          | Bootstrap
          | Font-Awesome

## Demo
Heroku instance: http://live-tweets.herokuapp.com/

## Installation
1. Install Node.JS
2. Clone the repo
3. Install the dependencies:

        npm install
         
4. Define your Twitter application credentials in your environment:

        access_token_key=...
        access_token_secret=...
        consumer_key=...
        consumer_secret=...
        
5. Run the server. By default it binds to port 8080, so you can open http://localhost:8080.

## License
MIT
