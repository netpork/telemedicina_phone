Telemed.reminders = (function() {
	'use strict';

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getRemindersMenu(), menuHandler);

		$('.takenButton').on('click', function() {
			var menu = Telemed.sidebarMenu.getRemindersMenu();
			console.log(menu.length);

			if (menu.length > 1) {
				Telemed.sidebarMenu.setOldMenu(menu[0].cardInfo);
				Telemed.sidebarMenu.setNewMenu(menu[1].cardInfo);
			}

			Telemed.sidebarMenu.removeActiveMenu();

			// console.log(Telemed.sidebarMenu.isMenuEmpty());

		});

		initBackButton();		
		showPage();
	}

	function menuHandler(oldPage, newPage, name, oldName) {
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

	function showPage() {
		var menu = Telemed.sidebarMenu.getRemindersMenu();
		$('#' + menu[0].cardInfo).show();
	}

	function isMedicineTaken() {
		showConfirm('Ali ste ze vzeli ' + Telemed.sidebarMenu.getOldMenu());
		// var c = confirm('Ali ste ze vzeli ' + Telemed.sidebarMenu.getOldMenu());
		// Telemed.sidebarMenu.confirmed(c);
	}

	function showConfirm(message) {
		navigator.notification.confirm(
			message,
			onConfirm,
			'Opozorilo',
			['Ne', 'Da']
		);
	}

	function onConfirm(buttonIndex) {
		var confirm;
		
		if (buttonIndex === 1) {
			confirm = false;
		} else {
			confirm = true;
		}

		Telemed.sidebarMenu.confirmed(confirm);
	}

	return {
		initialize: initialize,
		isMedicineTaken: isMedicineTaken,
		switchPage: menuHandler
	};

})();