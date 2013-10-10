//by heart options

"use strict";

var options = {

	ls: localStorage,

	options: options,

    init: function () {

		this.restore();

		this.listenerise();

		// this.ls.clear();

		return this;
    },

    listenerise: function () {

		$('#optionsForm').on('click', 'input[type=radio]', function () {

			var iconName = $(this).attr('id');

			options.store($(this).attr('name'), iconName);

			options.setIcon(iconName);

		});

    },

    restore: function () {

		var icon = this.ls.icon;

		if (icon === undefined) {

			// set default icon
			$('#iconH').attr('checked', true);

		} else {

			// set icon from ls
			$('#' + icon).attr('checked', true);

		}

    },

    store: function (option, value) {

		this.ls[option] = value;

    },

    setIcon: function (iconName) {

		var iconNum;

		switch (iconName) {
        case "iconC":
            iconNum = 1;
            break;
        case "iconI":
            iconNum = 2;
            break;
        default:
            iconNum = 3;
            break;
        }

        chrome.browserAction.setIcon({
			path: "img/icon19-" + iconNum + ".png"
        });

    }

};

$(document).ready(function () {

	options.init();

});