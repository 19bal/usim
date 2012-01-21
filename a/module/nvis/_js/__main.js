	// the custom data structure (_directedGraphCustom.js)
	var g = new DirectedGraph();
	
	// a variable to save existing graphs
	var graphs = new Array();
	
	// to be used if reseting graph then injecting content again
	var description = $("#canvas").html();

	// setting canvas size depending on your window actual size
	$("#canvas").css({height:(window.innerHeight-$("#form").height()-45)+"px",width:(window.innerWidth-38)+"px"});
	var canvasWidth = parseInt($("#canvas").css("width").slice(0,$("#canvas").css("width").length-2));
	var canvasHeight = parseInt($("#canvas").css("height").slice(0,$("#canvas").css("height").length-2));
	
	//edge flags
	var edgeFlag = {from:null,to:null,fromMenu:null,fromDelete:null,fromShortestPath:null};

	// input text focus manipulation
	$("#form > input:eq(1)").focusin(function(){
		$(this).val()=="Node" ? $(this).val("").css({"color":"black"}) : null;
	}).focusout(function(){
		$(this).val()=="" ? $(this).val("Node").css({"color":"#999"}) : null;
	});
	
	$("#form > input:eq(0)").focusin(function(){
		$(this).val()=="Untitled graph" ? $(this).val("").css({"color":"black"}) : null;
	}).focusout(function(){
		$(this).val()=="" ? $(this).val("Untitled graph").css({"color":"#999"}) : null;
	});	
	
	// flags for handling the buttons to be locked


	// switch for the button click events
	$("#form > a.button").click(function(){		
		key = $(this).html();
		switch(key){
			case "Dal":
			case "İlaçlar":
			case "Tahlil":
			case "Harita":
			case "Rapor":
				jPrompt("Dügüm adı","düğüm","Düğüm", function(r){
					if(r!="" && r!="düğüm") {
						if(!addNode(new Element(r , key)))
							$.notifyBar({html:"Düğüm zaten var, ekleyemedim.",cls:"error"});
					}
				});
				break;
			case "Bağlar":
				if(g.nodes.length>0){
					var r = "<input type=\"hidden\" name = \"edges\" id=\"edges\"  value=\"";
					var matrix = g.getMatrix("weighted");

					for(var i=0;i<g.nodes.length;i++){
						for(var j=0;j<g.nodes.length;j++){
							if(typeof matrix[i][j] != "boolean" && typeof matrix[i][j] != "undefined")
								r+=matrix[i][j].toString();
							else if(matrix[i][j] == true && typeof matrix[i][j] != "undefined")
								r+="1";
							else if( typeof matrix[i][j] == "undefined")
								r+="1";
							else
								r+='0';
								
							if ( (j + 1) != g.nodes.length){	
								r+=',';
							}
						}
						if ( (i + 1) != g.nodes.length){	
							r+=';';
						}
					}
					r+='\">';
					
					alert(r);
					
					$("#edges").html(r);
				}
				else
					$.notifyBar({html:"The graph is empty<br/>Try adding some nodes first",cls:"error"});
			break;
			case "Düğümler":
				if(g.nodes.length>0){
					var r = "<input type=\"hidden\" name = \"nodes\" id=\"nodes\"  value=\"";

					for(var i=0; i < g.nodes.length; i++) {
						r += g.nodes[i].getName();
						alert(g.nodes[i].toStr());
						
						if ( (i + 1) != g.nodes.length){	
							r+=';';
						}
					}
					r+='\">';
			
					alert(r);

					$("#nodes").html(r);
				}
				else
					$.notifyBar({html:"The graph is empty<br/>Try adding some nodes first",cls:"error"});
				break;			
			case "Uygulamayı yeniden başlat":
				if(g.nodes.length>0)
					jConfirm("All unsaved changes will be lost.<br/>Really reset?", "About to reset your graph", function(r){
						if(r){
							$("#canvas").fadeOut().delay(300).fadeIn();
							window.setTimeout(function(){
								$("#canvas").html(description);
							}, 300);
							g = new DirectedGraph();
						}
					});
				else
					$.notifyBar({html:"There's nothing to reset"});
				break;
			case "Yeniden Çiz":
				if(g.nodes.length>0)
					plot();
				else
					$.notifyBar({html:"There's nothing to draw or redraw<br/>Try adding some nodes first"});
				break;
			case "Test":
				$.get('/a/public/ajax/get_edges.php?cid=' + getCID(), function (data) {
					$.notifyBar({html:data});

					//var nodes = jQuery.parseJSON(data);
					//$.notifyBar({html: "PHP ile gonderilen dizinin 'a' keyinin degeri => " +  nodes['a']});
				});
				break;
		}
	});
			
	/* Canvas and plotting functions */	

	// main plot function
	var plot = function(){
		$("#canvas").empty();
		var gr = new Graph();
		var nodeNames = new Array();
		for(var i=0;i<g.nodes.length;i++){
			nodeNames.push(g.nodes[i].getName());
		}
		gr.addNodesFromArray(nodeNames);
		var arr = new Array();
		for(var i=0;i<g.edges.length;i++)
			for(var j=0;j<g.edges[i].targets.length;j++)
				if(typeof g.edges[i].targets[j][1] == "undefined"){
					//console.log("12345  " + g.edges[i].node.getName()+ "   "  + g.edges[i].targets[j][1]);
					arr.push([g.edges[i].node.getName(),g.edges[i].targets[j].getName(),{directed:true,label:""}])
				}
				else{
					//console.log("bzaar  " + g.edges[i].node.getName()+ "   "  + g.edges[i].targets[j]);
					arr.push([g.edges[i].node.getName(),g.edges[i].targets[j][0].getName(),{directed:true,label:g.edges[i].targets[j][1]}]);
				}
		gr.addEdgesFromArray(arr);
		var layouter = new Graph.Layout.Spring(gr);
		layouter.layout();
		var renderer = new Graph.Renderer.Raphael("canvas",gr,window.innerWidth-100,window.innerHeight-130);
		renderer.draw();
		bindEllipses();
	};
	
	// a binding function that is inserted each time the svg graph is redrawn
	var bindEllipses = function(){

		// bind ellipse for click (to complete addEdge or removeEdge functions)
		$("#canvas > svg > ellipse").bind("click",function(){
			if(edgeFlag.fromMenu){
				if(edgeFlag.from!=$(this).attr("id")){
					edgeFlag.to=$(this).attr("id");
					jPrompt("Link metnini giriniz<br/>BoÅŸ bÄ±rakÄ±rsanÄ±z Ã¶ntanÄ±mlÄ± deÄŸer atanÄ±r","link metni","Link Metni", function(r){
						if(r=="")
							r="k-e-y--12344992334"
						if(r){
							if(r!="k-e-y--12344992334"){
								if(parseFloat(r))
									tx=parseFloat(r);
								addEdge(edgeFlag.from,edgeFlag.to,r);
							}
							else
								addEdge(edgeFlag.from,edgeFlag.to);
							edgeFlag.from = null;
							edgeFlag.to = null;
							edgeFlag.fromMenu = null;
						}
						else{
							edgeFlag.from = null;
							edgeFlag.to = null;
							edgeFlag.fromMenu = null;
						}
					});
				}
				else
					$.notifyBar({html:"A node can't point to itself<br/>Click on another node to add a target<br/>If you wish to cancel press [escape]",cls:"error",delay:5000});
			}
			else if(edgeFlag.fromDelete){
				edgeFlag.to = $(this).attr("id");
				if(g.hasEdge(edgeFlag.from,edgeFlag.to))
					removeEdge(edgeFlag.from,edgeFlag.to);
				else
					$.notifyBar({html:"The edge from <span style='color:green'>" + edgeFlag.from + "</span> to <span style='color:green'>" + edgeFlag.to + "</span> doesn't exist",cls:"error"});
				edgeFlag.from=null;
				edgeFlag.to=null;
				edgeFlag.fromDelete=null;
			}
		});
		
		// bind ellipse for doubleclick (to perform the addEdge function)
		$("#canvas > svg > ellipse").bind("dblclick",function(){
			edgeFlag.from = $(this).attr("id");
			edgeFlag.fromMenu = true;
			$.notifyBar({html:"Å�imdi hedef dÃ¼ÄŸÃ¼me tÄ±kla"});				
		});
		
		$('#canvas > svg > ellipse').bind('contextmenu',function(){
			displayMenu($(this).attr("id"), parseInt($(this).attr("cx")), parseInt($(this).attr("cy")));
			return false;
		});

		
		var displayMenu = function(node,x,y){
			$(".vmenu > div:eq(0) > span").html(node);
			$(".vmenu").css({
				"top":(y+30)+"px",
				"left":(x+70)+"px"
			}).fadeIn(200);
		};

		$("body").bind("click",function(){
			$(".vmenu").fadeOut(200);
		});

		$("#createEdge").bind("click",function(){
			edgeFlag.from=$(".vmenu > div:eq(0) > span").html();
			edgeFlag.fromMenu = true;
			$.notifyBar({html:"Å�imdi hedef dÃ¼ÄŸÃ¼me tÄ±kla"});
			$(".vmenu").fadeOut(50);
		});
		
		$("#removeNode").bind("click",function(){
			var thisNode = $(".vmenu > div:eq(0) > span").html();
			if(g.hasEdgeFrom(thisNode)||g.hasEdgeTo(thisNode)){
				jConfirm("Bu dÃ¼ÄŸÃ¼m silinirken aynÄ± zamanda tÃ¼m baÄŸlarÄ± da silinecek<br/>Devam etmek istediÄŸinizden emin misiniz?","DÃ¼ÄŸÃ¼m silmeyi onayla", function(r){
					if(r)
						removeNode(thisNode);
				});
			}
			else
				removeNode(thisNode);
			$(".vmenu").fadeOut(50);
		});
		
		$("#removeEdge").bind("click",function(){
			if(g.hasEdgeFrom($(".vmenu > div:eq(0) > span").html())){
				edgeFlag.fromDelete = true;
				edgeFlag.from=$(".vmenu > div:eq(0) > span").html();
				$.notifyBar({html:"Å�imdi hedef dÃ¼ÄŸÃ¼me tÄ±kla"});
			}
			else
				$.notifyBar({html:"Bu dÃ¼ÄŸÃ¼m herhangi bir dÃ¼ÄŸÃ¼mle baÄŸlÄ± deÄŸil",cls:"error"});
			$(".vmenu").fadeOut(50);
		});
		
		$("#canvas > svg > ellipse").css({"cursor":"pointer"});
		
	};

	var getCID = function(){
		return document.getElementById('cid').value;
	};

	// addNode
	var addNode = function(node){
		if(g.addNode(node)){
			plot();
			$.get('/a/public/ajax/add_node.php?cid=' + getCID() + '&id=' + node.getId() + '&ntype=' + node.getType() + '&title=' + node.getName(), function (data) {
				$.notifyBar({html:data});
				node.setId(data);
			});
			return true;
		}
		else
			return false;
	};
	
	// removeNode
	var removeNode = function(node){
		g.removeNode(node);
		plot();
		$.get('/a/public/ajax/remove_node.php?cid=' + getCID() + '&id=' + getNID(node), function (data) {
			$.notifyBar({html:data});
		});
	};
	
	// addEdge
	var addEdge = function(from,to,value){
		if(g.addEdge(from,to,value)) {
			plot();
			$.get('/a/public/ajax/add_edge.php?from=' + from.getId() + '&to=' + to.getId() + '&value=' + value, function (data) {
				$.notifyBar({html:data});
			});
		}
	};
	
	var removeEdge = function(from,to){
		if(g.removeEdge(from,to)) {
			plot();
			$.get('/a/public/ajax/remove_edge.php?from=' + from.getId() + '&to=' + to.getId(), function (data) {
				$.notifyBar({html:data});
			});
		}
	};
	
	// onResize function and variable
	var onResize = function(){
		$("#canvas").css({height:(window.innerHeight-$("#form").height()-45)+"px",width:(window.innerWidth-38)+"px"});
		if(g.nodes.length>0)
			plot();
	};
	var timer;
	// bind the window to listen for resize event
	$(window).resize(function(){
	   timer && clearTimeout(timer);
	   timer = setTimeout(onResize, 100);
	});
	
