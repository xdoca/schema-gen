(function ( $ ) {
 
    $.fn.schema = function( options ) {
		
        var settings = $.extend({
			
        }, options );
 
        var tmp = this;
		var tmptext = "";
		
		var positions = [];
		
		
		
		var getXPos = function(index,total,parentPos, parentTotal){
			
			if(parentPos == null){
				console.log("its null");
			}
			
			let parentWidth = tmp.width() / parentTotal;
			let parentStart = parentPos - parentWidth/2;
			let parentEnd = parentStart + parentWidth;
			console.log(parentPos);
			console.log(parentWidth);
			console.log(parentStart);
			console.log(parentEnd);
			//return 200+parentStart + (parentWidth)/total * index;
			let itsWidth = (parentWidth / (total+1) * (index+1));
			let itsPos = parentStart + itsWidth;
			return [itsPos, itsPos-(itsWidth/2)]
		}
		
		var renderBox = function(allDatas, data,row,col,total_col, parent){
					console.log(total_col," ",col);
					let parentPos = positions.filter(x=>x.key == parent)[0];
					let parentTotal = allDatas.filter(x=>x.parent==parent).length
					
					if(parentPos !== undefined){
						parentPos = parentPos.x;
					}else{
						parentPos = tmp.width()/2;
						parentTotal =1;
					}
					
					
					var itsPos = (getXPos(col, total_col, parentPos,parentTotal));
					//console.log("thePos is "+itsPos)
					positions.push({key:data.key, x:itsPos[0],y:row, ratio:total_col})
					var tmptext = $("<div>");
					//tmptext.css("width", (100/total_col)+"%")
					tmptext.css("top", (10*row)+"%")
					tmptext.css("left", itsPos[0] );
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
				renderBox(data, val, level, findOrderIndex, tmp2.length,parent);
				
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