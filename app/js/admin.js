// admin

// initialise all the admin buttons
function initAdminButtons(){
	initAddItemButton();
	initEditCategoriesButton();
}

// initialise the add item button on bottom left
function initAddItemButton(){
	var addItemButton = document.querySelector(".admin-add-item");

	addItemButton.addEventListener("click", function(){
		// make blank popup ready to add
    	getPopUpData(0, "add");
	});
}

// initialise the edit categories button on the bottom left
function initEditCategoriesButton(){
	var editCategoriesButton = document.querySelector(".admin-edit-categories");

	editCategoriesButton.addEventListener("click", function(){
		
		// if the button is in the edit state then reset 
		if(editCategoriesButton.classList.contains('admin-edit-categories--editing')){
	    	getCategories();
	    	editCategoriesButton.innerHTML = "Edit categories";
	    	editCategoriesButton.classList.remove('admin-edit-categories--editing');
		// otherwise change it into the edit state
		}else{
			getCategories("edit");
	    	editCategoriesButton.innerHTML = "Save categories";
	    	editCategoriesButton.classList.add('admin-edit-categories--editing');
		}

	});
}