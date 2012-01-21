/*
 * Edge
 */
	
function Edge(node,target,value){
	this.node=undefined;
	this.targets=new Array();
	node ? this.node=node : null;
	if(target&&value)
		this.addTarget(target,value)
	else if(target){
		if(target instanceof Element)
			this.addTargets(target);
		else
			this.addTarget(target);
	}
}
Edge.prototype = {
	constructor:Edge,
	create:function(node,targets){
		var r = null;
		if(node&&targets){
			this.node=node;
			this.addTarget(targets);
			r=node;
		}
		return r;
	},
	addTarget:function(target,value){
		var r = false;
		if(target&&this.node!=undefined){
			if(target instanceof Element){
				r = new Array();
				for(var i=0;i<target.length;i++){
					var j=0,found=false;
					while(j<this.targets.length&&!found){
						this.targets[j].getName()==target[i].getName()||this.targets[j][0].getName()==target[i][0].getName()||this.targets[j].getName()==target[i][0].getName()||this.targets[i][0].getName()==target[i].getName() ? found=true : null;
						j++;
					}
					if(j==this.targets.length){
						this.targets.push(target[i]);
						r.push(target[i]);
					}
				}
			}
			else{
				var i=0,found=false;
				while(i<this.targets.length&&!found){
					//console.log("bzaar  " + this.targets[i] + "   "  + target.getName());
					this.targets[i][0].getName()==target.getName()||this.targets[i][0].getName()==target.getName() ? found=true : null;
					i++;
				}
				if(!found){
					if(!value)
						this.targets.push(target);
					else{
						if(parseFloat(value))
							this.targets.push([target,parseFloat(value)]);
						else
							this.targets.push([target,value]);
					}
					r = target;
				}
			}
		}
		return r;
	},
	/* warning: very raw, to be handled by specific functions */
	addTargets : function(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i] instanceof Element && arr[i][1])
				this.targets.push([arr[i][0],arr[i][1]]);
			else
				this.targets.push(arr[i]);
		}
	},
	removeTarget:function(target){
		var r = null;
		if(target){
			if(target instanceof Element){
				r = new Array();
				for(var i=0;i<target.length;i++){
					var j=0;
					while(this.targets[j]!=undefined){
						if(this.targets[j]==target[i]){
							r.push(target[i]);
							this.targets.splice(j,1);
							j--;
						}
						j++;
					}
				}
			}
			else{
				var i=0;
				while(this.targets[i]!=undefined){
					if(this.targets[i]==target){
						r = target;
						this.targets.splice(i,1);
						i--;
					}
					i++;
				}
			}
		}
		return r;
	},
	hasTarget:function(target){
		if(target instanceof Element){
			for(var i=0;i<this.targets.length;i++) {
				if(typeof this.targets[i][0] != "undefined"){
						if(this.targets[i][0].getName() == target.getName())
							return true;
				}
				else if(typeof this.targets[i] != "undefined"){
					if(this.targets[i].getName() == target.getName())
						return true;
					}
			}
			return false;
		}
		else{
			for(var i=0;i<target.length;i++)
				if(!this.hasTarget(target[i]))
					return false;
			return true;
		}
	},
	indexOfTarget:function(target){
		for(var i=0;i<this.targets.length;i++)
			if(this.targets[i] == target || this.targets[i][0] == target)
				return i;
		return false;
	}
}

/*
 * DirectedGraph
 */
 function Element(name, nType){
	this.name = name;
	this.nType = nType;
	this.id = null;
	this instanceof Element;
 }
 Element.prototype = {
	constructor:Element,
	type:Element,
	getName: function(){
		return this.name;
	},
	getType: function(){
		return this.nType;
	},
	getDefination: function(){
		var def = new Array();
		def.push(this.id);
		def.push(this.name);
		return def;
	},
	getId: function(){
		return this.id;
	},
	setId: function(id){
		this.id = id;
	},
	toStr: function(){
		return "name: " + this.getName() + ", id: " + this.getId() + ", ntype: " + this.getType();
	}
}
	
