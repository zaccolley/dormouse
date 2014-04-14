// found at: http://jsfiddle.net/rwaldron/j3vST/

function findById(source, id){
    return source.filter(function(obj){
        // coerce both obj.id and id to numbers 
        // for val & type comparison
        return +obj.id === +id;
    })[0];
}

// found at: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c,  
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };