Scss is being compiled to css by using `node-sass-chokidar`. 

`watch-css` script in `client/package.json`is run while running `npm start`, which watches for changes in `main.scss` inside the `src` folder in this
directory and compiles it to `main.css` in `src/assets/css`.
`build-css` script in `client/package.json` is run while running `npm run build` which produces a compressed version of `main.css`.
