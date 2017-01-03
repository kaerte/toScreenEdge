(function($){
	$.fn.toScreenEdge = function(options) {
		var settings = $.extend({
			direction: 'right'
		}, options );

		var uniqId = '_' + Math.random().toString(36).substr(2, 9);
		var el = $(this);
		//el.parent().css('overflow','hidden');
		var elInner = $('<div id="'+uniqId+'"></div>').width(el.parent().width());
		el.wrapInner( elInner );
		var elHtml = el.html();

		var elC = el.clone().empty();
		elC.insertAfter(el).css({'visibility':'hidden', 'position':'absolute', 'width' : '100%', 'top': 0});

		function calc() {
			//el.css({'height': '', 'width' : '', 'marginBottom': '', 'marginTop' : ''});
			var offset = elC.offset(),
			pos = elC.position(),
			w = elC.width(),
			h = elC.height();
			offset.right = $(window).width() - offset.left - w;
			offset.bottom = $(window).height() - offset.top - h;

			//set wrapper width
			$('#'+uniqId).width(el.parent().width());
		

			//todo Fix top and bottom
			switch (settings.direction) {
				case 'top':
					el.css({'position': 'relative', 'height': offset.top + h, top: -offset.top, 'marginBottom': -offset.top});
					break;
				case 'right':
					//$('#'+uniqId).css({'float':'left'});
					el.css({'position': 'relative', 'width': offset.right + w, right: 0, 'height': '100%'});
					break;
				case 'bottom':
					el.css({'position': 'relative', 'height': offset.bottom + h, top: offset.bottom, 'marginTop': -offset.bottom});
					break;
				case 'left':
					//$('#'+uniqId).css({'float':'right'});
					el.css({'position': 'relative', 'width': offset.left + w, left: -offset.left, 'height': '100%'});
				break;
			}
		}
		calc();
		
		
		$(window).on('resize', function() {
			calc();
		});
		
	};
}(jQuery));