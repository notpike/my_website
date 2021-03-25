/*
 * Name: NotPike
 * File: logger.js
 * Licence: MIT
 */

const fs = require ('fs');

/* Known bugs, 2nd level *EMPTY* missing root |, large branches have miss placed | as well */

class Krad {
   
    listDir(path) {
        return fs.readdirSync(path);
    }

    buildTree(path, level, last) {

        // Find the path to the root dir
        let indexPath = path.search('krad');      // Find index of where 'krad' is
        let rootPath = path.slice(indexPath);     // Then slice it from path

        let rootDir = this.listDir(path);         // List files in dir
        let links = "";                           // Init return string

        // IF DIR IS EMPTY
        if(rootDir.length == 0) {
            var tabs;
            for(tabs=0; tabs < level; tabs++) {
                if( tabs < level && !last ) {     // Put a "|" every 8 spaces per level
                    links += " ".repeat(8) + "|";
                } else {                          // Last level just gets 8 spaces
                    links += " ".repeat(8);
                }
            } 

            links += " ".repeat(9) + "└────  "  + "*EMPTY*" + "<br/>";

            // Newline twice and add "|" to tree
            if(!last) {          
                let returns;
                for(returns=0; returns < 2; returns++) {
                    for(tabs=0; tabs < level; tabs++) {
                        links += " ".repeat(8) + "|";
                    }
                        links += "<br/>";
                }
            } else {
                last = false;
            }
        }

        var file;
        for(file=0; file < rootDir.length; file++) {

            // IF LAST FILE
            if(file == rootDir.length - 1 && rootPath === 'krad') last = true;

            // Don't list .gitignore
            if(rootDir[file] === '.gitignore') continue;
            
            // IF DIR
            // NOW WITH MORE RECURSION!!
            let tempPath =  path + "/"+rootDir[file];
            let isDir = fs.lstatSync(tempPath).isDirectory()
            if(isDir) {
                var tabs;
                for(tabs=0; tabs < level; tabs++) {
                    if(tabs < level && !last) {
                        links += " ".repeat(8) + "|"
                    } else {
                        links += " ".repeat(8)
                    }
                } 

                links += " ".repeat(8) + "└────  "  + rootDir[file] + "/<br/>";
                level++;
                links += this.buildTree(tempPath, level, last);
                level--;
                continue;
            }
            
            // IF FILE
            if(file != rootDir.length - 1) { 

                var tabs;
                for(tabs=0; tabs < level; tabs++) {
                    if(tabs < level && !last) {
                        links += " ".repeat(8) + "|"
                    } else {
                        links += " ".repeat(8)
                    }
                }

                links += " ".repeat(8) + "├────  <a href=\"../" + rootPath + "/" + rootDir[file] + "\" download title=\"" + (fs.statSync(path + "/" + rootDir[file]).size / (1024 * 1024)).toFixed(2) + "Mb \">"; 
                links += rootDir[file] + "</a><br/>";
                
                // TODO, Fix this loop
                for(tabs=0; tabs <= level; tabs++) {
                    if(!last) {
                        links += " ".repeat(8) + "|";
                     } else {
                        links += " ".repeat(8 * (level + 1) ) + "|";
                        break;
                    }
                }
                links += "<br/>"

            // ELSE LAST FILE    
            } else { 

                var tabs;
                for(tabs=0; tabs < level; tabs++) {
                    if(tabs < level && !last) {
                        links += " ".repeat(8) + "|"
                    } else {
                        links += " ".repeat(8)
                    }
                }
                
                links +=  " ".repeat(8)  + "└────  <a href=\"../" + rootPath +  "/" + rootDir[file] + "\" download >" 
                links += rootDir[file] + "</a><br/>"
                
                // Newline twice and add "|" to tree
                if(!last) {           
                    let returns;
                    for(returns=0; returns < 2; returns++) {
                        for(tabs=0; tabs < level; tabs++) {
                            links += " ".repeat(8) + "|";
                        }
                            links += "<br/>";
                    }
                } else {
                    last = false;
                }
            }
        }

        return links;
    }

    buildContent(content) {
        let path = __dirname.replace('apps','public/krad'); // Go back one folder then move to public/krad
        let level = 0;                                      // How Many folders deep are we in?
        let last = false;                                   // If last file in dir
        
        // BUILD TREE
        let links =  "      krad/<br/>";
        links += this.buildTree(path, level, last);
        links += "<br/><br/>     user@dev:~/krad$ <span class=\"blink\">&#x2588;</span><br/><br/>"
       
        return content.replace('@krad', links);
    }
}

// Exportable
module.exports = Krad;