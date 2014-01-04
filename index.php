<?php require('data/dormouse.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="<?php echo $dormouse[description]; ?>">
	<meta name="keywords" content="<?php echo $dormouse[keywords]; ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<title><?php echo $dormouse[title]; ?></title>
	<link rel="stylesheet" href="css/build/style.min.css">

</head>
<body>

	<section class="basket basket-closed">
		<h1 class="basket-title">Basket</h1>
		<ul class="basket-items">
			<!-- Basket items go here -->
		</ul>
	</section>

	<header>
		<h1 class="logo"><a href="#"><?php echo $dormouse[title]; ?></a></h1>
		<div class="search">
			<input type="text" name="query" class="search-query">
			<button type="submit" class="search-submit icon-swap" title="Search some terms">Search</button>
		</div>
		<div class="bits">
			
			<a href="#" class="checkout">
				<div class="checkout-icon icon-swap" title="Checkout your items!">Checkout</div>
				<div class="checkout-item-amount" title="There's nothing here!">0</div>
			</a>

			<input type="radio" name="display-option" id="list-display-option">
			<label for="list-display-option" title="Display items in a list" class="display-option icon-swap">List</label>

			<input type="radio" name="display-option" id="grid-display-option">
			<label for="grid-display-option" title="Display items in a grid" class="display-option icon-swap">Grid</label>
			
		</div>
	</header>

	<aside>
		
		<select class="filter" name="filter">
			<option value="default">Filters</option>
			<option value="price-asc">Price ascending</option>
			<option value="price-des">Price descending</option>
		</select>

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