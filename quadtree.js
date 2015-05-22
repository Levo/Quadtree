function Quadtree(pLevel, pBounds){
	this.MAX_OBJECTS = 10;
	this.MAX_LEVELS = 4;

	this.level = pLevel || 0;
	this.objects = [];
	this.bounds = pBounds || new rectangle();
	this.nodes = [];

}

Quadtree.prototype.clear = function(){
	this.objects = [];

	for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].clear();
	};

	this.nodes = [];

}

Quadtree.prototype.split = function(){

	var subWidth = this.bounds.getWidth()/2;
	var subHeight = this.bounds.getHeight()/2;

	var x = this.bounds.getX();
	var y = this.bounds.getY();

 	this.nodes[0] = new Quadtree(this.level+1, new rectangle(x + subWidth, y, subWidth, subHeight));
   	this.nodes[1] = new Quadtree(this.level+1, new rectangle(x, y, subWidth, subHeight));
   	this.nodes[2] = new Quadtree(this.level+1, new rectangle(x, y + subHeight, subWidth, subHeight));
   	this.nodes[3] = new Quadtree(this.level+1, new rectangle(x + subWidth, y + subHeight, subWidth, subHeight));

}

Quadtree.prototype.getIndex = function(pRect){
   var index = -1;
   var verticalMidpoint = this.bounds.getX() + (this.bounds.getWidth() / 2);
   var horizontalMidpoint = this.bounds.getY() + (this.bounds.getHeight() / 2);
 
   var topQuadrant = (pRect.getY() < horizontalMidpoint && pRect.getY() + pRect.getHeight() < horizontalMidpoint);
   var bottomQuadrant = (pRect.getY() > horizontalMidpoint);
 
   if (pRect.getX() < verticalMidpoint && pRect.getX() + pRect.getWidth() < verticalMidpoint) {
      if (topQuadrant) {
        index = 1;
      }
      else if (bottomQuadrant) {
        index = 2;
      }
    }
    else if (pRect.getX() > verticalMidpoint) {
     if (topQuadrant) {
       index = 0;
     }
     else if (bottomQuadrant) {
       index = 3;
     }
   }
 
   return index;

}

Quadtree.prototype.insert = function(pRect){
	var index = 0;
	if (this.nodes[0] != null) {
		index = this.getIndex(pRect);

		if (index != -1) {
			this.nodes[index].insert(pRect);
			return;
		}
	}

	this.objects.push(pRect);

	if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
		if (this.nodes[0] == null) { 
			this.split(); 
		}

		var i = 0;
		while (i < this.objects.length) {
			index = this.getIndex(this.objects[i]);
			if (index != -1) {
				this.nodes[index].insert(this.objects.splice(i, 1)[0]);
			}
			else {
				i++;
			}
		}

	}
}

Quadtree.prototype.retrieve = function(returnObjects, pRect){

	var index = this.getIndex(pRect);
	if(index != -1 && this.nodes[0] != null){
		this.nodes[index].retrieve(returnObjects, pRect);
	}

	returnObjects.push(this.objects);

	return returnObjects;

}

