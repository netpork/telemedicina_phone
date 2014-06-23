Telemed.info = (function(){
	'use strict';

	var subMenus,
	subIndex = 0,
	subPage = '',
	header,
	info,
	grid, news,
	newsSwitch = false
	;

	function initialize() {
		subIndex = 0;
		subMenus = Telemed.sidebarMenu.getInfoSubMenus();
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getInfoMenu(), menuHandler);
		initBackButton();
		header = $('#crumbs');
		info = $('#infoContainer');
		grid = $('#gridContainer');
		news = $('#newsContainer');

		$('#gridContainer').on('click', 'div.column-2-hand', onGridClick);
		$('.closeButton').on('click', onCloseButtonClick);

	}

	function menuHandler(oldPage, newPage, name) {
		if (subIndex === 1) {
			// showAlert();
			showNativeAlert();
			return false;
		}

		subIndex++;

		switch (name) {
			case 'entertainment':
				Telemed.sidebarMenu.setSubPage('attractions');
				Telemed.sidebarMenu.initialize(getMenu(name), menuHandler);
				setCrumbs();
				break;
			case 'news':
				Telemed.sidebarMenu.setSubPage('slovenia');
				Telemed.sidebarMenu.initialize(getMenu(name), menuHandler);
				setCrumbs();
				break;
			case 'culture':
				Telemed.sidebarMenu.setSubPage('film');
				Telemed.sidebarMenu.initialize(getMenu(name), menuHandler);
				setCrumbs();
				break;
			case 'sport':
				Telemed.sidebarMenu.setSubPage('basketball');
				Telemed.sidebarMenu.initialize(getMenu(name), menuHandler);
				setCrumbs();
				break;
		}
	}
	
	function onGridClick(e) {
		grid.hide('slow', function() {
			news.show();
		});
	}

	function onCloseButtonClick() {
		news.hide('slow', function() {
			grid.show();
		});
	}

	function getMenu(menuName) {
		Telemed.sidebarMenu.emptyMenuContainer();
		var menu = subMenus.map(function(obj) {
			return obj.name;
		}).indexOf(menuName);

		subPage = subMenus[menu].info;
		return subMenus[menu].obj;
	}

	function showAlert() {
		alert('Podkategorija nima nove podkategorije');
	}

	function showNativeAlert() {
		navigator.notification.alert(
            'Podkategorija nima nove podkategorije.',  // message
            function(){},         // callback
            'Opozorilo',            // title
            'Ok'                  // buttonName
        );
	}

	function initBackButton() {
		$('#backButton').on('click', function(){
			if (!subIndex) {
				Telemed.getMainContext().redirect('#/');
			} else {
				subIndex = 0;
				Telemed.sidebarMenu.emptyMenuContainer();
				Telemed.sidebarMenu.setSubPage('news');	
				Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getInfoMenu(), menuHandler);
			}
			setCrumbs();
		});
	}

	function setCrumbs() {
		if (!subIndex) {
			header.html('Informacije');
		} else {
			header.html('Informacije' + ' / ' + subPage);
		}
	}

	return {
		initialize: initialize
	};

})();