/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-share': '&#xe601;',
		'icon-star': '&#xe603;',
		'icon-star2': '&#xe604;',
		'icon-star3': '&#xe605;',
		'icon-facebook': '&#xe608;',
		'icon-search': '&#xe60b;',
		'icon-arrow-right': '&#xe600;',
		'icon-arrow-down': '&#xe602;',
		'icon-arrow-up': '&#xe606;',
		'icon-twitter': '&#xe609;',
		'icon-ok': '&#xe607;',
		'icon-youtube': '&#xe60a;',
		'icon-chevron-left': '&#xe610;',
		'icon-chevron-right': '&#xe611;',
		'icon-menu': '&#xe61b;',
		'icon-account': '&#xe619;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());