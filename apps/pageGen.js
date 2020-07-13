/*
 * Name: NotPike
 * File: pageGen.js
 * Licence: MIT
 * Function: Builds pages from the parts/ found in public/ 
 */

const path = require('path');
const fs = require('fs');

class PageGen {

    buildPage(content) {
        // Header Bar
        let headerBarPath = path.join(__dirname, '../public/pages/parts/headerBar.html');
        let headerBar = fs.readFileSync(headerBarPath);
        content = content.toString().replace('@linkBar', headerBar);

        // Note Bar
        let noteBarPath = path.join(__dirname, '../public/pages/parts/noteBar.html');
        let noteBar = fs.readFileSync(noteBarPath);
        content = content.toString().replace('@noteBar', noteBar);

        // Footer
        let footerPath = path.join(__dirname, '../public/pages/parts/footer.html');
        let footer = fs.readFileSync(footerPath);
        content = content.toString().replace('@footer', footer);

        return content;
    }

}

module.exports = PageGen;