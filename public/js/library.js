var initialSize;
var filterTop, filterHeight;
var fileTypeLists, viewControllerPlaceholder, filterBox, expandButtons 
, zoomRange, iconSamples, zoomLabel, filterBar, iconItems, iconList, stickyTitle;

var normalizeWidths = function() {
	var widestIcon = 0;
	var iconTitles = document.querySelectorAll('.icon-title');
	Array.prototype.forEach.call(iconTitles, function(element) {
		if (element.offsetWidth > widestIcon) {
			widestIcon = element.offsetWidth;
		}
	});
	Array.prototype.forEach.call(iconTitles, function(element) {
		element.style.width = widestIcon + 'px';
	});
};

var queryIcons = function() {
	iconList.innerHTML = '';
	var i;
	for (i = 0; i < iconItems.length; i ++) {
		var queryTest = iconItems[i].getAttribute('data-tags').indexOf(filterBox.value);
		if (queryTest > -1) {
			iconList.appendChild(iconItems[i]);
		}
	}
};

var toggleElement = function(element, explicit) {
	if (!explicit) {
		element.classList.add('explicit');
	}
	if (element.classList.contains('hidden')) {
		element.classList.remove('hidden');
	}
	else {
		element.classList.add('hidden');
	}
};

var setProperty = function(element, property, value) {
	element.style[property] = value;
};

var setIconSizes = function(size) {
	for (var i = 0; i < iconSamples.length; i ++) {
		var tile = iconSamples[i].parentNode.parentNode;
		var glyph = tile.querySelector('.glyph');
		var icon = iconSamples[i];
		icon.style.width = size.toFixed(0) + 'px';
		if (size <= 24 && glyph) {
			icon.classList.add('hidden');
			glyph.classList.remove('hidden');
			tile.querySelector('.icon-download-link').href = glyph.src;
		}
		else if (size > 24 && glyph){
			icon.classList.remove('hidden');
			glyph.classList.add('hidden');
			tile.querySelector('.icon-download-link').href = tile.querySelector('.icon-item-sample').src;
		}
	};
};

var getFilterHeight = function(filterBar) {
	var height = filterBar.offsetHeight;
	var margin = filterBar.style.marginBottom || 24;
	filterHeight = height + margin;
};

var readyFunction = function() {
	fileTypeLists = document.querySelectorAll('.icon-download-list');
	viewControllerPlaceholder = document.querySelector('.view-controller-understudy');
	filterBox = document.querySelector('.search-box');
	expandButtons = document.querySelectorAll('.icon-item-expand');
	zoomRange = document.querySelector('.zoom-range');
	iconSamples = document.querySelectorAll('.icon-item-sample');
	zoomLabel = document.querySelector('.zoom-label');
	iconList = document.querySelector('.icon-list');
	filterBar = document.querySelector('.view-controller');
	iconItems = document.querySelectorAll('.icon-item');
	initialSize = document.querySelector('.icon-item-sample').width;
	filterTop = document.querySelector('.view-controller').offsetTop;
	stickyTitle = document.querySelector('.sticky-heading');
	getFilterHeight(filterBar);
	normalizeWidths();

	filterBox.addEventListener('input', function(event) {
		event.preventDefault();
		queryIcons()
	});

	Array.prototype.forEach.call(expandButtons, function(element) {
		element.addEventListener('click', function(event) {
			event.preventDefault();
			var downloadList = element.parentNode.querySelector('.icon-download-list');
			if (downloadList.classList.contains('icon-download-list__visible')) {
				downloadList.classList.remove('icon-download-list__visible');
			}
			else {
				downloadList.classList.add('icon-download-list__visible');
			}
		});
	});

	zoomRange.addEventListener('input', function(event) {
		event.preventDefault();
		setIconSizes(parseInt(zoomRange.value));
		zoomLabel.innerText = zoomRange.value + ' px';
	});

	window.addEventListener('scroll', function() {
		if (window.scrollY >= filterTop - 16) {
			filterBar.classList.add('view-controller-fixed');
			iconList.style.marginTop = filterHeight + 'px';
			if (window.outerWidth > 750) {
				setProperty(stickyTitle, 'opacity', '1');
			}
		}
		else{
			filterBar.classList.remove('view-controller-fixed');
			iconList.style.marginTop = 0 + 'px';
			setProperty(stickyTitle, 'opacity', '0');
		}
	});

};

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}