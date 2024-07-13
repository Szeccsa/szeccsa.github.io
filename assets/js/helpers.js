/* HELPERS: */
function setCookie(c_name,value,expiredays,path,domain) {
    expiredays = parseInt(expiredays);
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie = c_name + "=" +escape(value)
        +((expiredays==null) ? "" : ";expires="+exdate.toUTCString())
        +";path="+(typeof(path)=="undefined" ? "/" : path)
        +(typeof(domain) != 'undefined' ? ";domain="+domain : "");
}

function getCookie(c_name) {
    if (document.cookie.length>0) {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

Number.prototype.dollarize = function () {
    num =this.toFixed(0);
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(num)) {
        num = num.replace(rgx, '$1 $2');
    }
    return num;
}

// remove no-js class
var html = document.getElementsByTagName('html')[0] || document.documentElement || '';
if (html) {
	html.className = html.className.split('no-js').join('');
}