(function ( $ ) {
 
    $.fn.schema = function( options ) {
		
        var settings = $.extend({
			
        }, options );
 
        var tmp = this;
		var tmptext = "";
		
		var positions = [];
		
		var renderBox = function(data,row,col,total_col, parent){
					console.log(total_col," ",col);
					
					positions.push({key:data.key, x:col,y:row})
					var tmptext = $("<div>");
					tmptext.css("width", (100/total_col)+"%")
					//tmptext.css("top", (10*row)+"%")
					//tmptext.css("left", ((col+1)/(total_col/100))/2+"%")
					tmptext.append($("<b>").html(data.name));
					tmp.append(tmptext);
					if(col+1==total_col){
						tmp.append("<div style='clear:both;'></div>");
					}					
						
		}
		
		
		 
		 
	
	
	
		var finishedParents = [];
		var appliedParent = [];
		var tmp2 = [];
		var findOrderIndex = 0;
		
		var boxGen = function(data, level, parent){
			data.filter(x => x.parent == parent).map(function(val){
				var row=0;
				tmp2 = data.filter(x=>x.parent==parent);
				findOrderIndex = tmp2.map(x=>x.key).indexOf(val.key);
				renderBox(val, level, findOrderIndex, tmp2.length,parent);
				
				boxGen(data, (level+1), val.key);											
			});	
		}
		
		boxGen(options.data,0,null);
		
	console.log(positions);
		
		
		console.log(options);
		
		/*
		
        var context = this[0].getContext("2d");
        
        context.beginPath();
        context.moveTo(50,50);
        context.lineTo(300,50);
        context.stroke();
        
        context.beginPath();
        context.moveTo(50,60);
        context.lineTo(300,150);
        context.stroke();
*/


		return tmp;
 
    };
 
}( jQuery ));