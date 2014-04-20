// popup

function getPopUpData(itemId){
	
	ajax({ "url": dormouse.url+'/data/item/'+itemId }, function(data){
		populatePopUp(data);
	});	

	displayPopUp();
}

function populatePopUp(json){
	var data = json.output;
	var item = data.items[0];

	var popup =  document.querySelector('.popup');
	var popupTools =  document.querySelector('.popup_tools');

	popup.id = item.id;

	var img = document.querySelector('.popup__img img');
	if(item.img != 0){
		img.setAttribute('src', dormouse.url+"/images/"+item.id+".jpg");
		img.setAttribute('alt', "Image of '"+item.name+"'");
	}else{	
		img.setAttribute('src', "http://placekitten.com/200/200");
		img.setAttribute('alt', "Placeholder image of '"+item.name+"'");
	}

	var details = document.querySelector('.popup .details');

	var price = +item.price.value;
	price = price.formatMoney(2);

	details.innerHTML =
			"<h1 class='details-title'>"+item.name+"</h1>
			<p class='details-cat'>Found in "+item.cat.name+"</p>
			<p class='details-desc'>"+item.desc+"</p>
			<p class='details-price'><span class='details-price-currency'>"+item.price.currency+"</span>"+price+"</p>
			<p class='details-stock'>"+item.stock+" left</p>";


	var add = popupTools.querySelector('.add');

	var addOutput =
		'<h2 class="add-title">Add to basket</h2>
		<select name="amount" class="amount">';

	addAmount = 30;

	for(var i = 1; i <= addAmount; i++){

		addOutput += '<option value="'+i+'">';

		if(i < 10){
			addOutput += '0'+i;
		}else{
			addOutput += i;
		}

		addOutput += '</option>';

	}
			
	addOutput += '</select>
				  <button class="add-button">Add</button>';

	add.innerHTML = addOutput;

	popupTools.querySelector('.popup_tools--admin').innerHTML = '<button class="edit-button">Edit</button>';

	initAddToBasketButtonListener();
	initEditItemButtonListener();
}

function displayPopUp(){
	var content = document.querySelector('.content-container');
	content.classList.add('content-container--blurred');

	var popup = document.querySelector('.popup');
	popup.classList.remove('popup--hidden');
	
	closeBasket();
}

function closePopUp(){
	var popup = document.querySelector('.popup');

	popup.addEventListener('click', function(e){
		if(e.target == e.currentTarget || e.target.className == 'popup_close' || e.target.parentNode.className == 'popup_close'){
			hidePopUp();
		}
	});
}

function hidePopUp(){
	var popup = document.querySelector('.popup');

	popup.classList.add('popup--hidden');

	popup.querySelector('.popup_tools .amount').selectedIndex = 0;

	var content = document.querySelector('.content-container');
	content.classList.remove('content-container--blurred');

	if(dormouse.category){
		history.pushState(null, "", dormouse.url+"/category/"+dormouse.category);
	}else{
		history.pushState(null, "", dormouse.url);
	}
}

function initAddToBasketButtonListener(){
	var popup = document.querySelector('.popup');
	var addButton = popup.querySelector('.popup_tools .add .add-button');
	var addAmount = popup.querySelector('.popup_tools .add .amount');

	if(addButton){

		addButton.addEventListener('click', function(){
			var amountToAdd = +addAmount.value;
			var basketAmount = getBasketItemAmount(popup.id);

			var amount = amountToAdd + basketAmount;
			alterBasketItem(popup.id, amount);

			alertMessage('Added '+amountToAdd+'! ('+amount+' in the basket)', 'success');

		});

	}

}

function initEditItemButtonListener(){	
	var popup = document.querySelector('.popup');
	var editButton = popup.querySelector('.popup_tools .edit-button');

	if(editButton){

		editButton.addEventListener('click', function(){
			
			hidePopUp();

			setTimeout(function(){
				getItemPopUpData(popup.id);
				displayPopUp();
	
				alertMessage('Time to edit!', 'info');
			}, 550);

		});

	}
}