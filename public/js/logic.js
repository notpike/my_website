/*
 * Name: NotPike
 * File: logic.js
 * Licence: MIT
 */


//Flashing lights and cold hard steel!
//https://www.oreilly.com/library/view/css-cookbook/0596005768/ch03s03.html
function blink(delay) {

    var target = document.body.getElementsByTagName('span');
    for(i = 0; i< target.length; i++) {
        target[i].style.visibility = target[i].style.visibility == 
        'hidden' ? 'visible' : 'hidden';
    }
    setTimeout('blink(' + delay + ')', delay);
}