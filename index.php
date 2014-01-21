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

	<div class="window">
		<button class="close">
			<i class="fa fa-times"></i>
		</button>
		<section>			
			<img src="images/build/0.jpg" alt="Image of Sausage Dog">
			<div class="details">
				<h1 class="details-title">
					<a href="#Sausage Dog" title="More details on Sausage Dog?">Sausage Dog</a>
				</h1>
				<p class="details-desc">It's pretty sick. It's a dog.</p>
				<p class="details-price">
					<a href="#Sausage Dog" title="More details on Sausage Dog?">£50</a>
				</p>
			</div>
		</section>
	</div>

	<header>
		<h1 class="logo"><a href="#"><?php echo $meta['title']; ?></a></h1>
		<div class="search">
			<input type="text" name="query" class="search-query">
			<button type="submit" class="search-submit icon-swap" title="Search some terms">Search</button>
		</div>
		<div class="bits">
			
			<input type="radio" name="display-option" id="list-display-option">
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

	<main>
		<ul class="items">
			<!-- Items are added here -->
		</ul>
	</main>

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

	<script src="js/build/script.min.js"></script>
</body>
</html>