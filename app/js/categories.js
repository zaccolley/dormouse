// categories

function addCategories(categories){
	var preparedData = JSON.stringify({ category: categories });

	ajax({ url: 'data/add.php', request: 'POST', data: preparedData }, function(data){
		updateCategories();
	});	
}

function updateCategories(){
	var catList = document.querySelector('.categories');

	ajax({ url: 'data/category' }, function(json){
		var data = json.output;
		var output = '';
		
		// if we have some data
		if(data && data != ''){
		
			data.categories.forEach(function(category){
				var catName = category.name;
				output += "<li><a href='#"+catName.toLowerCase()+"'>"+catName+"</a></li>";
			});

			if(data.errors && data.errors != ''){
				output += "<div class='error-message'>"+data.errors+"</p></div>";
			}

		}else{
			output += "<li><em>Oops&hellip; Can't find any categories!</em> <a href='./' class='no-cats-action'>Try refreshing?</a></li>";
		}

		catList.innerHTML = output;
	});

}