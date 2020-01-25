# my_website
Hi and welcome to my_website!
 
I spent way too much time learning JS and Node.js just to forget it so I built this website to retain this knowledge! All of this is made from scratch using the native Node.JS's http, path, and fs libraries. None of this was built using a known frame work. I built my site this way to better understand how Node.JS ticks. Because this is all from scratch I would like to stress that this is purely “experimental” and not to be used for production applications. It has not been thrown threw the ringer like many other web application frameworks so it’s safe to assume there’s unknown vulns I did not catch.

This application proxy’s a http web server on 127.0.0.1:5000 into a Nginx web server. Nginx handles all the HTTPS traffic and all the security certificate that are incorporated with that task. Below are the start up commands for both the Dev and Production environments. 


## Dev Environment
```
nodemon index
firefox http://localhost:5000
```

## Live Environment
```
pm2 index.js    // Cold Start
pm2 restart all // After Update
```

## Directory Tree
```
my_website
 ├── apps/             // Node.JS Backend
 ├── log/              // Log for application
 ├── node_modules/     // Libs for application
 ├── public/           // Public facing content
 │    ├── css/
 │    │   ├── 404.css
 │    │   └── pike_style.css
 │    │ 
 │    ├── img/
 │    ├── js/          // Front end JS
 │    │   ├── 404.js
 │    │   └── logic.js 
 │    │
 │    ├── krad/        // Shhhh, secret hacker stash  ;)
 │    ├── pages/       // Web pages for site
 │    │   ├── 404.html
 │    │   ├── about.html
 │    │   ├── contact.html
 │    │   ├── login.html
 │    │   ├── krad.html
 │    │   └── notes.html
 │    │
 │    ├── robots.txt
 │    └── index.html   // Index 
 │
 ├── index.js          // Node.JS Main 
 └── README.md
 ```