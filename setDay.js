;(function($){
	'use strict';
	if(typeof $ !== 'function'){
		return;
	}
	/**
     * return true only on wednesday
    **/
	var SetActiveDay = function($config) {
        this.$config = $config || $('');
        this.setDay = this.$config.attr('data-day') || this.defaults.day;
		this.$el = undefined;
		this.getElements();
		this.setEvents();
		this.$window = $(window);
    };

    SetActiveDay.prototype = {
        defaults: {
            day: 0
        },
    	getElements: function(){
    		this.$el = $('#js-cmFukubukuroContainer').find('.c-cmContentFb__single');
            this.$elOuter = $('#js-cmFukubukuroContainer').find('.c-cmContentFb');
    	},
    	setEvents: function(){
    		$(window).on('load', this.toggle.bind(this));
    	},
    	toggle: function(){
    		if(this.setSpDay()){
    			this.$el.addClass('active');
                this.$elOuter.addClass('active-outer');
    		}
    	},
    	setSpDay: function(){
			var d = this.convertToServerTimeZone()
			var day = d.getDay();
			var hours = d.getHours();
            //Set Day
			return day == this.setDay && hours >= 0 || day == this.setDay + 1 && hours < 1;
    	},
        convertToServerTimeZone(){
            var offset = +9.0; // JST +09:00
            var clientDate = new Date();
            var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000); // 1000 * 60: min in sec
            var serverDate = new Date(utc + (3600000 * offset)); // 1000 * 60 * 60: hour in sec
            return serverDate;
        }
    };
    $(function(){
        var $config = $('#r-setDayConfig');
   	    var setActiveDay = new SetActiveDay($config);
    });

})(jQuery);
