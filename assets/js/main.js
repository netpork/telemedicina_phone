var Telemed = (function($){
	'use strict';
	
	var app,
	currentPage = 'menu',
	initCallback, touchCallback,
	previousPage,
	mainContext,
	mainContainer,
	communicationPage,
	menu,
	hammer,
	width, height
	;

	function initialize() {
		// setViewport();
		mainContainer = $('#main');
		setResizeEvent();
		setBrowserDimensions();

/*		hammer = Hammer(mainContainer, {
			prevent_default: true
		})
		.on('touch', function(e) {
			handleHammer(e);
		});
		// for development and testing
		Hammer.plugins.showTouches();
*/		

		app = $.sammy('#main', function() {
			
			// mustache
			this.use('Mustache', 'ms');
			
			// menu route 
			this.get('#/', function() {
				mainContext = this;
				setCurrentPage('menu');
				Telemed.sidebarMenu.setSubPage('zdravnik');
				setInitCallback(Telemed.Menu.initialize);
				Telemed.guiAnim.show('menu');
			});

			// user data route			
			this.get('#/userData', function() {
				mainContext = this;
				setCurrentPage('userData');
				Telemed.sidebarMenu.setSubPage('personalData');
				setInitCallback(Telemed.userData.initialize);
				Telemed.guiAnim.show('userData');
			});

			// measure route
			this.get('#/measures', function() {
				mainContext = this;
				setCurrentPage('measures');
				Telemed.sidebarMenu.setSubPage('weight');	
				setInitCallback(Telemed.measures.initialize);
				Telemed.guiAnim.show('measures');
			});

			// reminders route
			this.get('#/reminders', function() {
				mainContext = this;
				setCurrentPage('reminders');
				Telemed.sidebarMenu.setSubPage('aspirin');	
				setInitCallback(Telemed.reminders.initialize);
				Telemed.guiAnim.show('reminders');
			});

			// communication route
			this.get('#/communication', function() {
				console.log('kom');
				mainContext = this;
				setCurrentPage('communication');
				// Telemed.sidebarMenu.setSubPage('zdravnik');	
				setInitCallback(Telemed.communication.initialize);
				Telemed.guiAnim.show('communication');
			});

			// communication/:arguments route
			this.get('#/communication/:page', function() {
				communicationPage = this.params.page;
				mainContext = this;
				setCurrentPage('communication');
				setInitCallback(Telemed.communication[communicationPage]);
				Telemed.guiAnim.show('communication/' + communicationPage);
			});
		
			// info route
			this.get('#/info', function() {
				mainContext = this;
				setCurrentPage('info');
				Telemed.sidebarMenu.setSubPage('news');	
				setInitCallback(Telemed.info.initialize);
				Telemed.guiAnim.show('info');
			});

		});
	}

	// START ------------------------------------------------------------------------------------------------------------------------
/*	$(function(){
		FastClick.attach(document.body);
		initialize();
//		alert('skrin ' + width + ' ' + height);
		app.debug = true;
		app.run('#/');
	});
*/

	document.addEventListener('deviceready', function() {
		FastClick.attach(document.body);
		StatusBar.hide();
		initialize();
		
/*		navigator.notification.alert(
			'skrub w=' + width + ' h=' + height,  // message
			null,         // callback
			'Game Over',            // title
			'Done'                  // buttonName
		);
*/		
		app.debug = false;
		app.run('#/');
	}, false);


	// METHODS ------------------------------------------------------------------------------------------------------------------------
/*	function handleHammer(e) {
		if (e.type === 'touch') {

			// call setted touch handler 
			touchCallback(e);

		}
	}
*/
	function setResizeEvent() {
		var resizeTimer;
		
		$(window).resize(function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(setBrowserDimensions, 500);
		});
	}

	function setBrowserDimensions() {
		width = $(window).width();
		height = $(window).height();
	}

	function setCurrentPage(page) {
		currentPage = page;
	}

	function getCurrentPage() {
		return currentPage;
	}

	function setInitCallback(fn) {
		initCallback = fn;
	}

	function setTouchCallback(fn) {
		touchCallback = fn;
	}

	function setViewport() {
		if (window.deviceIsIOS) {
			$('head').append(
				'<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi">'
			);
		} else {
			$('head').append(
				'<meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'
			);
		}
	}

	// API ------------------------------------------------------------------------------------------------------------------------
	return {
		getApp: function() {
			return app;
		},

		getMainContainer: function() {
			return mainContainer;
		},

		getWidth: function() {
			return width;
		},

		getHeight: function() {
			return height;
		},

		getMainContext: function() {
			return mainContext;
		},

		getInitCallback: function() {
			return initCallback;
		},

		getTouchCallback: function() {
			return touchCallback;
		},

		getCommunicationPage: function() {
			return communicationPage;
		},

		getCurrentPage: getCurrentPage,
		
		initialize: initialize
	};
})(jQuery);