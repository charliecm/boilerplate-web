# Web App Boilerplate

Yet another web application boilerplate with the following tools:

- [Gulp](https://github.com/gulpjs/gulp)
	- [Icon fonts](https://www.npmjs.com/package/gulp-iconfont) (from SVGs)
	- [SASS](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html) (indented syntax)
	- [Browserify](http://browserify.org/) (with browserify-shim)
- [Mocha](http://mochajs.org/) + [Chai](http://chaijs.com/) + [Sinon](http://sinonjs.org/)

## Development

Run `npm install` and then `node install` to setup project for development.

Run `gulp` to watch files for development and run a server at `http://localhost:8070` (dev) and `http://localhost:8071` (dist).

Run `gulp build' to build files for distribution in `dist/`.

Run `gulp jsVendors` to manually regenerate the vendors bundle.

Run `gulp test` to run unit tests.

__Build configuration:__ `gulp/config.js`

## Icon Fonts

Place icon SVGs in `assets/icons/`.

Preview HTML: `assets/icons-preview.html`

SASS: `src/css/components/_icon.sass`

## CSS

Only SASS files in `src/css/` (not the subdirectories) are compiled.

## JavaScript

Two bundles are created in `src/js/`: `vendors.js` and `app.js`. Separating bundles speed up building of the app bundle during watch. Regenerate vendors bundle manually by running `gulp vendors`.

You can specify the packages that belong in the vendor bundle in `gulp/config.js` under `config.js.vendors.requires`.
