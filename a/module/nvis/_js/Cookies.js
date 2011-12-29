// sets a cookie
var setCookie = function(name,value,days) {
    if (days) {
        var date = new Date()
        date.setTime(date.getTime()+(days*24*60*60*1000))
        var expires = "; expires="+date.toGMTString()
    }
    else var expires = ""
    document.cookie = name+"="+value+expires+"; path=/"
}

// gets a cookie
var getCookie = function(name) {
    var nameEQ = name + "="
    var ca = document.cookie.split(';')
    for(var i=0;i < ca.length;i++) {
        var c = ca[i]
        while (c.charAt(0)==' ') c = c.substring(1,c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
    }
    return null
}

/*
* getAllCookies
* get all cookies from the document and
* returns an array of objects in ther form:
* {
*	name: cookieName,
*	value: cookieValue
*  }
*/
var getAllCookies = function(){
	var r = new Array()
	var u = document.cookie.split(";")
	for(var i=0;i<u.length;i++)
		r.push({
			name: u[i].split("=")[0],
			value: u[i].split("=")[1]
		})
	return r;
}

// deletes a cookie
var deleteCookie =  function(name) {
   	setCookie(name,"",-1)
}

// deletes al cookies from the document
var deleteAllCookies = function(){
	var u = document.cookie.split(";")
	for(var i=0;i<u.length;i++)
		deleteCookie(u[i].split("=")[0])
}