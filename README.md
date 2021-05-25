# ReCAT App

The app is deployed at [recatapp.netlify.app](https://recatapp.netlify.app/) and uses a default `sub_id` with The Cat API when favouriting, voting up and voting down.
To simulate user accounts you can change the `sub_id` by adding the `userId` query string parameter in the url and setting it to any integer greater than or equal to `0` [recatapp.netlify.app/#/?userId=0](https://recatapp.netlify.app/#/?userId=0)

## Building the app

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- npm (installed with Node.js)

### Quick Start

- `npm install`
- `npm start`

Launches the webpack dev server on port 8080 go to http://localhost:8080

The port can be changed from within `webpack.dev.js`

### Production Build

- `npm run build`

Builds into the `/dist` directory using the webpack.prod.js config file.

## Future Developments

- Display an error message to the user if favourite / vote / fetch requests fail.
- Handle loading multiple pages of images.
- Sort / filter images.
- Dynamically resize the upload box so the buttons below are always in view when the window / device isn't tall enough (within reason).
