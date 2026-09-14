
# Stellar.Webdev 
This project is my latest personal portfolio website. I published it to show how I work and code so feel free to poke around. 

## Main ingredients: 
* Next.js (App Router, static export)
* p5.js

## Commands
### Start Server

    npm run dev

You need a SSL certificate in order to get access to the gyroscope readings in Chrome. This command creates one for you:

    npm run dev:https

### Build
This command compiles the project into a static site in `out/`. No Node.js runtime is needed to host it — upload the contents of `out/` to any web server.

    npm run build

### Preview the Build
This command serves the compiled site locally, so you can test the static output before uploading it.

    npm run serve

Visit [prinz-arnold.de](https://www.prinz-arnold.de) to see it live!
