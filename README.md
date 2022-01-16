# tips were provided: https://www.youtube.com/watch?v=w3RFk35synM&list=PL4glSN_6E9amotmiyQ6fIi_zdUnog88wi&index=30&t=796s

# HOW TO GENERATE INSTANCE

1. Create a new react app with: ```npx create-react-app <app name> ```
2. Create a new Github repo at: github.com/new

3. Go to the directory in terminal and type: ```git add . ``` and ``` git commit -m "initial commit" ```
4. Then run the commit code linked to the github repo (this will push all project files to github):
5. ```Remote add origin <link to repo>```
6 ```git branch -M main```
7 ```git push -u origin main```

# INSTALL FROM BARE VM

1. Install a new instance of Ubuntu 20.04 64bit
2. Login as root
3. disable apache2 if installed with the commands below (this uses nginx):
4. ```systemctl stop apache2```
5. ```systemctl disable apache2```
6. ```sudo apt remove apache2```

1. ```apt clean all```
2. ```apt update```
3. ```apt dist-upgrade```
4. ```sudo apt-get update ```
5. ```sudo apt-get upgrade```
6. ```sudo apt-get nginx```
7. The web server will now be running if you go to the ```<machine ip address> ```
7.1 It will show either the apache2 page or nginx, if apache2 go to ```<machine ip address>/index.nginx-debian.html```
8. ```apt install npm```
9. ```apt install git```
  
# CLONE GITHUB REPO
1. ```cd /home```
2. Get the link from Github of the repo to clone eg: ```git clone https://github.com/Tauum/EdOwlReact.git```  
3. ```cd /<project name>```
4. ```npm install```
5. ```npm run build ```

# DEPLOY REACT APPLICATION
1. Copy the built repository to ```/var/www/html``` eg: ```cp -r build/* /var/www/html```

# DOMAIN SETUP / CONFIGURATION
1. Go to platform hosting domain (it may take up to 48 hours to fully set after completion)
2. Type in a new: ``` A type record``` and pointing to: ```<machine ip address>```
3. type in a new ```www type record``` and pointing to: ```<machine ip address>```
4. now you can test the website domain


# HTTPS SETUP
 1. Trying to go to ```https://<domain>``` will fial because ssl requirements are not met
 2. install certbot ```https://certbot.eff.org/``` with ```sudo apt install certbot python3-certbot-nginx```
 3. Then install a certificate with ``` certbot --nginx -d <domain> -d www.<domain>```
 4. Enter an email address
 5. follow the rest of the steps
 6. ```sudo nginx -s reload```

# AUTOMATIC RENEW OF HTTPS CERTIFICATES from this documentation 
https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
https://eff-certbot.readthedocs.io/en/stable/using.html#setting-up-automated-renewal
1. ```sudo certbot renew --dry-run```                                  1. min. hour. day. week. month,
2. this might work havent tested it: ammend ```vi /etc/crontab``` add ```0 0 0 0 4,8,12 root certbot renew --dry-run```

# AUTH0 CONFIGURATION 


# SPRINGBOOT BUILD


# SPRINGBOOT DEPLOY


# COPY SSL FROM WEB-APP TO SPRINGBOOT


# APP & SPRINGBOOT LINK


# MySQL installation

  
 






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
