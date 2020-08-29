/*
 * Name: NotPike
 * File: math.js
 * Licence: MIT
 */


/* ====================== WAVELENGTH ====================== */

function wl_clear() {
    document.getElementById("wl_wl").value = "";
    document.getElementById("wl_c").value = "299792458";
    document.getElementById("wl_f").value = "";   
    document.getElementById("wl_select_wl").selectedIndex = 0;
    document.getElementById("wl_select_freq").selectedIndex = 1;   
}

function wl() {
    var λ = document.getElementById("wl_wl");
    var c = document.getElementById("wl_c");
    var f = document.getElementById("wl_f");

    var length_select = document.getElementById("wl_select_wl");
    var freq_select = document.getElementById("wl_select_freq");

    if((c && c.value) && (f && f.value)) {            // If c and f is given
        if(!isNaN(c.value)) {                         // Is c a number?
            if(!isNaN(f.value)) {                     // Is f a number?

                if(freq_select.value == "wl_mhz") {        // MHz to Hz
                    f = f.value * 1000000;
                } else if(freq_select.value == "wl_khz") { // KHz to Hz
                    f = f.value * 10000;
                } else if(freq_select.value == "wl_hz") {  // Hz
                    f = f.value;
                } else if(freq_select.value == "wl_ghz") { // GHz to Hz
                    f = f.value * 1000000000;
                } 

                λ = c.value / f;

                if(length_select.value == "wl_m") {   // Meters
                    ;
                } else if(length_select.value == "wl_cm") {
                    λ *= 100;
                } 

                document.getElementById("wl_wl").value = λ;
            } else {                          
                alert("c is not a valid entry")   // c isn't valid
            }
        } else {
            alert("f is not a valid entry")       // f isn't valid
        }
    }

    else if((λ && λ.value) && (c && c.value)) {       // If λ and c is given
        if(!isNaN(λ.value)) {                         // Is λ a number?
            if(!isNaN(c.value)) {                     // Is c a number?

                if(length_select.value == "wl_m") {         // meters
                    λ = λ.value;
                } else if(length_select.value == "wl_cm") { // cm to m
                    λ = λ.value  * 0.01;
                } 

                f = λ * c.value;

                if(freq_select.value == "wl_mhz") {        // MHz to Hz
                    f *= 0.000001;
                } else if(freq_select.value == "wl_khz") { // KHz to Hz
                    f *= 0.001;
                } else if(freq_select.value == "wl_hz") {  // Hz
                    ;
                } else if(freq_select.value == "wl_ghz") { // GHz to Hz
                    f *= 0.000000001;
                }

                document.getElementById("wl_f").value = f;
            } else {                          
                alert("c is not a valid entry")   // c isn't valid
            }
        } else {
            alert("f is not a valid entry")       // f isn't valid
        }
    }

    else if((λ && λ.value) && (f && f.value)) {       // If λ and f is given
        if(!isNaN(λ.value)) {                         // Is λ a number?
            if(!isNaN(f.value)) {                     // Is f a number?

                if(length_select.value == "wl_m") {         // meters
                    λ = λ.value;
                } else if(length_select.value == "wl_cm") { // cm to m
                    λ = λ.value  * 0.01;
                } 


                if(freq_select.value == "wl_mhz") {        // MHz to Hz
                    f = f.value * 0.000001;
                } else if(freq_select.value == "wl_khz") { // KHz to Hz
                    f = f.value * 0.001;
                } else if(freq_select.value == "wl_hz") {  // Hz
                    f = f.value;
                } else if(freq_select.value == "wl_ghz") { // GHz to Hz
                    f = f.value * 0.000000001;
                }

                c = λ * f;

                document.getElementById("wl_c").value = c;
            } else {                          
                alert("c is not a valid entry")   // c isn't valid
            }
        } else {
            alert("f is not a valid entry")       // f isn't valid
        }
    }            
    else {
        alert("Please enter in some numbers (Wavelength)");    // No values where given
    }
}        


/* ====================== OHM's LAW ====================== */

function ohm_clear() {
    document.getElementById("ohm_v").value = "";
    document.getElementById("ohm_i").value = "";
    document.getElementById("ohm_r").value = "";   
    document.getElementById("i_select").selectedIndex = 0;
    document.getElementById("r_select").selectedIndex = 0;   
}

function ohm() {
    var v = document.getElementById("ohm_v");
    var i = document.getElementById("ohm_i");
    var r = document.getElementById("ohm_r");

    var amp = document.getElementById("i_select");
    var ohm = document.getElementById("r_select");

    if((i && i.value) && (r && r.value)) {        // If I and R is given
        if(!isNaN(i.value)) {                     // Is I a number?
            if(!isNaN(r.value)) {                 // Is R a number?
                if(amp.value == "i_a") {          // Must be in (A)
                    i = i.value;
                } else if(amp.value == "i_ma") {
                    i = i.value * 0.001;
                } 

                if(ohm.value == "r_o") {          // Must be in (Ω)
                    r = r.value;
                } else if(ohm.value == "r_ko") {
                   r = r.value * 1000;
                } else if(ohm.value == "r_mo") {
                   r = r.value * 1000000;
                }

                v = i * r;
                document.getElementById("ohm_v").value = v;
            } else {                          
                alert("I is not a valid entry")   // R isn't valid
            }
        } else {
            alert("I is not a valid entry")       // I isn't valid
        }
    }

    else if((v && v.value) && (i && i.value)) {   // If V and I is given
        if(!isNaN(v.value)) {                     // Is V a number?
            if(!isNaN(i.value)) {                 // Is I a number?
                if(amp.value == "i_a") {          // Must be in (A)
                    i = i.value;
                } else if(amp.value == "i_ma") {
                    i = i.value * 1000;
                } 

                if(ohm.value == "r_o") {          // (Ω)
                    r = v.value / i;
                } else if(ohm.value == "r_ko") {  // (kΩ)
                    r = v.value / i;
                    r *= 1000
                } else if(ohm.value == "r_mo") {  // (mΩ)
                    r = v.value / i;
                    r *= 1000000
                } 
                document.getElementById("ohm_r").value = r;
            } else {                          
                aleit("I is not a valid entry")   // I isn't valid
            }
        } else {
            alert("V is not a valid entry")       // V isn't valid
        }
    } 

    else if((v && v.value) && (r && r.value)) {   // If V and R is given
        if(!isNaN(v.value)) {                     // Is V a number?
            if(!isNaN(r.value)) {                 // Is R a number?
                if(ohm.value == "r_o") {          // Must be in (Ω)
                    r = r.value;
                } else if(ohm.value == "r_ko") {
                    r = r.value * 1000;
                } else if(ohm.value == "r_mo") {
                    r = r.value * 1000000;
                }

                if(amp.value == "i_a") {          // (A)
                    i = v.value / r;
                } else if(amp.value == "i_ma") {  // (mA)
                    i = v.value / r;
                    i *= 1000;
                }
                document.getElementById("ohm_i").value = i;
            } else {                          
                alert("R is not a valid entry")   // R isn't valid
            }
        } else {
            alert("V is not a valid entry")       // V isn't valid
        }
    }  
    
    else {
        alert("Please enter in some numbers (Ohm's Law)");    // No values where given
    }
}