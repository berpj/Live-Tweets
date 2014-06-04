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
```
The MIT License (MIT)

Copyright (c) 2014 Pierre-Jean Bergeron

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
