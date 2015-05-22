function rectangle(x,y,width,height){
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.drawColor = "blue";
	this.position = new vector(x,y);
	this.randX =  Math.floor((Math.random() * 3) + 1);
	this.randY =  Math.floor((Math.random() * 3) + 1);
	this.velocity = new vector(this.randX,this.randY);
	this.acceleration = new vector(0,0);
	this.spread = 90;	
}

rectangle.prototype.getX = function(){
	return this.x;
}

rectangle.prototype.getY = function(){
	return this.y;
}

rectangle.prototype.getWidth = function(){
	return this.width;
}

rectangle.prototype.getHeight = function(){
	return this.height;
}

rectangle.prototype.drawBounds = function(){
	context.beginPath();
	context.moveTo(this.x,this.y);
	context.lineTo(this.x + this.width, this.y);
	context.lineTo(this.x + this.width, this.y + this.height);
	context.lineTo(this.x, this.y + this.height);
	context.stroke();
	context.strokeStyle = "black";
}

rectangle.prototype.drawRect = function(){
	context.fillStyle = this.drawColor;
	context.fillRect(this.x, this.y, this.width, this.height);
}


rectangle.prototype.move = function(){
	if( this.x<0 || this.x>600) this.velocity.x =-this.velocity.x; 
	if( this.y<0 || this.y>600) this.velocity.y =-this.velocity.y; 
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.x = this.position.x;
	this.y = this.position.y;
}
