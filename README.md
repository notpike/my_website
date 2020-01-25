# my_website

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