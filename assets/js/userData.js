Telemed.userData = (function(){
	'use strict';

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getUserDataMenu(), menuHandler);
		initBackButton();
	}

	function menuHandler(oldPage, newPage) {
		// console.log(oldPage, newPage);
/*		TweenLite.to(oldPage, 0.25, {opacity: 0, onComplete: function() {
			oldPage.hide();
			TweenLite.set(newPage, {opacity: 0});
			TweenLite.to(newPage, 0.25, {opacity: 1, onStart: function() {
				newPage.show();
			}});
		}});
*/
		oldPage.transition({
			opacity: 0,
			duration: 250,
			complete: function() {
				oldPage.hide();
				newPage.css({opacity: 0});
				newPage.show();
				
				newPage.transition({
					opacity: 1,
					duration: 250
				});				
			}
		});
	}

	function initBackButton() {
		$('#backButton').on('click', function(){
			Telemed.getMainContext().redirect('#/');
		});
	}

	return {
		initialize: initialize
	};

})();