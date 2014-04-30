// found at: http://jsfiddle.net/rwaldron/j3vST/

function findById(source, id){
	return source.filter(function(obj){
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

// found at: http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript

function replaceAll(find, replace, str){
	return str.replace(new RegExp(find, 'g'), replace);
}

// original found at: https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

function handleFiles(files){
	var file = files[0];
	var imageType = /image.*/;

	var existingImg = document.querySelector(".injected-img");

	if(existingImg){
		existingImg.parentNode.removeChild(existingImg);
	}

	var img = document.createElement("img");
	img.classList.add("injected-img");
	img.file = file;
	document.querySelector('.popup__img .alter-img').appendChild(img);

	var reader = new FileReader();
	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
	reader.readAsDataURL(file);
}

function sendFiles() {
	var imgs = document.querySelectorAll(".injected-img");
	var img = imgs[0];

	console.log(img, img.file);
}