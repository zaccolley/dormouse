<?php require('data/config.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="<?php echo $meta['description']; ?>">
	<meta name="keywords" content="<?php echo $meta['keywords']; ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<title><?php echo $meta['title']; ?></title>
	<link rel="stylesheet" href="css/build/style.min.css">

</head>
<body>

	<div class="popup">
		<section>			
			<button class="close">
				<i class="fa fa-times"></i>
			</button>
			<div class="details">
				<h1 class="details-title">
					<a href="#Adobe Dreamweaver CS6" title="More details on Adobe Dreamweaver CS6?">Adobe Dreamweaver CS6</a>
				</h1>
				<p class="details-cat">Found in Software</p>
				<p class="details-desc">Where dreams are weaved!</p>
				<p class="details-price">
					<a href="#Adobe Dreamweaver CS6" title="More details on Adobe Dreamweaver CS6?">£9999</a>
				</p>
				<p class="details-stock">20 left</p>
				<div class="add">
					<h2>Add to basket</h2>
					<input type="text" placeholder="20">
					<input type="submit" value="Add">
				</div>
			</div>
			<img src="images/build/4.jpg" alt="Image of Adobe Dreamweaver CS6">
		</section>
	</div>

	<header>
		<h1 class="logo"><a href="#"><?php echo $meta['title']; ?></a></h1>
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
				<div class="checkout-icon icon-swap" title="Checkout your items!">Checkout</div>
				<div class="checkout-item-amount" title="There's nothing here!">0</div>
			</a>

		</div>
	</header>
		
	<section class="basket basket-closed">
		<h1 class="basket-title">Basket</h1>
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

	<script src="js/build/script.min.js"></script>
</body>
</html>