var sketch=angular.module('sketch',[]);
sketch.controller('sketchcontroller', ['$scope', function($scope){
	$scope.canvasWH={width:600,height:600};
	$scope.tool='line';
	$scope.tools={
		'画线':'line',
		'画圆':'arc',
		'矩形':'rect',
		'橡皮':'erase',
		'铅笔':'pen'
	};
	// $scope.bianse=function(){
	// 	$scope.tools.color="orange";
	// }
     $scope.csState={
          fillStyle:'#000000',
          strokeStyle:'#000000',
          lineWidth:1,
          style:'stroke'
     };
     $scope.setStyle=function(s){
          $scope.csState.style=s;
     }
     	$scope.save = function(ev){
		if(current){
			ev.srcElement.href=canvas.toDataURL();
			ev.srcElement.download = 'mypic.png';
		}else{
			alert('空画布');
		}
	}
     $scope.save=function(ev){
     	if(current){
     		ev.srcElement.href=canvas.toDataURL();
        ev.srcElement.download="mypic.png";
     	}else{
     		alert('空画布')
     	}
        
     }
	$scope.settool=function(tool){
       $scope.tool=tool;
	};
	var canvas=document.querySelector('#canvas');
	ctx=canvas.getContext('2d');
	var clearcanvas=function(){
        ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	};
	var current;
	var setmousemove={
		arc:function(e){
          canvas.onmousemove=function(ev){
          	clearcanvas();
         if(current)
              {
              	ctx.putImageData(current,0,0);
              }
	    ctx.beginPath();
		var r=Math.abs(ev.offsetX-e.offsetX);
		ctx.arc(e.offsetX,e.offsetY,r,0,Math.PI*2);
        
        if($scope.csState.style == 'fill'){
			ctx.fill();
		}else{
			ctx.stroke();
		 }
		}
		},
		line:function(e){
     canvas.onmousemove=function(ev){
        clearcanvas();
         if(current)
              {
              	ctx.putImageData(current,0,0);
              }
	    ctx.beginPath();
		ctx.moveTo(e.offsetX,e.offsetY);
        ctx.lineTo(ev.offsetX,ev.offsetY);
        ctx.stroke();
		}
		},
		rect:function(e){
         canvas.onmousemove=function(ev){
        clearcanvas();
         if(current)
              {
              	ctx.putImageData(current,0,0);
              }
	    ctx.beginPath();
		if($scope.csState.style=='fill'){
					ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY);	
				}else{
					ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY);	
				}
		}
		},
		erase:function(e){
          canvas.onmousemove=function(ev){
          	ctx.clearRect(ev.offsetX,ev.offsetY,20,20);
          }
		},
		pen:function(e){ 
			ctx.beginPath();
          ctx.moveTo(e.offsetX,e.offsetY);
        canvas.onmousemove=function(ev){
        clearcanvas();
         if(current)
              {
              	ctx.putImageData(current,0,0);
              }

          ctx.lineTo(ev.offsetX,ev.offsetY);
        ctx.stroke();
		}
		},
		// select:function(e){

		// }
	}
var saveCurrentImage =  function() {
		current = ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	}
	canvas.onmousedown=function(e){
		ctx.fillStyle = $scope.csState.fillStyle;
		ctx.strokeStyle = $scope.csState.strokeStyle;
		ctx.lineWidth  = $scope.csState.lineWidth;
		setmousemove[$scope.tool](e);
		document.onmouseup=function(){
              canvas.onmousemove = null;
			saveCurrentImage();
      
		}
	}

}])