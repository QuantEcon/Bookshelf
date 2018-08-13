# QuantEcon Bookshelf SCSS

The included gulp script will compile, combine and minify all the project SCSS into a CSS file.

Run `npm install --global gulp-cli` to install gulp cli.

Run `npm install` in this directory to install the required components.

Run `gulp` to process the SCSS into a CSS file. The output will be `main.css` and `main.css.min` in the `client/src/assets/css` directory.

#### Updates
> August 2018
The minified SCSS to CSS script has be implemented as part of the `npm run dev` command so we can just run `npm run dev` and it will compile the SCSS to CSS.
Please check if you have `gulp-cli` installed beforehand. 
