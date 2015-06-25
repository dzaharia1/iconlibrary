var iconList = [];
var initialSize;
var filterTop;
var widestIcon = 0;

$(document).ready(function() {
	$('.icon-item').each(function() {
		iconList.push($(this));
	});
	$('.icon-download-list').hide();
	initialSize = $('.icon-item-sample').width();
	filterTop = $('.view-controller').offset().top;
	$('.view-controller-understudy').height($('.view-controller').height());
	$('.view-controller-understudy').css('margin-bottom', $('.view-controller').css('margin-bottom'));
	normalizeWidths();

	$('.search-box').on('input', function(e) {
		e.preventDefault();
		queryIcons($(this).val());
	});

	$('.icon-item-expand').click(function(e) {
		e.preventDefault();
		$(this).parent().children('.icon-download-list').slideToggle();
		$(this).parent().children('.icon-download-link').fadeToggle(300);

	});

	$('.zoom-range').on('input', function() {
		var calculatedSize = initialSize * ($(this).val() / 100);
		$('.icon-item-sample').width(calculatedSize);
		$('.zoom-label').html(calculatedSize.toFixed(0) + ' px');
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() >= filterTop - 16) {
			$('.view-controller').css('position', 'fixed');
			$('.view-controller').css('top', '0');
			$('.view-controller').css('width', '90%');
			$('.view-controller').css('padding', '16px 0');
			$('.view-controller').css('border-bottom', '1px #ddd solid');
			$('.view-controller-understudy').css('display', 'block');
			if ($(window).width() > 750){
				$('.sticky-heading').fadeIn(300);
			}
		}
		else {
			$('.view-controller').css('position', 'relative');
			$('.view-controller').css('width', '100%');
			$('.view-controller').css('padding', '0');
			$('.view-controller').css('border-bottom', 'none');
			$('.view-controller-understudy').css('display', 'none');
			$('.sticky-heading').fadeOut(300);
		}
	});

	$(window).resize(function(){
		if ($(window).width() < 750){
			$('.sticky-heading').css('display', 'none');
		}
		filterTop = $('.view-controller').offset().top;
	});
});

function normalizeWidths() {
	$('.icon-title').each(function(){
		if ($(this).width() > widestIcon){
			widestIcon = $(this).width();
		}
	});
	$('.icon-title').width(widestIcon);
}

function queryIcons(searchString) {
	var i = 0;
	$('.icon-item').detach();
	for (i = 0; i < iconList.length; i ++) {
		var queryIndex = iconList[i].data('tags').indexOf(searchString);
		if (queryIndex > -1){
			iconList[i].appendTo($('.icon-list'));
		}
	}
}