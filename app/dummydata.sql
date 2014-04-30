-- insert values

INSERT INTO category (cat_name) VALUES ("Dogs");
INSERT INTO category (cat_name) VALUES ("Cats");
INSERT INTO category (cat_name) VALUES ("Software");

INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Sausage Dog", "It's pretty sick. It's a dog.", 50, 100, true, 1);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("West Highland Terrier", "This is our family's dog and it's really annoying.", 75, 250, true, 1);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Ocelot", "Salvidor Dali had one these cuties&hellip;", 7500, 2, true, 2);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Pepper", "My cat, way too fluffy", 1000000, 1, false, 2);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Adobe Dreamweaver CS6", "Where dreams are weaved!", 9999, 0, false, 3);