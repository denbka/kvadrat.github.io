window.onload = function () {
	
	
		////// photo height control
	var photo = document.getElementById('sectin_1_photo');
	photo.style.height = photo.offsetWidth + 'px';
	window.onresize = function () {
		photo.style.height = photo.offsetWidth + 'px';
	}

	

		////// scroll to
	var menuItems = document.querySelectorAll('.main_menu>.inner>ul>li');
	var headerButton = document.querySelector('.header>.bottom_panel>.arrow');
	
	var AboutAs = document.getElementById('section_1');
	var MakeAnOrder = document.getElementById('section_3');
	var Special = document.getElementById('section_4');
	var Contacts = document.getElementById('section_5');

	//top menu
	menuItems[0].addEventListener('click', function () {
		$(window).scrollTo(AboutAs, 800);	
	});
	menuItems[1].addEventListener('click', function () {
		$(window).scrollTo(MakeAnOrder, 800);	
	});
	menuItems[2].addEventListener('click', function () {
		$(window).scrollTo(Special, 800);	
	});
	menuItems[3].addEventListener('click', function () {
		$(window).scrollTo(Contacts, 800);	
	});

	headerButton.addEventListener('click', function () {
		$(window).scrollTo(MakeAnOrder, 800);	
	});
	
	
	
		////// hamburger menu
	var hamburger = document.querySelector('.main_menu>.hamburger');
	var menu = document.querySelector('.main_menu>.inner');
	var slidedUp;
	
	function slideUp(node) {
		node.style.top = - node.offsetHeight + 'px';
		setTimeout(function() {node.style.display = 'none'}, 200);
		slidedUp = true;
		hamburger.classList.remove('clicked');
	}
	
	function slideDown(node) {
		node.style.display = 'block';
		setTimeout(function(){node.style.top = 0 + 'px';}, 50)
		slidedUp = false;
		hamburger.classList.add('clicked');
	}
	
	function slideToggle(node) {
		if (slidedUp === true) slideDown(node)
		else slideUp(node)
	}
	
	
	function slideCondition () {
			
		if (window.innerWidth <= 910) {
			slideUp(menu);
		}
		if (window.innerWidth > 910) {
			slideDown(menu)
		}
	}
	
	slideCondition();
	window.addEventListener('resize', function() {
		slideCondition;
		setTimeout(slideCondition, 200)
	});
	
	
	hamburger.addEventListener('click', function () {
		this.classList.toggle('clicked');
		slideToggle(menu)
	})
	
	document.body.addEventListener('click', function (e) {
		if ((e.target.id === 'menu_ul')
			||(e.target.classList[0] === 'hamburger')
			||(e.target.classList[0] === 'top')
			||(e.target.classList[0] === 'mid')
			||(e.target.classList[0] === 'bottom')
			||(window.innerWidth > 910)
			||slidedUp) return;
		slideUp(menu);
	});
	
	
	
		////// scrolling above the calculationg results bar
	var calcResultsBar = MakeAnOrder.querySelector('.results');
	
	window.addEventListener('scroll', function () {
		
		if ((window.scrollY >= MakeAnOrder.offsetTop) && (window.scrollY < Special.offsetTop)) {
			calcResultsBar.style.position = 'fixed';
		} else {
			calcResultsBar.style.position = 'absolute';
		}
	
	});


	
		////// calcBoxes
	var calcBoxesTitles = document.querySelectorAll('.section_3 .calc_box .category');
	var calcBoxesContentLists = document.querySelectorAll('.section_3 .calc_box .srvises');
	
	var CalcBoxes = [];
	
	function CBGenerator (h, b, l) {
		var o = {
			hidden: h,
			button: b,
			list: l
		};
		CalcBoxes.push(o);
	};
	
	calcBoxesTitles.forEach(function(c, i){
		CBGenerator(true, c, calcBoxesContentLists[i]);
	});
	
	CalcBoxes[1].hidden = false;
	CalcBoxes[2].hidden = false;
	
	function hide(n) {
		n.style.height = 0;
		n.style.padding = 0;
	}
	
	function show(n) {
		n.style.height = 'auto';
		n.style.padding = '55px 0';
	}
	
	CalcBoxes.forEach(function (c) {
		if (!c.hidden) {
			hide(c.list);
			c.hidden = true
		} else {
			show(c.list);
			c.hidden = false
		}
	});
	
	CalcBoxes.forEach(function(c) {
		c.button.addEventListener('click', function () {
			if (!c.hidden) {
				hide(c.list);
				c.hidden = true
			} else {
				show(c.list);
				c.hidden = false
			}
		});
	});
	
	
		////// checkboxes
	var checkBoxes = document.querySelectorAll('.checkBox > input');
	var labels = document.querySelectorAll('.checkBox > label');
	
	checkBoxes.forEach(function(e, i) {
		e.id = 'i' + i;
		labels[i].setAttribute('for', 'i' + i)
	});
	
	
		////// calculator
	(function () {
		
		var sum = 0;
		var purchases = ''
		var form = document.querySelector('.section_3 form');
		var inputs = document.querySelectorAll('.section_3 .calculator .checkBox input');
    	var lis = document.querySelectorAll('.calculator .calc_box li');
		var result = document.querySelector('.section_3 .results .sum span');
		var popUpList = document.querySelector('#pop-up-1 .list ul');
		var popUpSum = document.querySelector('#pop-up-1 .list .sum span');
		
		var cardWasClicked = false;
		
		var specialCards = document.querySelectorAll('.section_4 .cards .card');
		
		lis.forEach(function(l) {
			l.querySelector('input').setAttribute('data-price', l.querySelector('.coasts').textContent);
		});
		
		form.addEventListener('change', function() {
			sum = 0;
			purchases = '';
			popUpList.innerHTML = '<span style="opacity: 0.5">Вы ничего не выбрали.</span>';
			inputs.forEach(function (i, ind) {
				if (i.checked) {
					sum += parseInt(i.dataset.price);
					purchases += '<li>' + lis[ind].querySelector('.name').textContent + '</li>'
				};
			});
			result.textContent = sum;
			popUpSum.textContent = sum;
			popUpList.innerHTML = purchases;
		})
		
		form.addEventListener('reset', function() {
			result.textContent = 0;
			purchases = '';
			popUpSum.textContent = 0;
			popUpList.innerHTML = '<span style="opacity: 0.5">Вы ничего не выбрали.</span>'
		})
		
		
				//pop-up
		var popUp = document.querySelector('#pop-up-1');
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			
			if (cardWasClicked) {
				sum = 0;
				purchases = '';
				inputs.forEach(function (i, ind) {
					if (i.checked) {
						sum += parseInt(i.dataset.price);
						purchases += '<li>' + lis[ind].querySelector('.name').textContent + '</li>'
					};
				});
				result.textContent = sum;
				popUpSum.textContent = sum;
				popUpList.innerHTML = purchases;
				cardWasClicked = false;
			};
			if (purchases === '') {
				popUpList.innerHTML = '<span style="opacity: 0.5">Вы ничего не выбрали.</span>';
			}
			
			popUp.removeAttribute('style');
			
		})
				//closing pop-up
		popUp.addEventListener('click', function(e) {
			e.stopPropagation();
			if ((e.target.id === 'pop-up-1')||(e.target.classList.value === 'close')||(e.target.classList.value === 'a')||(e.target.classList.value === 'b')) {
				this.style.display = 'none';
			}
		})
		
		specialCards.forEach(function (card) {
			card.addEventListener('click', function () {
				
				popUpSum.textContent = this.querySelector('.price').textContent;
				popUpList.innerHTML = this.querySelector('ul').innerHTML;
				
				popUp.removeAttribute('style');
				cardWasClicked = true;
			})
		})
			
		
 	}());
	
	
	
}// window.onload