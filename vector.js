function vector(x,y){
	this.x = x || 0;
	this.y = y || 0;
}


vector.prototype.add = function(vector){
	this.x += vector.x;
	this.y += vector.y;
};

vector.prototype.getMagnitude = function(){
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

vector.prototype.getAngle = function(){
	return Math.atan2(this.y,this.x);
};

vector.fromAngle = function (angle, magnitude) {
  return new vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};
 