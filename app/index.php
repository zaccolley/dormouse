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

<?php

	$dbh = new PDO('mysql:host='.$config['host'].';', 'root');

	$sql = "SHOW DATABASES LIKE '".$config['dbname']."'";
	$dbexists = $dbh->query($sql)->rowCount();

	if($dbexists):
?>

<body class="basket-closed">

	<?php include('noscript.html'); ?>

	<div class="alert">
		<i class="alert__icon fa fa-info"></i>
		<p class="alert__message">
			<!-- Alert text -->
		</p>
	</div>

	<div class="popup popup--hidden" id="0">
		<section>
			<div class="details">
				<!-- Item details -->
			</div>
			<div class="popup__img">
				<!-- Image of placeholder -->
			</div>
			
			<div class="popup_tools">
				<button class="popup_close"><i class="fa fa-times"></i> Close</button>			
				<div class="add">
					<!-- Add button -->
				</div>
				<div class="popup_tools--admin">
					<!-- Admin buttons -->
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
			<!-- Basket items -->
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
				<option value="name-asc">(A-Z) Name ascending</option>
				<option value="name-desc">(Z-A) Name descending</option>
				<option value="price-asc">(£-) Price ascending</option>
				<option value="price-desc">(£+) Price descending</option>
			</select>


		</div>

		<h2>Categories</h2>

		<ul class="categories">			
			<!-- Categories -->
		</ul>

		<div class="admin">

			<h2>Admin</h2>

			<button class="admin-edit-categories">Edit categories</button>
			<button class="admin-add-item">Add item</button>
			<button>Change details</button>
			
		</div>

	</aside>

	<main>
		<ul class="items">
			<!-- Items  -->
		</ul>
	</main>

	</div>

	<script>
		// config options
		(function(){

			dormouse = {	
				title: '<?php echo $meta['title']; ?>',
				url: '<?php echo $meta['url']; ?>',
				category: 0,
				debugBasket: true,
				defaultDisplayOption: 'grid' // grid or list
			};

		})();
	</script>
	<script src="<?php echo $meta['url']; ?>/js/script.min.js"></script>
</body>
<?php else: ?>
<body class="install">

	<?php include('noscript.html'); ?>

	<div class="alert">
		<i class="alert__icon fa fa-info"></i>
		<p class="alert__message">
			<!-- Alert text -->
		</p>
	</div>

	<form class="install__form" action="<?php echo $meta['url']; ?>">

		<h1>dormouse 🐭</h1>
		<h2>e-comm framework</h2>

		<label for="shop-name">Shop Name</label>
		<input name="shop-name" id="shop-name" required type="text" autofocus placeholder="eBae">

		<label for="shop-desc">Shop description</label>
		<textarea name="shop-desc" id="shop-desc"  required placeholder="This is an amazing shop. I love it. <3"></textarea>

		<label for="shop-currency">Shop currency</label>
		<select name="shop-currency" id="shop-currency" required>
			<option value="£">£ - Pound</option>
			<option value="€">€ - Euro</option>
			<option value="$">$ - Dollar</option>
			<option value="ƒ">ƒ - Florin</option>
			<option value="¥">¥ - Yen</option>
			<option value="₩">₩ - Won</option>
			<option value="฿">฿ - Bitcoin</option>
			<option value="§">§ - Simoleons</option>
		</select>
	
		<label for="shop-dummydata">
			Dummy data?
			<input type="checkbox" name="shop-dummydata" id="shop-dummydata" checked>
		</label>

		<button type="submit">Ok, LETS GO!</button>
	</form>
	
	<script>
		// config options
		(function(){

			dormouse = {
				install: true,
				title: '<?php echo $meta['title']; ?>',
				url: '<?php echo $meta['url']; ?>',
				category: 0,
				debugBasket: true,
				defaultDisplayOption: 'grid' // grid or list
			};

		})();
	</script>
	<script src="<?php echo $meta['url']; ?>/js/script.min.js"></script>
</body>
<?php endif // if the database exists?>
</html>