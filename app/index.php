<?php require('data/config.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="description" content="<?php echo $meta['description']; ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<title><?php echo $meta['title']; ?></title>
	<link rel="stylesheet" href="<?php echo $meta['url']; ?>/css/style.min.css">

</head>
<body class="basket-closed">

	<?php include('noscript.html'); ?>

	<div class="alert">
		<i class="alert__icon fa fa-info"></i>
		<p class="alert__message">This is an alert</p>
	</div>

	<div class="popup popup--hidden">
		<section>
			<div class="details"></div>
			<div class="popup__img">
			</div>
			
			<div class="popup_tools">
				<button class="popup_close"><i class="fa fa-times"></i> Close</button>			
				<div class="add">
					<h2 class="add-title">Add to basket</h2>

					<select name="amount" class="amount">
						<option value="1" selected>01</option>
						<option value="2">02</option>
						<option value="3">03</option>
						<option value="4">04</option>
						<option value="5">05</option>
						<option value="6">06</option>
						<option value="7">07</option>
						<option value="8">08</option>
						<option value="9">09</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
						<option value="14">14</option>
						<option value="15">15</option>
						<option value="16">16</option>
						<option value="17">17</option>
						<option value="18">18</option>
						<option value="19">19</option>
						<option value="20">20</option>
						<option value="21">21</option>
						<option value="22">22</option>
						<option value="23">23</option>
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
						<option value="27">27</option>
						<option value="28">28</option>
						<option value="29">29</option>
						<option value="30">30</option>
					</select>

					<button>Add</button>
				</div>
				<div class="popup_tools--admin">
					<button class="edit-button">Edit</button>
				</div>
			</div>
		</section>
	</div>

	<div class="content-container">

	<header>
		<h1 class="logo logo__img"><a href="<?php echo $meta['url']; ?>" title="<?php echo $meta['description']; ?>"><?php echo $meta['title']; ?></a></h1>
		<div class="search">
			<input type="text" name="query" class="search-query">
		</div>
		<div class="bits">
			<button type="submit" class="search-submit icon-swap" title="Search some terms">Search</button>
			
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
		
	<section class="basket">
		<div class="basket-top">
			<h1 class="basket-title">Basket</h1>
			<button class="basket-close">Close</button>
		</div>
		<ul class="basket-items">
			<!-- Basket items go here -->
		</ul>
		<div class="basket-checkout">
			<button class="basket-checkout-button">Checkout</button>
			<div class="basket-checkout-details">
				<p class="amount">Amount of items: <span class="value">0</span></p>
				<p class="total">Total: <span class="value">0</span></p>
			</div>
		</div>
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

		<div class="admin">

			<h2>Admin</h2>

			<button>Edit categories</button>
			<button class="admin-add-item">Add item</button>
			<button>Change details</button>
			
		</div>

	</aside>

	<main>
		<ul class="items">
			<!-- Items are added here -->
		</ul>
	</main>

	</div>

	<script src="<?php echo $meta['url']; ?>/js/script.min.js"></script>
</body>
</html>