jQuery(document).ready(function($) {
	
	// Initialize tooltips
	$('body').on('mouseenter', '.tooltip:not(.tooltipstered)', function(){
		$(this).tooltipster({ 'contentAsHTML': true, 'animation': 'fade', 'content': $(this).parent().siblings('div.list_items_found_tooltip').html() }).tooltipster('open');
	});
	
	// Calculate subtotal
	setTimeout( function() { calculate_results(); }, 500 );
	
	
	function calculate_results() {
		
		// Remove existing subtotal div
		$('div#list_sub_total').remove();
			
		// Get page prices, count, and set sum to zero
		prices = $( 'span[id^="itemPrice_"]' );
		count = prices.length;
		sum = 0;
		
		invalid_price_sum = 0;
		count_prime_shipping = 0;
		
		// Loop each item for price
		$( prices ).each(function() {
			
			// Get item price
			price = $(this).html();
			
			// Remove dollar sign for easier addition
			price = price.replace( '$', '' );
			
			// Remove all whitespace (line breaks, space characters)
			price = price.replace(/(\r\n|\n|\r)/gm,"");
			price = price.replace(/ /g,"");
			
			// If there is a valid price
			if( price !== '' ) {
			
				// Add this items price to running sum
				sum += parseFloat( price );
			}
			// Else the price is invalid
			else {
				
				invalid_price_sum++;
			}
		});
		
		// Get number of items which qualify for prime shipping
		prime_shipping = $('div[id^="itemInfo_"] i.a-icon-prime');
		count_prime_shipping = prime_shipping.length;
		
		// Setup content to be returned to page
		content = '<div id="list_sub_total">';
			
			content += '<div style="width:100%;">';
				
				// Items found
				content += '<div class="awl_one_fourth">';
				
					content += '<p><span class="item_count_header tooltip">List Items &#8607;</span></p>';
					content += '<div class="list_items_found_tooltip"><p>A total of all items found in this list.<br />This count includes any items which have an unknown price.</p></div>';
					content += '<p><span class="item_count">'+ count +'</span></p>';
				content += '</div>';
				
				// Invalid price items
				content += '<div class="awl_one_fourth">';
				
					content += '<p><span class="item_count_header tooltip">Unknown Items &#8607;</span></p>';
					content += '<div class="list_items_found_tooltip"><p>These items did not have a valid price.<br />They were included in "List Items", but NOT in the "Wishlist Subtotal".</p><p>These items mgiht not have a price because they may be coming soon or backordered.</p></div>';
					content += '<p><span class="item_count">'+ invalid_price_sum +'</span></p>';
				content += '</div>';
				
				// Prime shipping items
				content += '<div class="awl_one_fourth">';
				
					content += '<p><span class="item_count_header tooltip">Prime Items &#8607;</span></p>';
					content += '<div class="list_items_found_tooltip"><p>The number of items which qualify for Amazon Prime Shipping.</p></div>';
					content += '<p><span class="item_count">'+ count_prime_shipping +'</span></p>';
				content += '</div>';
			
				// Wishlist subtotal
				content += '<div class="awl_one_fourth">';
				
					content += '<p><span class="item_count_header tooltip">Wishlist Subtotal &#8607;</span></p>';
					content += '<div class="list_items_found_tooltip"><p>The subtotaled amount of all items in the wishlist (excluding unknown items).</p></div>';
					content += '<p><span class="item_count">$'+ sum.toFixed(2) +'</span></p>';
				content += '</div>';
				
				content += '<div style="clear:both;"></div>';
			content += '</div>';
			
		content += '</div>';
		
		// Insert content before page wrapper
		$( content ).insertBefore( $( 'div#item-page-wrapper' ) );
	}
	
	
	// Listen for node changes and rerun calculations (handles removing, undoing and moving items)
	$('div#item-page-wrapper').bind("DOMNodeRemoved", function(e) {
		
		//$('div#list_sub_total').remove();
		setTimeout( function() { calculate_results(); }, 500 );
	});
	$('div#item-page-wrapper').bind("DOMNodeAdded", function(e) {
		
		//$('div#list_sub_total').remove();
		setTimeout( function() { calculate_results(); }, 500 );
	});
	
});
