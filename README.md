# Icon Library
This project was a quick i'm-bored-on-an-airplane to build out some thoughts I had on how the IBM Design Icon Library could be improved.
I had some quick, easy to reach goals:
* Flatten the sitemap to one, single page
* Expose useful assets for users to extend and improve the data that organizes the icons (a JSON file)
* Do away with AngularJS in favor lighter-weight jquery (and soon just vanilla JS)
* Optimize all of the SVGs in the library for good practice

## Tech stack
* Task runner is [gulp.js](http://gulpjs.com/)
* Server is [Express.js](http://expressjs.com/)
* View templates are compiled server-side using [Dust.js](https://linkedin.github.io/dustjs/)
* Static assets are in /public

## Development
In a terminal run:

1. `$ git clone git@git.innovate.ibm.com:dan-zaharia/iconlibrary.git` to download the repository
2. `$ cd iconlibrary` change into the new project directory
3. `$ npm install` download and install the dependencies the app needs to run
4. `$ node app.js` start the node server
4. `$ gulp` run the gulp tasks, including a persistent [browser-sync](http://www.browsersync.io/) proxy to the server
5. In a browser, open [http://localhost:3000](http://localhost:3000)