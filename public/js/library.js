var initialSize;
var filterTop, filterHeight;
var fileTypeLists, viewControllerPlaceholder, filterBox, expandButtons 
, zoomRange, iconSamples, zoomLabel, filterBar, iconItems, iconList;

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
}

var toggleElement = function(element, explicitState) {
	console.log('go implement toggleElement()!')
	if (element.classList.contains('hidden')) {
		element.classList.remove('hidden');
	}
	else {
		element.classList.add('hidden');
	}
}

var setIconSizes = function(size) {
	Array.prototype.forEach.call(iconSamples, function(icon) {
		icon.style.width = size.toFixed(0) + 'px';
	});
}

var getFilterHeight = function(filterBar) {
	var height = filterBar.offsetHeight;
	var margin = filterBar.style.marginBottom || 24;
	filterHeight = height + margin;
}

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
			toggleElement(downloadList);
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
				document.querySelector('.sticky-heading').classList.remove('hidden');
			}
		}
		else{
			filterBar.classList.remove('view-controller-fixed');
			iconList.style.marginTop = 0 + 'px';
			document.querySelector('.sticky-heading').classList.add('hidden');
		}
	});

};

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}