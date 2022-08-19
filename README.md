
# Stellar.Webdev 
This project is my latest personal portfolio website. I published it to show how I work and code so feel free to poke around. 

## Main ingredients: 
* Create React App
* p5.js

## Commands
### Start Server
You need to provide a SSL certificate in order to get access to the gyroscope readings in Chrome. You can create a `.env` file with `HTTPS=true` or use this command to start the server:

    HTTPS=true npm start
      
### Build & Deploy
This command will switch to main, compile and upload the project files. Make sure to provide a configuration for `ftp-deploy`.

     npm run deploy

Visit [prinz-arnold.de](https://www.prinz-arnold.de) to see it live!