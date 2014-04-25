// categories

function addCategories(categories){
	var preparedData = JSON.stringify({ category: categories });

	ajax({ url: 'data/category', request: 'POST', data: preparedData }, function(data){
		getCategories();
	});	
}

function deleteCategories(catId){
	ajax({ url: 'data/category/'+catId, request: 'DELETE' }, function(data){
		getCategories();
	});	
}

function patchCategories(catId, catName){
	var preparedData = JSON.stringify({ category: catName });

	ajax({ url: 'data/category/'+catId, request: 'PATCH', data: preparedData }, function(data){
		getCategories();
	});	
}

function getCategories(){
	ajax({ url: dormouse.url+'/data/category' }, function(json){
		populateCategories(json);
	});
}

function populateCategories(json){
	var data = json.output;
	var output = '';
	
	var catList = document.querySelector('.categories');
	
	// if we have some data
	if(data && data != ''){

		data.categories.forEach(function(category){
			var catName = category.name;
			var catId = category.id;

			output += "<li><a id='cat-"+catId+"' href='"+dormouse.url+"/category/"+catId+"'>"+catName+"</a></li>";
		});

		if(data.errors && data.errors != ''){
			output += "<div class='error-message'>"+data.errors+"</p></div>";
		}

	}else{
		output += "<li><em>Oops&hellip; Can't find any categories!</em> <a href='./' class='no-cats-action'>Try refreshing?</a></li>";
	}

	catList.innerHTML = output;

	categoriesListeners();

}

function categoriesListeners(){
	var categories = document.querySelector('.categories');

	categories.addEventListener('click', function(e){

		if(e.target != e.currentTarget){
			var clickedElm = e.target;

			while(clickedElm.id.indexOf('cat-') == -1){
        		clickedElm = clickedElm.parentNode;
    		}

    		catId = clickedElm.id.substring(4);

    		var url = clickedElm.href;
    		
    		if(url == document.location.href){
    			history.pushState(null, "", dormouse.url);
    		}else{
    			history.pushState(null, "", url);
    		}
    		
    		routeUrl();

			e.preventDefault();
		}


	}, false);
	
}