function initAddItemButton(){
	var addItemButton = document.querySelector(".admin-add-item");

	addItemButton.addEventListener("click", function(){
    	getPopUpData(0, "add");
	});
}