function DirectedGraph(init){
	this.name="untitled";
	this.nodes=new Array();
	this.edges=new Array();
	this.isBidirectional = false;
	if(!init instanceof Element){
		if(init.raw){
			this.name = init.raw.name;
			this.nodes = init.raw.nodes;
			for(var i=0;i<init.raw.edges.length;i++){
				this.edges.push(new Edge(init.raw.edges[i].node,init.raw.edges[i].targets));
			}
			this.isBidirectional = init.raw.isBidirectional;
		}
		else{
			init.type=="bidirectional" ? this.setType("bidirectional") : null;
			init.name ? this.setName(init.name) : null;
			init.nodes instanceof Element ? this.addNode(init.nodes) : null;
			init.edges instanceof Element ? this.addEdges(init.edges) : null;
		}
	}
}
DirectedGraph.prototype = {
	constructor: DirectedGraph,
	/*
	* setName
	* Sets the name of the Graph
	*/
	setName: function(name){
		this.name = name;
	},
	
	findNodeByName: function(name){
		for(var i=0;i<this.nodes.length;i++)
				if(this.nodes[i].getName() == name)
					return this.nodes[i];
		return false;					
	},
	/*
	* setType
	* Sets the type of Graph. It must be empty to
	* set the type. Can be: unidirectional (set by default),
	* or bydirectional.
	*/
	setType: function(how){
		if(this.isEmpty()){
			switch(how){
				case "unidirectional":
					this.isBidirectional=false;
					break;
				case "bidirectional":
					this.isBidirectional=true;
					break;
				default:
					return false;
			}
			return true;
		}
		return false;
	},
	/*
	* isEmpty
	* Checks if the array of nodes is empty
	* @return True if is empty, false if it isn't
	*/
	isEmpty: function(){
		if(this.nodes.length==0)
			return true;
		return false;
	},
	/*
	* reset
	* Creates a new array for the nodes and for the
	* edges (it empties the Graph), and leaves only
	* the type of Graph value
	*/
	reset: function(){
		this.nodes = new Array();
		this.edges = new Array();
	},
	/*
	* addNode
	* Adds a node to the Graph, verifying first if the
	* value of the node exists already.
	* @return true if the node was inserted, and
	* false if it wasn't because it was already there
	*/
	addNode: function(a){
		if(a instanceof Element){
			if(!this.hasNode(a)){
				this.nodes.push(a);
				return a;
			}
			return false;
		}
		else{
			var r = new Array();
			for(var i=0;i<a.length;i++)
				if(this.addNode(a[i]))
					r.push(a[i]);
		}
		return r;
	},
	/*
	* hasNode
	* Checks if the given value is contained on the Graph
	* @return true if it is. False if it isn't.
	*/
	hasNode: function(a){
		if(a instanceof Element){
			for(var i=0;i<this.nodes.length;i++){
			//console.log("hs node  " + this.nodes[i].getName() + "   "  + a.getName());
				if(this.nodes[i].getName() == a.getName())
					return true;
				}	
			return false;
		}
		else{
			for(var i=0;i<a.length;i++)
				if(!this.hasNode(a[i]))
					return false;
			return true;
		}
	},
	/*
	* removeNode
	* Removes a node. If the node has edges departing from it, this
	* function will remove them too.
	* WORKS
	*/
	removeNode: function(a){
		if(a instanceof Element){
			for(var i=0;i<this.nodes.length;i++){
				if(this.nodes[i].getName()==a.getName()){
					if(this.hasEdgeFrom(a))
						this.edges.splice(this.indexOfEdge(a),1);
					if(this.hasEdgeTo(a)){
						for(var j=0;j<this.nodes.length;j++)
							if(this.hasEdge(this.nodes[j],a))
								this.removeEdge(this.nodes[j],a);
					}
					this.nodes.splice(i,1);
					i--;
					return a;
				}
			}
			return false;
		}
		else{
			var r = new Array();
			for(var i=0;i<a.length;i++)
				if(this.removeNode(a[i]))
					r.push(a[i]);
			return r;
		}
	},
	
	addEdgeByObject: function(from,to,value,once){
		if(from.getName()&&to.getName()){
			if(from.getName()!=to.getName()){
				var r = false;
				if(!this.hasNode(from))
					//console.log("Hata kontrol 55");
					this.addNode(from);
				if(!this.hasNode(to))
					//console.log("Hata kontrol 55");
					this.addNode(to);
				if(!this.hasEdgeFrom(from)){
					if(value&&value!=""){
						this.edges.push(new Edge(from,to,value));
						//console.log("added edge '"+from+"' to point '"+to.toString()+"(weight: "+value+")'");
						r = true;
					}
					else{
						this.edges.push(new Edge(from,to));
						//console.log("added edge '"+from+"' to point '"+to.toString()+"'");
						r = true;
					}
				}
				else{
					if(!value || value==""){
						if(this.edges[this.indexOfEdge(from)].addTarget(to)){
							//console.log("updated edge '"+from+"' to point '"+to.toString()+"'");
							r = true;
						}
					}
					else if(this.edges[this.indexOfEdge(from)].addTarget(to,value)){
						//console.log("updated edge '"+from+"' to point '"+to.toString()+"(weight: "+value+")'");
						r = true;
					}
				}
				if(this.isBidirectional && !once){
					if(value && value!="")
						this.addEdge(to,from,value,true);
					else
						this.addEdge(to,from,"",true);
				}
				return r;
			}
		}
		return false;
	},
	/*
	* addEdge

	* parameters:
	*		from: 		the node from which de edge will depart
	*		to: 		the node in which the edge will arrive
	*		value: 		(optional) the weight of the edge
	*		once: 		(system only) a flag for function called recursively
	*					once in case the graph is bidirectional
	*/
	addEdge: function(from,to,value,once){
		from = this.findNodeByName(from);
		to = this.findNodeByName(to);
		console.log("added edge '"+from.getName()+"' to point '"+ to.getName());
		
		if(from.getName()&&to.getName()){
			if(from.getName()!=to.getName()){
				var r = false;
				if(!this.hasNode(from))
					//console.log("Hata kontrol 55");
					this.addNode(from);
				if(!this.hasNode(to))
					//console.log("Hata kontrol 55");
					this.addNode(to);
				if(!this.hasEdgeFrom(from)){
					if(value&&value!=""){
						this.edges.push(new Edge(from,to,value));
						console.log("added edge '"+from+"' to point '"+to.toString()+"(weight: "+value+")'");
						r = true;
					}
					else{
						this.edges.push(new Edge(from,to));
						console.log("added edge '"+from+"' to point '"+to.toString()+"'");
						r = true;
					}
				}
				else{
					if(!value || value==""){
						if(this.edges[this.indexOfEdge(from)].addTarget(to)){
							//console.log("updated edge '"+from+"' to point '"+to.toString()+"'");
							r = true;
						}
					}
					else if(this.edges[this.indexOfEdge(from)].addTarget(to,value)){
						//console.log("updated edge '"+from+"' to point '"+to.toString()+"(weight: "+value+")'");
						r = true;
					}
				}
				if(this.isBidirectional && !once){
					if(value && value!="")
						this.addEdge(to,from,value,true);
					else
						this.addEdge(to,from,"",true);
				}
				return r;
			}
		}
		return false;
	},
	/*
	* addEdges
	*/
	addEdges: function(edges){
		for(var i=0;i<edges.length;i++)

			console.log("gogogo edge '"+edges[i][0].getName()+"' to point '"+ edges[i][1].getName());
			this.addEdge(edges[i][0],edges[i][1]);
	},
	/*
	* indexOfEdge
	*/
	indexOfEdge: function(from){
		for(var i=0;i<this.edges.length;i++)
			if(from.getName()==this.edges[i].node.getName())
				return i;
		return false;
	},
	/*
	* indexOfNode
	*/
	indexOfNode: function(which){
		for(var i=0;i<this.nodes.length;i++)
			if(which.getName()==this.nodes[i].getName())
				return i;
		return false;
	},
	/*
	* hasEdge
	* WORKS
	*/
	hasEdge: function(which,to){
		for(var i=0;i<this.edges.length;i++)
			if(which.getName()==this.edges[i].node.getName())
				for(var j=0;j<this.edges[i].targets.length;j++)
					if(to.getName()==this.edges[i].targets[j].getName() || to.getName()==this.edges[i].targets[j][0].getName())
						return true;
		return false;
	},
	/*
	* hasEdgeTo
	* WORKS
	*/
	hasEdgeTo: function(which){
		for(var i=0;i<this.edges.length;i++)
			for(var j=0;j<this.edges[i].targets.length;j++)
				if(which.getName()==this.edges[i].targets[j].getName() || which.getName()==this.edges[i].targets[j][0].getName())
					return true;
		return false;
	},
	/*
	* hasEdgeTo
	* WORKS
	*/
	hasEdgeFrom: function(which){
		for(var i=0;i<this.edges.length;i++)
			if(which.getName()==this.edges[i].node.getName())
				return true;
		return false;
	},
	/*
	* removeEdgesFrom
	* WORKS
	*/
	removeEdgesFrom: function(which){
		if(this.hasEdgeFrom(which)){
			this.edges.splice(this.indexOfEdge(which),1);
			return which;
		}
		return false;
	},
	/*
	* removeEdge
	* WORKS
	*/
	removeEdge: function(node,target){
		if(this.hasEdgeFrom(node)){
			if(target instanceof Element){
				var arr = this.edges[this.indexOfEdge(node)].targets.slice();
				for(var i=0;i<arr.length;i++)
					if(arr[i] == target || arr[i][0] == target){
						arr.splice(i,1);
						if(arr.length>0)
							this.edges[this.indexOfEdge(node)].targets = arr;
						else
							this.edges.splice(this.indexOfEdge(node),1);
						return target;
					}
				return false;
			}
			else{
				var r = new Array();
				for(var i=0;i<target.length;i++)
					if(this.removeEdge(node,target[i]))
						r.push(target[i]);
				if(r.length==0)
					return false;
				else
					return r;
			}
		}
		else
			return false;
	},
	
	addNodeFromString: function(string){
		var nodes = JSON.parse(string);
		for(var i = 0; i < nodes.length; i++) {
			var node = new Element(nodes[i].name , nodes[i].type);
			node.setId(nodes[i].id);
			this.addNode(node);
		}
	},
	addEdgesFromString: function(string){
		var edges = JSON.parse(string);
		for(var i = 0; i < edges.length; i++) {
			for(var j = 0; j < edges[i].length; j++) {
				if(edges[i][j] == 0){
					continue
				}else if(edges[i][j] == 1){
					this.addEdgeByObject(this.nodes[i], this.nodes[j], "", "");
				}else {
					this.addEdgeByObject(this.nodes[i], this.nodes[j], edges[i][j], "");
				}
			}
		}
	},
	/*
	* getMatrix
	* WORKS
	*/
	getMatrix: function(w){
		
		// get length
		var length = this.nodes.length;
		
		// build matrix
		var matrix = new Array(length);
		for(var i=0;i<length;i++)
			matrix[i] = new Array(length);
		
		// fill matrix

		// test each node (cycle for each row)
		for(var i=0;i<length;i++){
			if(this.hasEdgeFrom(this.nodes[i])){
				var edge = this.edges[this.indexOfEdge(this.nodes[i])];
				for(var j=0;j<length;j++){
					if(edge.hasTarget(this.nodes[j])){
						if(typeof edge.targets[edge.indexOfTarget(this.nodes[j])] != "undefined" && w=="weighted"){
							matrix[i][j] = edge.targets[edge.indexOfTarget(this.nodes[j])][1];
						}
						else{
							matrix[i][j] = true;
						}
					}
					else
						matrix[i][j] = false;
				}
			}
			else
				for(var j=0;j<length;j++)
					matrix[i][j]=false;
		}
		
		
			// prepare //console text with matrix
			var t = "";
			for(var i=0;i<matrix.length;i++){
				for(var j=0;j<matrix[i].length;j++)
					t+=matrix[i][j]+",	";
				t+="\n";
			}
			
			// log //console
			//console.log(t);
			
			// return matrix
			return matrix;
	},
	/*
	* depth
	* WORKS
	*/
	depth: function(special){
		//init
		var checkValidGraph = function(graph){
			for(var i=0;i<graph.nodes.length;i++)
				if(!graph.hasEdgeFrom(graph.nodes[i]) && !graph.hasEdgeTo(graph.nodes[i]))
					return false;
			return true;
		}

		if(checkValidGraph(this)){
			// declare variables
			var paths = [], nodes = [], depth=0;
			
			// initialize nodes array
			for(var i=0;i<this.nodes.length;i++)
				nodes.push({node:this.nodes[i],visited:false});
			
			// define helper function (to be called recursively)
			var makePath = function(graph,node){
				if(node.visited){
					try{
						var targets = graph.edges[graph.indexOfEdge(node.node)].targets;
					}catch(e){
						var targets = null;
					}
					if(targets){
						for(var i=0;i<targets.length;i++){
							var thisTarget = null;
							if(targets[i] instanceof Element)
								thisTarget = targets[i][0];
							else
								thisTarget = targets[i];
							if(!nodes[graph.indexOfNode(thisTarget)].visited){
								nodes[graph.indexOfNode(thisTarget)].visited = true;
								depth++;
								paths.push(nodes[graph.indexOfNode(thisTarget)].node);
								// recursion
								makePath(graph,nodes[graph.indexOfNode(thisTarget)]);
							}
						}
					}
					else
						depth--;
				}
			}
			
			nodes[0].visited = true;
			makePath(this,nodes[0]);
			depth++;
			if(special){
				switch(special){
					case "path-Array":
						return paths;
					break;
					case "path-String":
						return paths.toString();
					break;
					case "depth,path-Array":
						return {depth:depth,path:paths};
					break;
					case "depth,path-String":
						return {depth:depth,path:paths.toString()};
					break;
				}
			}
			return depth;
		}
		return null;
	},
	/*
	* dijkstra
	*
	dijkstra: function(from,to){
		var mem = new Array();
		for(var i=0;i<g.nodes.length;i++)
			mem.push({node:nodes[i],cost:Infinity},lastCost:0);
		var check = function(graph,from,to){
			if(g.hasEdge(from,to)){
				var val = graph.edges[graph.indexOfEdge("d")].targets[graph.edges[graph.indexOfEdge("d")].indexOfTarget("e")][1];
				if(mem[graph.indexOfNode(to)].lastCost + val < mem[graph.indexOfNode(to)].cost){
					mem[graph.indexOfNode(to)].cost = mem[graph.indexOfNode(to)].lastCost + val;
					return val;
				}
			}
			return false;
		}
		var checkFrom = function(graph,from){
			var lowest = {node:null,cost:Infinity};
			for(i in graph.nodes){
				if(check(graph,from,graph.nodes[i]))
					if(val < lowest.cost){
						lowest.cost = val;
						lowest.node = graph.nodes[i];
					}
			}
			return lowest;
		}
		
	},
	/*
	* shortestPath
	*	Under development. Currently clone of depth function with bug in depth calculation
	*/
	shortestPath: function(from,to){
		var checkValidGraph = function(graph){
			for(var i=0;i<graph.nodes.length;i++)
				if(!graph.hasEdgeFrom(graph.nodes[i]) && !graph.hasEdgeTo(graph.nodes[i]))
					return false;
			for(var i=0;i<graph.edges.length;i++)
				for(var j=0;j<graph.edges[i].targets.length;j++)
					if(!graph.edges[i].targets[j][1])
						return false;
					else if(typeof graph.edges[i].targets[j][1] != "number")
						return false;
			return true;
		}

		if(checkValidGraph(this)){
			var paths = new Array();
			/*
			* createPath
			* parameters:
			*		graph: 			the graph
			*		a: 				departing node
			*		b: 				target node
			*/
			var createPath = function(graph,a,b){
				var path = new Array();
				var redundant = function(node){
					try{
						var targets = graph.edges[graph.indexOfEdge(node)].targets;
					}catch(e){
						path.pop();
						return;
					}
					for(var i=0;i<targets.length;i++){
						if(targets[i][0]==b){
							path.push(targets[i]);
							var copy = path.slice();
							paths.push({path:copy,cost:0});
							path = [];
							return;
						}
						else{
							path.push(targets[i]);
							redundant(targets[i][0]);
						}
					}
					path.pop();	
				}
				redundant(a);
			}
			createPath(this,from,to);
			
			// return false if any path was made
			if(paths.length==0)
				return false;
			
			// now calculate the cheapest cost
			var sumCost = function(array){
				var r = 0;
				for(var i=0;i<array.length;i++)
					r+=array[i][1];
				return r;
			}
			
			var arr = new Array();
			
			for(var i=0;i<paths.length;i++){
				var c = sumCost(paths[i].path)
				paths[i].cost = c;
				arr.push(c);
			}
			var index = arr.indexOf(Math.min.apply(Math,arr));
			var finalArr = new Array();
			
			for(var i=0;i<paths[index].path.length;i++)
				finalArr.push(paths[index].path[i][0]);
			
			return {path:finalArr,cost:arr[index]};
		}
		else
			return false;
	}
}