// experiment: web speech
var speak = function(value){
	if(value!=""&&value!="Node"){
		if(!addNode(value))
			$.notifyBar({html:"Node already exists, it wasn't added",cls:"error"});
		$("#form > input:eq(1)").val("").focus();
	}
};

var secret = function(value){
	$("#secret-text").append('"'+value +'" ');
};

$("#secret-close").bind("click",function(){
	$("#secret-text").empty();
	$("#secret").fadeOut(100);
});

// super experimental
var secretFlag = [false,false,false]
$(document).keydown(function(e){
	if(e.which==27){
		if(edgeFlag.fromMenu){
			edgeFlag.fromMenu=null;
			edgeFlag.from=null;
			edgeFlag.to=null;
			$.notifyBar({html:"Adding this edge was cancelled"});
		}
		else if(edgeFlag.fromDelete){
			edgeFlag.fromDelete=null;
			edgeFlag.from=null;
			edgeFlag.to=null;
			$.notifyBar({html:"Deleting edge was cancelled"});
		}
		else if($(".vmenu").is(":visible")){
			$(".vmenu").fadeOut();
		}
	}
	switch(e.which){
		case 17:
			secretFlag[0]=true;
		break;
		case 16:
			secretFlag[1]=true;
		break;
		case 83:
			secretFlag[2]=true;
		break;
	}
	if(secretFlag[0]&&secretFlag[1]&&secretFlag[2])
		$("#secret").fadeIn(2000);
}).keyup(function(e){
	switch(e.which){
		case 17:
			secretFlag[0]=false;
		break;
		case 16:
			secretFlag[1]=false;
		break;
		case 83:
			secretFlag[2]=false;
		break;
	}		
});

// initialize application
$(document).ready(function(){
	if(getCookie("graphsCookie")){
		graphs = JSON.parse(getCookie("graphsCookie"));
	}
	for(var i=0;i<graphs.length;i++)
		$("#form > select").append('<option>'+graphs[i]+'</option>');
	
	$.get('/a/public/ajax/get_nodes.php?cid=' + getCID(), function (data) {
		$.notifyBar({html:data});
		g.addNodeFromString(data);
	});
	$.get('/a/public/ajax/get_edges.php?cid=' + getCID(), function (data) {
		$.notifyBar({html:data});

		console.log(data);
		g.addEdgesFromString(data);
	});

	window.setTimeout(function(){
		$("#loading-overlay").fadeOut(400);
	},1500);

	plot();
});
//g.addNodeFromString(document.getElementById("nodes").value);
// g.addEdgesFromString(document.getElementById("edges").value);

plot();