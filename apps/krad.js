/*
 * Name: NotPike
 * File: logger.js
 * Licence: MIT
 */

const fs = require ('fs');

/* Known bugs, 2nd level *EMPTY* missing root |, large branches have miss placed | as well */


// YOU SEE WHAT HAPPENDS WHEN YOU DON'T DESIGN YOUR SYSTEM WELL?
// YOU HAVE TO DO HACKY THINGS LIKE THIS TO MAKE IT WORK! :D
class Krad {
   
    listDir(path) {
        return fs.readdirSync(path);
    }

    buildTree(path,level) {
        console.log(path);
        let indexPath = path.search('krad');
        let rootPath = path.slice(indexPath)
        console.log(rootPath);

        let rootDir = this.listDir(path); // List files in dir
        let links = "";                   // Init return var

        // IF EMPTY
        if(rootDir.length == 0) {
            var offset = 0
            var j;
            for(j=0; j < level; j++) {
                if( j < level - offset) {      // Put a "|" every 8 spaces per level
                    links += " ".repeat(8) + "|";
                } else {                  // Last level just gets 8 spaces
                    links += " ".repeat(8);
                }
            } 

            links += " ".repeat(9) + "└────  "  + "*EMPTY*" + "<br/>";

            // Newline twice and add "|" to tree           
            let gaps;
            for(gaps=0; gaps < 2; gaps++) {
                for(j=0; j < level - offset; j++) {
                    links += " ".repeat(8) + "|";
                }
                    links += "<br/>";
            }
        }

        var i;
        for(i=0; i < rootDir.length; i++) {

            if(rootDir[i] === '.gitignore') {               // Don't list .gitignore
                continue;
            }
            
            // IF DIR
            // NOW WITH MORE RECURSION!!
            let tempPath =  path + "/"+rootDir[i];
            let isDir = fs.lstatSync(tempPath).isDirectory()
            if(isDir) {
                var j;
                for(j=0; j < level; j++) {
                    if(j < level ) {
                        links += " ".repeat(8) + "|"
                    } else {
                        links += " ".repeat(8)
                    }
                } 

                links += " ".repeat(8) + "└────  "  + rootDir[i] + "/<br/>";
                level++;
                links += this.buildTree(tempPath, level);
                level--;
                continue;
            }
            
            // IF FILE
            if(i != rootDir.length - 1) { 

                var j;
                for(j=0; j < level; j++) {
                    if(j < level) {
                        links += " ".repeat(8) + "|"
                    } else {
                        links += " ".repeat(8)
                    }
                }

                links += " ".repeat(8) + "├────  <a href=\"../" + rootPath +  "/" + rootDir[i] + "\" download >" 
                links += rootDir[i] + "</a><br/>";
                

                for(j=0; j <= level; j++) {
                        links += " ".repeat(8) + "|"
                }
                links += "<br/>"

            // Last File    
            } else { 

                var j;
                for(j=0; j < level; j++) {
                    if(j < level) {
                        links += " ".repeat(8) + "|"
                    } else {
                        links += " ".repeat(8)
                    }
                }
                
                links +=  " ".repeat(8)  + "└────  <a href=\"../" + rootPath +  "/" + rootDir[i] + "\" download >" 
                links += rootDir[i] + "</a><br/>"
                
                // Newline twice and add "|" to tree           
                let gaps;
                for(gaps=0; gaps < 2; gaps++) {
                    for(j=0; j < level; j++) {
                        links += " ".repeat(8) + "|";
                    }
                        links += "<br/>";
                }
            }   
        }

        return links;
    }

    buildContent(content) {
        let path = __dirname.replace('apps','public/krad'); // Go back one folder then move to public/krad
        let level = 0;                                      // How Many folders deep are we in?
        let links =  "     krad/<br/>";                     // Start of the tree
        links += this.buildTree(path, level);

        links += "<br/><br/>     user@dev:~/krad$ <span class=\"blink\">&#x2588;</span><br/><br/>"
        return content.replace('ThisIsSomeHackyCode', links);
    }
}

// Exportable
module.exports = Krad;