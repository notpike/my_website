/*
 * Name: NotPike
 * File: logger.js
 * Licence: MIT
 */

const fs = require ('fs');


// YOU SEE WHAT HAPPENDS WHEN YOU DON'T DESIGN YOUR SYSTEM WELL?
// YOU HAVE TO DO HACKY THINGS LIKE THIS TO MAKE IT WORK! :D
class Krad {

    listDir(path) {
        return fs.readdirSync(path);
    }

    buildContent(content) {
        let path = __dirname.replace('apps','public/krad'); // go back one folder then move to public/krad
        let rootDir = this.listDir(path);

        let links = "          krad/<br/>";

        var i;
        for(i=0; i < rootDir.length; i++) {
            if(rootDir[i] === '.gitignore') { // Don't list .gitignore
                continue;
            } 

            if(i != rootDir.length - 1) { 
                links += "            ├────  <a href=\"../krad/" + rootDir[i] + "\" download >" + rootDir[i] + "</a><br/>            |<br/>"; 
            } else { // last item
                links += "            └────  <a href=\"../krad/" + rootDir[i] + "\" download >" + rootDir[i] + "</a><br/>"; 

            }
        }

        return content.replace('ThisIsSomeHackyCode', links);

    }
}

// Exportable
module.exports = Krad;