<div id="measures" class="tm-panel text-shadow">
	
	<header class="topcoat-navigation-bar row">
		<div class="topcoat-navigation-bar__item column-1-hand">
            <button id="backButton" data-route="#/" class="topcoat-icon-button--large--quiet" style="width: 100px;">
                <span class="icomatic">back</span>
                Nazaj
            </button>
        </div>
		<div class="topcoat-navigation-bar__item column-auto-hand center">
			<h1 class="topcoat-navigation-bar__title">Meritve</h1>
		</div> 
	</header>


	<section class="row" style="height: 91%; background-color: whiteSmoke;">
		<div class="column-3-hand left-container text-shadow">
			
			<section id="sidebar-menu" class="left-content" style="opacity: 0;"></section>
	
		</div>

<!-- measures -->
		<div id="measuresContainer" class="column-auto-hand right-container" style="display: block;">
			<div id="graph" class="text-shadow"></div>
			
<!-- pressure insert page #1 -->
		<div id="pressureInsertPage1" class="row middle-hand page pressure-page" style="display: none;">
			<div class="column-auto-hand center">
				<p>Danes še niste vnesli meritve.</p>
				<p>Ali želite to narediti sedaj?</p>

				<div class="row around-hand" style="margin-top: 40px;">
					<div class="column-2-hand">
						<button data-button="no" class="pressure-button topcoat-button">Ne</button>
					</div>
					<div class="column-2-hand">
						<button data-button="yes" class="pressure-button topcoat-button--cta">Da</button>
					</div>
				</div>

			</div>
		</div>

<!-- pressure insert page #2 -->
		<div id="pressureInsertPage2" class="page-margin pressure-page" style="display: none;">
			<div class="row around-hand">
				<div class="column-3-hand">
					<img src="assets/img/merjenje_tlaka.jpg" width="309" height="210" alt="blood pressure measurment">
					<p class="input-label">Sistolični (gornji) krvni tlak:</p>
					<input type="tel" maxlength="3" pattern="[0-9]+" class="topcoat-text-input" id="systolic">
				</div>
				<div class="column-5-hand pressure-text">
					<p>
					Manšeto namestite na ustrzno mesto (na nadlakti ali podlakti), tako da bo povezovalna cevka izhajala iz manšete na notranji strani komolca (merilniki z manšeto na nadlakti). Meritev vedno izvajajte na isti roki.
					</p>
					<p>
					Med meritvijo krvnega tlaka mora biti manšeta v višini srca, ne glede na način, kako merite krvni tlak (na nadlakti ali podlakti, sede, leže ali stoje). Roka nak počiva podprta v udobnem položaju.
					</p>
				</div>
			</div>

			<div class="row" style="margin-top: 20px">
				<div class="offset-9-hand column-2-hand">
					<button data-button="next" class="pressure-button topcoat-button--cta">Naprej</button>
				</div>
			</div>

		</div>

<!-- pressure insert page #3 -->
		<div id="pressureInsertPage3" class="page-margin pressure-page" style="display: none;">
			<div class="row around-hand">
				<div class="column-3-hand">
					<img src="assets/img/merjenje_tlaka.jpg" width="309" height="210" alt="blood pressure measurment">
					<p class="input-label">Diastolični (spodnji) krvni tlak:</p>
					<input type="tel" maxlength="3" pattern="[0-9]+" class="topcoat-text-input" id="diastolic">

				</div>
				<div class="column-5-hand pressure-text">
					<p>
					Manšeto namestite na ustrzno mesto (na nadlakti ali podlakti), tako da bo povezovalna cevka izhajala iz manšete na notranji strani komolca (merilniki z manšeto na nadlakti). Meritev vedno izvajajte na isti roki.
					</p>
					<p>
					Med meritvijo krvnega tlaka mora biti manšeta v višini srca, ne glede na način, kako merite krvni tlak (na nadlakti ali podlakti, sede, leže ali stoje). Roka nak počiva podprta v udobnem položaju.
					</p>
				</div>
			</div>

			<div class="row" style="margin-top: 20px">
				<div class="offset-1-hand column-2-hand">
					<button data-button="back" class="pressure-button topcoat-button--cta">Nazaj</button>
				</div>
				<div class="offset-6-hand column-2-hand">
					<button data-button="save" class="pressure-button topcoat-button--cta">Zaključi</button>
				</div>
			</div>

		</div>


<!-- status insert page 1 -->
	<div id="statusPage1" class="status-page" style="display: none;">
		<div class="row">
			<div class="offset-10-hand">
				<p class="pagination" style="height: 1rem;">1/3</p>
			</div>
		</div>
		<div class="row" style="margin-bottom: 2rem;">
			<div class="offset-1-hand">
				<p class="page-titles">Ali vas mučijo glavoboli?</p>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="headache" value="0">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Nikoli
				</label>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="headache" value="1/6">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Včasih
				</label>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="headache" value="1/3">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Pogosto
				</label>
			</div>
		</div>

		<div class="row" style="margin-top: 20px">
			<div class="offset-9-hand column-2-hand">
				<button data-button="nextToSecond" class="status-button topcoat-button--cta">Naprej</button>
			</div>
		</div>
	</div>

<!-- status insert page 2 -->
	<div id="statusPage2" class="status-page" style="display: none;">
		<div class="row">
			<div class="offset-10-hand">
				<p class="pagination" style="height: 1rem;">2/3</p>
			</div>
		</div>
		<div class="row" style="margin-bottom: 2rem;">
			<div class="offset-1-hand">
				<p class="page-titles">Kako se počutite?</p>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="feeling" value="0">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Dobro
				</label>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="feeling" value="1/3">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Slabo
				</label>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="feeling" value="0">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Ne vem
				</label>
			</div>
		</div>

		<div class="row" style="margin-top: 20px">
			<div class="offset-1-hand column-2-hand">
				<button data-button="backToFirst" class="status-button topcoat-button--cta">Nazaj</button>
			</div>
			<div class="offset-6-hand column-2-hand">
				<button data-button="nextToThird" class="status-button topcoat-button--cta">Naprej</button>
			</div>
		</div>
	</div>

<!-- status insert page 3 -->
	<div id="statusPage3" class="status-page" style="display: none;">
		<div class="row">
			<div class="offset-10-hand">
				<p class="pagination" style="height: 1rem;">3/3</p>
			</div>
		</div>
		<div class="row" style="margin-bottom: 2rem;">
			<div class="offset-1-hand">
				<p class="page-titles">Ali se ponoči pogosto zbujate?</p>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="wake" value="0">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Nikoli
				</label>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="wake" value="1/6">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Včasih
				</label>
			</div>
		</div>
		<div class="row radio-rows">
			<div class="offset-1-hand">
				<label class="topcoat-radio-button">
					<input type="radio" name="wake" value="1/3">
  					<div class="topcoat-radio-button__checkmark"></div>
  					Zelo pogosto
				</label>
			</div>
		</div>

		<div class="row" style="margin-top: 20px">
			<div class="offset-1-hand column-2-hand">
				<button data-button="backToSecond" class="status-button topcoat-button--cta">Nazaj</button>
			</div>
			<div class="offset-6-hand column-2-hand">
				<button data-button="save" class="status-button topcoat-button--cta">Zaključi</button>
			</div>
		</div>
	</div>

<!-- button for status insert -->
			<div id="insertButton" class="row" style="margin-top: 20px; display:none">
				<div class="offset-9-hand column-2-hand">
					<button id="insertStatusData" class="topcoat-button--cta">Vnos</button>
				</div>
			</div>
		</div>

	</section>


</div>