function initAdminButtons(){
	initAddItemButton();
	initEditCategoriesButton();
}

function initAddItemButton(){
	var addItemButton = document.querySelector(".admin-add-item");

	addItemButton.addEventListener("click", function(){
    	getPopUpData(0, "add");
	});
}

function initEditCategoriesButton(){
	var editCategoriesButton = document.querySelector(".admin-edit-categories");

	editCategoriesButton.addEventListener("click", function(){
		
		if(editCategoriesButton.classList.contains('admin-edit-categories--editing')){
	    	getCategories();
	    	editCategoriesButton.innerHTML = "Edit categories";
	    	editCategoriesButton.classList.remove('admin-edit-categories--editing');
		}else{
			getCategories("edit");
	    	editCategoriesButton.innerHTML = "Save categories";
	    	editCategoriesButton.classList.add('admin-edit-categories--editing');
		}

	});
}