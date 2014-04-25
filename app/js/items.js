// items

function addItems(items){
	/*

	items must be in the format:

		{ "name":"Item name", "desc":"Item description", "price":50, "stock":10, "img":"false", "cat":5 }

	*/

	var preparedData = JSON.stringify({ item: items });

	ajax({ url: dormouse.url+'/data/item', request: 'POST', data: preparedData }, function(data){
		getItems();
	});	
}

function deleteItems(itemId){
	ajax({ url: dormouse.url+'/data/item/'+itemId, request: 'DELETE' }, function(data){
		getItems();
	});	
}

function updateItems(itemId, itemData){
	var preparedData = JSON.stringify({ item: itemData });

	ajax({ url: dormouse.url+'/data/item/'+itemId, request: 'PATCH', data: preparedData }, function(data){
		getItems();
	});	
}

function initGetItemsListeners(){
	var filterList = document.querySelector('.filter-select');
	var searchBox = document.querySelector('.search-query');

	filterList.addEventListener('change', function(){ getItems(); });
	searchBox.addEventListener('keyup', function(){ getItems(); });
}

function getItems(){

	var filterList = document.querySelector('.filter-select');
	var searchBox = document.querySelector('.search-query');

	var searchQuery = searchBox.value.trim();
	var filterType = filterList.value;

	var options = {};

	if(dormouse.category){
		options.url = dormouse.url+'/data/category/'+dormouse.category+'/item';
	}else{
		options.url = dormouse.url+'/data/item';
	}

	var dataToSend = {};

	if(searchQuery != ''){
		dataToSend.search = searchQuery;
	}

	if(filterType != ''){
		dataToSend.filter = filterType;
	}

	if(dataToSend.search || dataToSend.filter){
		options.data = JSON.stringify(dataToSend);
	}

	ajax(options, function(data){
		populateItems(data);
	});	
}

function populateItems(json){
	var data = json.output;
	var itemList = document.querySelector('.items');
	itemList.innerHTML = '';

	var output = '';


	// if we have some data
	if(data && data != ''){
	

		for(var i in data.items){
			var item = data.items[i];

			var listRadio = document.getElementById('list-display-option');
			var gridRadio = document.getElementById('grid-display-option');		
			
			var displayType = 'list';

			if(gridRadio.checked){
				displayType = 'grid';
			}

			output += "<li class='item-"+displayType+"' id='item-"+item.id+"'>";

			// if the item has an img
			if(item.img != 0){
				output += "<img src='"+dormouse.url+"/images/"+item.id+".jpg' alt='Image of "+item.name+"'>";
			}else{
				output += "<div class='placeholder-img' title='Placeholder image of "+item.name+"'></div>";
			}

			var price = +item.price.value;
			price = price.formatMoney(2);
			
			output +=   "<div class='details'>" +
							"<h1 class='details-title'>" +
								"<a href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.name+"</a>" +
							"</h1>" +
							"<p class='details-desc'>"+item.desc+"</p>" +
						"</div>" +
						"<div class='more-details'>" +
							"<p class='details-cat'>Found in "+item.cat.name+"</p>" +
							"<p class='details-stock'>"+item.stock+" left</p>" +
							"<p class='details-price'>" +
								"<a href='#"+item.name+"' title='More details on "+item.name+"?'><span class='details-price-currency'>"+item.price.currency+"</span>"+price+"</a>" +
							"</p>" +
						"</div>";

			output += "</li>";

		}

		if(data.errors != ''){
			output += "<div class='error-message'>"+data.errors+"</p></div>";
		}
	
	}else{
		output += "<div class='error-message'><em>Oops&hellip; Can't find any items!</em> <a href='./'>Try refreshing?</a></div>";
	}

	itemList.innerHTML = output;

	itemListeners();

}

function itemListeners(){
	var items = document.querySelector('.items');

	items.addEventListener('click', function(e){

		if(e.target != e.currentTarget){
			var clickedElm = e.target;

			while(clickedElm.id.indexOf('item-') == -1){
        		clickedElm = clickedElm.parentNode;
    		}

    		itemId = clickedElm.id.substring(5);
    		getPopUpData(itemId);

    		history.pushState(null, "", dormouse.url+"/item/"+itemId);

		}	

	}, false);
	
}
