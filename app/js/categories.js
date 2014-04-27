// categories

function addCategories(categories){
	/*

	categories must be in an array

	*/
	var preparedData = JSON.stringify({ category: categories });

	ajax({ url: dormouse.url+'/data/category', request: 'POST', data: preparedData }, function(data){
		getCategories("edit");
		getItems();
	});	
}

function deleteCategories(catId){
	ajax({ url: dormouse.url+'/data/category/'+catId, request: 'DELETE' }, function(data){

		if(data.output.errors.length){
			var errorOutput = "Something went wrong database side";

			// 23 000 means 'Integrity constraint violation', foreign key stuff
			if(data.output.errors[0][0] == "23000"){
				errorOutput = "Can't delete category with items in.";
			}

			alertMessage(errorOutput, "error");
		}else{
			alertMessage("Deleted '"+catId+"' successfully!", "success");
			getCategories("edit");
		}			

	});	
}

function patchCategories(catId, catName){
	var preparedData = JSON.stringify({ category: catName });

	ajax({ url: dormouse.url+'/data/category/'+catId, request: 'PATCH', data: preparedData }, function(data){
		getCategories();
		getItems();
	});	
}

function getCategories(type){
	ajax({ url: dormouse.url+'/data/category' }, function(json){
		populateCategories(json, type);
	});
}

function populateCategories(json, type){
	var data = json.output;
	var output = '';
	
	var catList = document.querySelector('.categories');
	
	// if we have some data
	if(data && data != ''){

		data.categories.forEach(function(category){
			var catName = category.name;
			var catId = category.id;

			if(type == "edit"){
				output += "<li><a class='category--editable' id='cat-"+catId+"'>"+catName+"<button id='"+catId+"' class='admin-button delete-category'>Delete</button></a></li>";
			}else{
				output += "<li><a id='cat-"+catId+"' href='"+dormouse.url+"/category/"+catId+"'>"+catName+"</a></li>";
			}
		});

		if(data.errors && data.errors != ''){
			output += "<div class='error-message'>"+data.errors+"</p></div>";
		}

	}else{
		output += "<li><em>Oops&hellip; Can't find any categories!</em> <a href='./' class='no-cats-action'>Try refreshing?</a></li>";
	}

	if(type == "edit"){
		output += "<li class='add-new-category'><input type='text' placeholder='Add new category'><button class='admin-button add-category'>Add</button></li>";
	}

	catList.innerHTML = output;

	if(type == "edit"){
		categoriesEditListeners();
	}else{
		categoriesListeners();
	}

}

function categoriesListeners(){
	var categories = document.querySelector('.categories');
	categories.removeEventListener('click', categorySelect, false);	

	categories.addEventListener('click', categorySelect, false);
}

function categorySelect(e){

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

}

function categoriesEditListeners(){
	var categories = document.querySelector('.categories');
	categories.removeEventListener('click', categorySelect, false);	

	var deleteCategoryButtons = document.querySelectorAll('.categories li .category--editable .delete-category');

	for(var i = 0; i < deleteCategoryButtons.length; i++){
		var deleteCategoryButton = deleteCategoryButtons[i];

		deleteCategoryButton.removeEventListener('click', categoryDelete);
		deleteCategoryButton.addEventListener('click', categoryDelete);
	}

	var addCategoryButton = document.querySelector('.categories li.add-new-category .add-category');

	addCategoryButton.removeEventListener('click', categoryAdd);
	addCategoryButton.addEventListener('click', categoryAdd);
}

function categoryDelete(e){
	var catId = e.target.id;

	deleteCategories(catId);
}

function categoryAdd(e){
	var addCategoryInput = document.querySelector('.categories li.add-new-category input');
	var catName = addCategoryInput.value;

	if(catName && catName != ""){
		addCategories([catName]);
		
		// reset
		addCategoryInput.value = "";
		
		alertMessage("'"+catName+"' is now a category!", "success");

	}else{
		alertMessage("Need to type something for category!", "warning");
	}

}