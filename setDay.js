;(function($){
	'use strict';
	if(typeof $ !== 'function'){
		return;
	}
	/**
     * return true only on wednesday
    **/
	var SetActiveWednesday = function() {
		this.$el = undefined;
		this.getElements();
		this.setEvents();
		this.$window = $(window);
    };

    SetActiveWednesday.prototype = {
    	getElements: function(){
    		this.$el = $('#el');
    	},
    	setEvents: function(){
    		$(window).on('load', this.toggle.bind(this));
    	},
    	toggle: function(){
    		if(this.setWednesday()){
    			this.$el.addClass('active');
    		}
    	},
    	setWednesday: function(){
			var d = this.convertToServerTimeZone()
			var day = d.getDay();
			var hours = d.getHours();

            //wednesday
			return day == 3 && hours >= 0 || day == 4 && hours < 1;
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
   	    var setActiveWednesday = new SetActiveWednesday();
    });

})(jQuery);
