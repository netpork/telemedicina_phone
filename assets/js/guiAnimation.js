Telemed.guiAnim = (function($){
	'use strict';

	var current,
	templatesPath ='assets/templates/',
	panels,
	shelfWidth = 300,
	backButton = false
	;

	function showPage(page) {
		current = page;
		var route = page.split('/');
		
		if (route.length === 2) {
			var section = route[0];
			var file = route[1];

			Telemed.getMainContext()
				.load(templatesPath + section + '/' + file + '.ms')
				.appendTo(Telemed.getMainContainer())
				.then(function() {
					getPanels();
					// Telemed.getInitCallback()();
					scroll();
				});
		} else if (page !== 'menu') {
			// show the content panel
			if (!backButton) {
				Telemed.getMainContext().load(templatesPath + page + '/index.ms').appendTo(Telemed.getMainContainer())
				.then(function() {
					getPanels();
					// Telemed.getInitCallback()();
					scroll();
				});
			} else {
				Telemed.getMainContext().load(templatesPath + page + '/index.ms').prependTo(Telemed.getMainContainer())
				.then(function() {
					getPanels();
					// Telemed.getInitCallback()();
					scrollToMenu();
				});
			}

		} else {
			// show the menu panel
			Telemed.getMainContext().load(templatesPath + page + '/index.ms').prependTo(Telemed.getMainContainer())
			.then(function() {
				getPanels();
				Telemed.getInitCallback()();
				// if app just launched, fade in the menu, otherwise scroll to menu
				panels.length < 2 ? fadeInMenu() : scrollToMenu();
			});
		}
	}

	function getPanels() {
		panels = Telemed.getMainContainer().find('>div.tm-panel');
	}

	function scroll() {
		// instant display for development 
		if (panels.length < 2) {
			$(panels[0]).removeClass('tm-hidden');
			return;
		}

/*		forceGPU();

		TweenLite.set(panels[1], {x: Telemed.getWidth()});
		$(panels[1]).removeClass('tm-hidden');

		TweenLite.to([panels[0], panels[1]], 0.5, {x: "-=" + Telemed.getWidth(), onComplete: function() {
			panels[0].remove();
			removeShelf();
		}});
*/
		var compl = 0;

		$(panels[1]).css({x: Telemed.getWidth(), opacity: 1});
		$(panels[1]).removeClass('tm-hidden');
		$(panels).transition({
			x: '-=' + Telemed.getWidth() / 2,
			duration: 500,
			easing: 'snap',
			complete: function() {
				if (++compl % 2 === 0) {
					panels[0].remove();
					removeShelf();
					Telemed.getInitCallback()();
					resetBackButton();
				}
			}
		});
	}

	function scrollToMenu() {
/*		forceGPU();
		TweenLite.set(panels[0], {x: -Telemed.getWidth()});
		$(panels[0]).removeClass('tm-hidden');
		TweenLite.to([panels[0], panels[1]], 0.5, {x: "+=" + Telemed.getWidth(), onComplete: function() {
			panels[1].remove();
		}});
*/
		var compl = 0;
		
		$(panels[0]).css({x: -Telemed.getWidth(), opacity: 1});
		if (current !== 'menu') Telemed.getInitCallback()();

		// $(panels[0]).removeClass('tm-hidden');
		panels.transition({
			x: '+=' + Telemed.getWidth() / 2,
			duration: 500,
			easing: 'snap',
			complete: function() {
				if (++compl % 2 === 0) {
					panels[1].remove();
					resetBackButton();
				}
			}
		});
	}

	function forceGPU() {
		TweenLite.set([panels[0], panels[1]], {force3D:true});
	}

	function fadeInMenu() {
		// TweenLite.to('#menu', 1, {autoAlpha: 1, delay: 0.5});
		var menu = Telemed.Menu.getMenuContainer();
		menu.css({opacity: 0});
		menu.transition({opacity: 1, duration: 1000, delay: 500});
	}

	function showShelf(shelf) {
		getPanels();
		$(shelf).toggleClass('tm-hidden');
		// TweenLite.to(panels[0], 0.2, {x: "+=" + shelfWidth, opacity: 0.6});
		$(panels[0]).transition({x: "+=" + shelfWidth, opacity: 0.6, duration: 200});
	}

	function hideShelf(shelf) {
/*		TweenLite.to(panels[0], 0.2, {x: 0, opacity: 1, onComplete: function() {
			$(shelf).toggleClass('tm-hidden');
			// $(Telemed.Menu.getShelfButton()).blur();
			// Telemed.Menu.shelfBlur();
		}});
*/
		$(panels[0]).transition({x: 0, opacity: 1, duration: 200, complete: function() {
			$(shelf).toggleClass('tm-hidden');
			}
		});
	}

	function removeShelf() {
		$('.shelf-container').remove();
	}

	function setFromBackButton() {
		backButton = true;
	}

	function resetBackButton() {
		backButton = false;
	}


	return {
		show: showPage,
		
		showShelf: showShelf,
		
		hideShelf: hideShelf,
		
		isBackButton: function() {
			return backButton;
		},

		setFromBackButton: setFromBackButton,

		resetBackButton: resetBackButton

	};
})(jQuery);