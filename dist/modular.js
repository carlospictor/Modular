(function( $ ){
	var methods = {
		init : function( options ) { 
			var _settings = $.extend({
				'waypoints'	:	'waypoints.min.js',
				'mode'		:	(this.data('mode'))? this.data('mode') : 'auto',	
				'fetch'		:	this.data('fetch'),	
				'target'	:	(this.data('target')) ? $(this.data('target')) : this,
				'placement'	:	(this.data('place'))? ((this.data('place')=='replace') ? this.data('place')+'With': this.data('place')) : 'after',
				'loaded'	:	(this.data('loaded')) ? this.data('loaded') : false,
				'offset'	:	(this.data('offset')) ? this.data('offset') : '100%'
			}, options);
		
       		return this.each(function(){
					var $this = $(this)	;	
					switch(_settings.mode){
						case 'click':
							$this.on('click',function(event) {
								event.preventDefault();
								fetchFragment();
							});	
						break;
						case 'viewport':
							$.ajax({
								url: _settings.waypoints,
								dataType: 'script',
								cache: true,
								success: function (data) {
										$this.waypoint(function() {
											fetchFragment();	
										}, { offset: _settings.offset });
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
									alert(textStatus);
								}
							});
						break;
						default:
							fetchFragment();	
						break;
					}
					
					function fetchFragment(){
						if(!_settings.loaded){
							$.ajax({
								url: _settings.fetch,
								cache: true,
								success: function (data) {
									_settings.target[ _settings.placement ](data);
									_settings.loaded=true;
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
									alert(textStatus);
								}
							});
						}
					}
					return false;
			});	
		}
  	};
	
  	$.fn.modular = function( method ) {
		if ( methods[method] ) {
      		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
      		return methods.init.apply( this, arguments );
    	} else {
      		$.error( 'Method ' +  method + ' does not exist on jQuery.modular' );
    	}    
  	};
})( jQuery );
