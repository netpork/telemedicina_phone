Telemed.measures = (function(){
	'use strict';
	
	function getMyDate(dayDelta) {
		var myDate = new Date();
		myDate.setTime(myDate.getTime() + dayDelta * 86400000);
		return myDate.getTime();
	}

	var container,
	insertStatus,
	// pressureMorningData = [[getMyDate(-4), 130], [getMyDate(-3), 120], [getMyDate(-2), 120], [getMyDate(-1), 135]],
	// pressureEveningData = [[getMyDate(-4), 125], [getMyDate(-3), 135], [getMyDate(-2), 130], [getMyDate(-1), 125]],

	pressureMorningData = [[getMyDate(-4), 130], [getMyDate(-3), 120], [getMyDate(-2), 135], [getMyDate(-1), 135]],
	pressureEveningData = [[getMyDate(-4), 80], [getMyDate(-3), 75], [getMyDate(-2), 85], [getMyDate(-1), 90]],

	systolic,
	diastolic,
	buttonEventsInitialized,
	headache, overall, wake
	;

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getMeasuresMenu(), menuHandler);
		initBackButton();
		buttonEventsInitialized = false;
		container = $('#graph');
		insertStatus = $('#insertButton');
		initInsertStatusButton();
		showWeightGraph();
		// showPressureGraph();
		// showPieStatus();
	}

	function menuHandler(oldPage, newPage, name) {
		container.highcharts().destroy();
		// TweenLite.to(insertButton, 0.5, {autoAlpha: 0});
		$(insertButton).hide();

		switch(name) {
		case 'weight':
			showWeightGraph();
			break;
		case 'sugar':
			showSugarGraph();
			break;
		case 'pressure':
			showPressureGraph();
			insertPressureData();
			testPressureNewMeasures();
			break;
		case 'status':
			showPieStatus();
			// TweenLite.set(insertButton, {opacity: 0});
			// TweenLite.to(insertButton, 1.0, {autoAlpha: 1, delay: 1});
			$(insertButton).show();
			break;
		}
	}

	function showPressureGraph() {
		container.highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: 'Krvni tlak'
			},
			credits: {
				enabled: false
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 24 * 3600 * 1000,
				tickmarkPlacement: 'on',
				dateTimeLabelFormats: {
					day: '%e. %b'
				}
			},
			yAxis: {
				min: 60,
				max: 180,
				tickInterval: 20,
				title: {
					text: 'mm Hg'
				},

				plotLines: [{
					value: 140,
					color: 'red',
					width: 2,
				}]
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						color: '#FFFFFF',
						align: 'center',
						x: 0,
						y: 20,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							textShadow: '0 0 3px black'
						}
					}
				}
			},
			series: [
				{
					name: 'Sistolični',
			// 		data: [[getMyDate(-3), 130], [getMyDate(-2), 120], [getMyDate(-1), 120], [getMyDate(0), 135]]
				},
				{
					name: 'Diastolični',
			// 		data: [[getMyDate(-3), 125], [getMyDate(-2), 135], [getMyDate(-1), 125], [getMyDate(0), 120]]
				}
			]
		});

	}

	function testPressureNewMeasures() {
		var chart = container.highcharts();
		
		// test how many pressure entries
		if (chart.series[0].data.length <= 4) {
			container.hide();
			Telemed.sidebarMenu.menuOff();

			// setup button events only once
			if (!buttonEventsInitialized) doPressureInputs();
			// show the first page for pressure insert 
			$('#pressureInsertPage1').show();
		}
	}


	function doPressureInputs() {
		// setup button events
		
		$('#measuresContainer').find('.pressure-button').on('click', function(e) {
			var which = $(this).data('button');
			
			switch(which) {
			case 'no':
				// back to graph
				$('.pressure-page').hide();
				insertPressureData();
				container.show();
				Telemed.sidebarMenu.menuOn();
				break;
			
			case 'yes':
				$('#pressureInsertPage1').hide();
				$('#pressureInsertPage2').show();
				break;
			
			case 'next':
				systolic = $('#systolic').val();
				
				// test systolic value
				if (systolic >= 70 && systolic <= 200) {
					$('#pressureInsertPage2').hide();
					$('#pressureInsertPage3').show();
				} else {
					// error
					$('#systolic').val('napaka!');
				}
				break;
			
			case 'back':
				$('#pressureInsertPage3').hide();
				$('#pressureInsertPage2').show();
				break;
			
			case 'save':
				diastolic = $('#diastolic').val();
				
				// test diastolic value
				if (diastolic >= 50 && diastolic <= 100) {
					$('#pressureInsertPage3').hide();
					
					// add new values to graph
					// systolic
					pressureMorningData.push([getMyDate(0), parseInt(systolic, 10)]);
					// diastolic
					pressureEveningData.push([getMyDate(0), parseInt(diastolic, 10)]);
					insertPressureData();
					container.show();
					Telemed.sidebarMenu.menuOn();
					// $('.pressure-page').hide();
					// hide the keyboard
					document.activeElement.blur();
				} else {
					// error
					$('#diastolic').val('napaka!');
				}

				break;
			}
		});

		buttonEventsInitialized = true;

	}

	function insertPressureData() {
		console.log('call');
		var chart = container.highcharts();
		
		$.each(pressureMorningData, function(index, value) {
			chart.series[0].addPoint(value);
		});

		$.each(pressureEveningData, function(index, value) {
			chart.series[1].addPoint(value);
		});
	}

	function showWeightGraph() {
		container.highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: 'Teža'
			},
			credits: {
				enabled: false
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 24 * 3600 * 1000,
				tickmarkPlacement: 'on',
				dateTimeLabelFormats: {
					day: '%e. %b'
				}
			},
			yAxis: {
				min: 20,
				max: 100,
				tickInterval: 20,
				title: {
					text: 'kg'
				}

				// plotLines: [{
				// 	value: 140,
				// 	color: 'red',
				// 	width: 2,
				// }]
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						color: '#FFFFFF',
						align: 'center',
						x: 0,
						y: 20,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							textShadow: '0 0 3px black'
						}
					}
				}
			},
			series: [
				{
					name: 'Zjutraj',
					data: [[getMyDate(-3), 80], [getMyDate(-2), 81], [getMyDate(-1), 80], [getMyDate(0), 80]]
				},
				{
					name: 'Zvečer',
					data: [[getMyDate(-3), 82], [getMyDate(-2), 82], [getMyDate(-1), 82], [getMyDate(0), 82]]
				}
			]
		});
	}

	function showSugarGraph() {
		container.highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: 'Sladkor'
			},
			credits: {
				enabled: false
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 24 * 3600 * 1000,
				tickmarkPlacement: 'on',
				dateTimeLabelFormats: {
					day: '%e. %b'
				}
			},
			yAxis: {
				min: 0,
				max: 10,
				tickInterval: 2,
				title: {
					text: 'mmol/L'
				},

				plotLines: [{
					value: 7.1,
					color: 'red',
					width: 2,
				}]
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						color: '#FFFFFF',
						align: 'center',
						x: 0,
						y: 20,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							textShadow: '0 0 3px black'
						}
					}
				}
			},
			series: [
				{
					name: 'Zjutraj',
					data: [[getMyDate(-3), 4.5], [getMyDate(-2), 5], [getMyDate(-1), 4.4], [getMyDate(0), 4.7]]
				},
				{
					name: 'Zvečer',
					data: [[getMyDate(-3), 5.8], [getMyDate(-2), 5.5], [getMyDate(-1), 5.3], [getMyDate(0), 6.1]]
				}
			]
		});
	}

	function showPieStatus() {
		container.highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			credits: {
				enabled: false
			},
			title: {
				text: 'Obdobje: Maj, 2014'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Počutje',
				data: [
					['Dobro', 62.8],
					['Slabo', 100 - 62.8]
				]
			}]
		});
	}

	function initBackButton() {
		$('#backButton').on('click', function(){
			Telemed.getMainContext().redirect('#/');
			// var chart = container.highcharts();
			// chart.series[0].addPoint([getMyDate(1), 120]);
			// chart.series[1].addPoint([getMyDate(1), 130]);
		});
	}

	function initInsertStatusButton() {
		$('.status-button').on('click', function(e) {
			var whichButton = $(this).data('button');

			switch (whichButton) {
			case 'nextToSecond':
				headache = $('input:radio[name=headache]:checked').val();
				if (!headache) return;
				$('#statusPage1').hide();
				$('#statusPage2').show();
				break;
			case 'backToFirst':
				$('#statusPage2').hide();
				$('#statusPage1').show();
				break;
			case 'nextToThird':
				overall = $('input:radio[name=feeling]:checked').val()
				if (!overall) return;
				$('#statusPage2').hide();
				$('#statusPage3').show();
				break;
			case 'save':
				wake = $('input:radio[name=wake]:checked').val();
				if (!wake) return;

				// eval can be harmful
				var bad = (eval(headache) + eval(overall) + eval(wake)) * 100;

				var chart = container.highcharts();
				chart.series[0].setData([['Dobro', 100 - bad], ['Slabo', bad]]);
				$('#statusPage3').hide();
				container.show();
				Telemed.sidebarMenu.menuOn();
				break;
			case 'backToSecond':
				$('#statusPage3').hide();
				$('#statusPage2').show();
				break;
			}

		});

		insertStatus.on('click', function(e) {
			container.hide();
			// insertButton.css('opacity', 0);
			// TweenLite.set(insertButton, {opacity: 0});
			$(insertButton).hide();
			$('#statusPage1').show();
			Telemed.sidebarMenu.menuOff();
		});
	}

	return {
		initialize: initialize
	};

})();