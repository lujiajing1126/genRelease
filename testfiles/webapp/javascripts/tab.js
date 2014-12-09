$(function() {
	// extend Zepto Fn
	function Plugin(option) {
		return this.each(function() {
			var $this = $(this)
			data = new Tab(this);
			$this.data('bs.tab', data);
			if (typeof option == 'string') data[option]()
		});
	}
	var Tab = function(element) {
		this.element = $(element)
	}

	Tab.VERSION = '3.2.0@twbs'

	Tab.prototype.show = function() {
		var $this = this.element
		var $ul = $this.closest('ul:not(.dropdown-menu)')
		var selector = $this.data('target')

		if (!selector) {
			selector = $this.attr('href')
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
		}

		if ($this.parent('li').hasClass('active')) return
		var previous = $ul.find('.active a')[0]
		var e = $.Event('show.bs.tab', {
			relatedTarget: previous
		})

		$this.trigger(e)

		if (e.isDefaultPrevented()) return

		var $target = $(selector)

		this.activate($this.closest('li'), $ul)
		this.activate($target, $target.parent(), function() {
			$this.trigger({
				type: 'shown.bs.tab',
				relatedTarget: previous
			})
		})
	}

	Tab.prototype.activate = function(element, container, callback) {
		var $active = container.find('li.active')
		console.log(container)
		var transition = callback && $.support.transition && $active.hasClass('fade')
		console.log(transition)
		function next() {
			$active
				.removeClass('active')
				.find('.dropdown-menu > .active')
				.removeClass('active')

			element.addClass('active')

			if (transition) {
				element[0].offsetWidth // reflow for transition
				element.addClass('in')
			} else {
				element.removeClass('fade')
			}

			if (element.parent('.dropdown-menu')) {
				element.closest('li.dropdown').addClass('active')
			}

			callback && callback()
		}

		transition ?
			$active
			.one('bsTransitionEnd', next)
			.emulateTransitionEnd(150) :
			next()

		$active.removeClass('in')
	}
	$.extend($.fn, {
		tab: Plugin
	});
	$.fn.tab.Constructor = Tab;
	// Listen events
	$(document).on('click', 'ul.whosv-list > li > a[data-toggle=tab]', function() {
		Plugin.call($(this), 'show');
	});
});