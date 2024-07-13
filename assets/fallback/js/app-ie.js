$(document).ready(function () {

	jQuery.uaMatch = function (ua) {
		ua = ua.toLowerCase();

		var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
			[];

		return {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
		};
	};

	if (!jQuery.browser) {
		matched = jQuery.uaMatch(navigator.userAgent);
		browser = {};

		if (matched.browser) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
		}

		if (browser.chrome) {
			browser.webkit = true;
		} else if (browser.webkit) {
			browser.safari = true;
		}

		jQuery.browser = browser;
	}


	var ie7 = $.browser.msie && parseFloat($.browser.version) < 8;
	var ie8 = $.browser.msie && parseFloat($.browser.version) < 9 && !ie7;

	//IE7 after clearfix!
	if (ie7) {

		$('html').addClass('ie7');

		$('.grid').each(function () {
			$(this).append('<span class="clear"></span>');
		});

		$('table').each(function () {
			$(this).attr('cellspacing', '0').attr('cellpadding', '0');
		});

	}

	if (ie8) {
		$('html').addClass('ie8');
	}

	// Ticks (pipe) fallback
	if (ie7) {
		$('ul.pipe.blue  > li').css('list-style-type','none').prepend('<span style="color: #00A6D6; position: absolute; left: 0; margin: 0.2em 0 0 0.2em; vertical-align: middle; font-size: 1em; line-height: 1.4em; font-family: icomoon; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none;">î˜‡</span>').find('p').css('margin','-15px 0 10 10');
		$('ul.pipe.green > li').css('list-style-type','none').prepend('<span style="color: #ABCF1C; position: absolute; left: 0; margin: 0.2em 0 0 0.2em; vertical-align: middle; font-size: 1em; line-height: 1.4em; font-family: icomoon; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none;">î˜‡</span>').find('p').css('margin','-15px 0 10 10');

		$('section > .content ul ul li').css('list-style-type','none').prepend('<span> â€“ </span>').find('p').css('margin','-15px 0 10 10');
	}
})