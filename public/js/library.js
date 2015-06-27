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

var toggleClass = function(element, className, explicit) {
	if (explicit === true) {
		element.classList.add(className);
		return;
	}
	else if (explicit === false) {
		element.classList.remove(className);
		return;
	}

	if (element.classList.contains(className)) {
		element.classList.remove(className);
	}
	else {
		element.classList.add(className);
	}
}

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

	Array.prototype.forEach.call(expandButtons, function(thisButton) {
		thisButton.addEventListener('click', function(event) {
			event.preventDefault();
			var activeClassName = 'icon-download-list--visible';
			var currentlyExpandedList = document.querySelector('.icon-download-list--visible');
			var thisDownloadList = thisButton.parentNode.querySelector('.icon-download-list');
			if (currentlyExpandedList && currentlyExpandedList !== thisDownloadList) {
				toggleClass(currentlyExpandedList, activeClassName, false);
			}
			toggleClass(thisDownloadList, activeClassName);
		});
	});

	zoomRange.addEventListener('input', function(event) {
		event.preventDefault();
		setIconSizes(parseInt(zoomRange.value));
		zoomLabel.innerText = zoomRange.value + ' px';
	});

	window.addEventListener('scroll', function() {
		if (window.scrollY >= filterTop) {
			toggleClass(filterBar, 'view-controller-fixed', true);
			iconList.style.marginTop = filterHeight + 'px';
			toggleClass(stickyTitle, 'sticky-heading--visible', true);
		}
		else{
			toggleClass(filterBar, 'view-controller-fixed', false);
			iconList.style.marginTop = 0 + 'px';
			toggleClass(stickyTitle, 'sticky-heading--visible', false);
		}
	});
};

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}