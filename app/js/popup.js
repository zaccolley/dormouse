// popup

function getPopUpData(itemId){
	var options = {};

	options.url = 'data/item/'+itemId;

	ajax(options, function(data){
		populatePopUp(data);
	});	

	displayPopUp();
}

function populatePopUp(json){
	var data = json.output;
	var item = data.items[0];

	var popup =  document.querySelector('.popup');

	var img = document.querySelector('.popup__img');
	if(item.img != 0){
		img.setAttribute('src', "images/"+item.id+".jpg");
		img.setAttribute('alt', "Image of '"+item.name+"'");
	}else{	
		img.setAttribute('src', "http://placekitten.com/200/200");
		img.setAttribute('alt', "Placeholder image of '"+item.name+"'");
	}

	var details = document.querySelector('.popup .details');

	details.innerHTML =
			"<h1 class='details-title'>"+item.name+"</h1>
			<p class='details-cat'>Found in "+item.cat.name+"</p>
			<p class='details-desc'>"+item.desc+"</p>
			<p class='details-price'>"+item.price+"</p>
			<p class='details-stock'>"+item.stock+" left</p>"
}

function displayPopUp(){
	var content = document.querySelector('.content-container');
	content.classList.add('blurred');

	var popup = document.querySelector('.popup');
	popup.classList.remove('popup--hidden');
	
	closeBasket();
}

function closePopUp(){
	var popup = document.querySelector('.popup');
	var close = document.querySelector('.popup_close');

	popup.addEventListener('click', function(e){
		if(e.target == e.currentTarget || e.target.className == 'popup_close' || e.target.parentNode.className == 'popup_close'){
			popup.classList.add('popup--hidden');

			var content = document.querySelector('.content-container');
			content.classList.remove('blurred');
		}
	});
}