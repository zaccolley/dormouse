function initAddItemButton(){
	var addItemButton = document.querySelector(".admin-add-item");

	addItemButton.addEventListener("click", function(){
    	getItemPopUpData();
	});
}

function getItemPopUpData(itemId){
	
	if(itemId){

		ajax({ "url": dormouse.url+'/data/item/'+itemId }, function(data){
			addItemPopulatePopUp(data);
		});

	}else{
		addItemPopulatePopUp();
	}

	displayPopUp();
}


function addItemPopulatePopUp(json){

	var popup =  document.querySelector('.popup');
	var popupTools =  document.querySelector('.popup_tools');

	if(json){	
		var data = json.output;
		var item = data.items[0];

		popup.id = item.id;

		var price = +item.price.value;
		price = price.formatMoney(2);
	}

	var item = {};

	var img = document.querySelector('.popup__img img');
	if(item.img != 0){
		img.setAttribute('src', dormouse.url+"/images/"+item.id+".jpg");
		img.setAttribute('alt', "Image of '"+item.name+"'");
	}else{	
		img.setAttribute('src', "http://placekitten.com/200/200");
		img.setAttribute('alt', "Placeholder image of '"+item.name+"'");
	}

	var details = document.querySelector('.popup .details');

	details.innerHTML = "<div class='popup-admin'>";
	
	if(json){

		details.innerHTML +=
			"<label>Name: </label><input required type='text'class='details-title' placeholder='Enter your item name' value='"+item.name+"'>
			<label>Category: </label><select required class='details-cat'><option>Select your category</option></select>
			<label>Description: </label><textarea required class='details-desc' placeholder='Description for your item goes here' value='"+item.desc+"'></textarea>
			<label>Price: <span class='details-price-currency'>("+item.price.currency+")</span></label><input required class='details-price' inputmode='numeric' placeholder='0.00' value="+price+">";

	}else{
		
		details.innerHTML +=
			"<label>Name: </label><input autofocus required type='text'class='details-title' placeholder='Enter your item name'>
			<label>Category: </label><select required class='details-cat'><option>Select your category</option></select>
			<label>Description: </label><textarea required class='details-desc' placeholder='Description for your item goes here'></textarea>
			<label>Price: </label><input required class='details-price' inputmode='numeric' placeholder='0.00'>";

	}

	details.innerHTML += "</div>";

	ajax({ url: dormouse.url+'/data/category' }, function(json){
		var categories = json.output.categories;

		var output = "<option value='#'>Select your category</option>"; 

		categories.forEach(function(category){
			var catName = ""+category.name;
			var catId = category.id;

			output += "<option value='"+catId+"'>"+catName+"</option>";
		});

		var detailsCats = document.querySelector('.popup .details-cat');

		detailsCats.innerHTML = output;

	});

	var add = document.querySelector('.popup .add');

	
	if(json){
		add.innerHTML = "<h2 class='add-title'>Update in system</h2>";
		add.innerHTML += "<input class='amount' type='number' inputmode='numeric' min='1' value='"+item.stock+"'>";
		add.innerHTML += "<button class='add-button'>Update</button>";
	}else{
		add.innerHTML = "<h2 class='add-title'>Add to system</h2>";
		add.innerHTML += "<input class='amount' type='number' inputmode='numeric' min='1' value='1'>";
		add.innerHTML += "<button class='add-button'>Add</button>";
	}
	

	var popup = document.querySelector('.popup');
	var addButton = popup.querySelector('.popup_tools .add button');
	var addAmount = popup.querySelector('.popup_tools .add .amount');

	add.querySelector('button').addEventListener("click", function(){

		var name = ""+popup.querySelector('input.details-title').value.trim();
		var catId = +popup.querySelector('select.details-cat').value;
		var desc = ""+popup.querySelector('textarea.details-desc').value;
		var price = +popup.querySelector('input.details-price').value.trim();
		var stock = +addAmount.value;

		var item = {
			"name": name,
			"desc": desc,
			"price": price,
			"stock": stock,
			"img": "false",
			"cat": catId
		};

		if(!name || name == ''){
			alertMessage('Oops - Enter a name', 'warning');
		}
		else if(!desc || desc == ''){
			alertMessage('Oops - Enter a description', 'warning');
		}
		else if(!price || price == '' || isNaN(price)){
			alertMessage('Price must be a number', 'error');
		}
		else if(isNaN(catId)){
			alertMessage('Oops - Pick a category', 'warning');
		}else{

			if(itemId){
				updateItem(itemId, [item]);
			}else{
				addItems([item]);
			}

			closePopUp();
			alertMessage('Added "'+name+'"" to system', 'success');
		}

	});


}