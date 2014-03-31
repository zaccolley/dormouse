<?php require('data/config.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="<?php echo $meta['description']; ?>">
	<meta name="keywords" content="<?php echo $meta['keywords']; ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<title><?php echo $meta['title']; ?></title>
	<link rel="stylesheet" href="css/style.min.css">

</head>
<body>

	<div class="popup popup--hidden">
		<section>
			<img class="popup__img" src="#" alt="None">

			<div class="details"></div>
			
			<div class="popup_tools">
				<button class="popup_close">
					<i class="fa fa-times"></i>
				</button>			
				<div class="add">
					<h2>Add to basket</h2>
					<input type="text">
					<input type="submit" value="Add">
				</div>
			</div>
		</section>
	</div>

	<div class="content-container">

	<header>
		<h1 class="logo"><a href="./" title="<?php echo $meta['title']; ?>"><?php echo $meta['title']; ?></a></h1>
		<div class="search">
			<input type="text" name="query" class="search-query">
			<button type="submit" class="search-submit icon-swap" title="Search some terms">Search</button>
		</div>
		<div class="bits">
			
			<input type="radio" name="display-option" id="list-display-option" checked>
			<label id="list-display-option-label" for="list-display-option" title="Display items in a list" class="display-option icon-swap">List</label>

			<input type="radio" name="display-option" id="grid-display-option">
			<label id="grid-display-option-label" for="grid-display-option" title="Display items in a grid" class="display-option icon-swap">Grid</label>

			<a href="#" class="checkout">
				<div class="checkout-icon icon-swap" title="Checkout your items!">Basket</div>
				<div class="checkout-item-amount" title="There's nothing here!">0</div>
			</a>

		</div>
	</header>
		
	<section class="basket basket-closed">
		<div class="basket-top">
			<h1 class="basket-title">Basket</h1>
			<button class="basket-close">Close</button>
		</div>
		<ul class="basket-items">
			<!-- Basket items go here -->
		</ul>
	</section>

	<aside>
		
		<div class="filter">
			
			<h2 class="filter-title">Filter items</h2>

			<select class="filter-select" name="filter">
				<option value="name-asc">Name ascending</option>
				<option value="name-desc">Name descending</option>
				<option value="price-asc">Price ascending</option>
				<option value="price-desc">Price descending</option>
			</select>


		</div>

		<h2>Categories</h2>

		<ul class="categories">			
			<!-- Categories are added here -->
		</ul>

	</aside>

	<main>
		<ul class="items">
			<!-- Items are added here -->
		</ul>
	</main>

	</div>

	<script src="js/script.min.js"></script>
</body>
</html>