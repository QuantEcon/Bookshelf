# QuantEcon Notes

Code for the QuantEcon Notes Project

### Contributing
Please work in branches and make PR's

To make PR's cleaner and quicker, please merge the master branch into your branch (not the other way around!!!),
then test to make sure your code is still working as intended. This way, all merge conflicts will already be resolved in the PR.

### Setup
##### Prerequisites
1. **npm 5+** : `node install -g npm`
2. **node v8+**
3. **reactjs v16+** : `npm install -g create-react-app`

#### Installation Commands
Ensure you have `npm v5+` and `node v8+` installed.
1. Pull from repository using `git pull`.
2. Cd into project root directory.
3. Run `npm run install-all` to install all dependencies.
4. Follow instructions in `client/src/assets/sccss/README.md` to set up the css

#### Running Commands

Instead of of running `npm start` in both the client and server side, the project has set up `npm run dev` which uses **concurrently** to run both the client and server at the same time within one terminal.

#### How-To
Inside the client directory, there is an extensive README.md on client-side.
