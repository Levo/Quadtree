function drawObjects(root){
	if(!root){
		return;
	}else{
		for (var i = 0; i < root.objects.length; i++) {
			root.objects[i].move();
			root.objects[i].drawRect();
		};
	}

	drawObjects(root.nodes[0])
	drawObjects(root.nodes[1])
	drawObjects(root.nodes[2])
	drawObjects(root.nodes[3])

}

function drawBounds(root){

	

	if(root.nodes[0] == null){
		return;
	}else{
		root.nodes[0].bounds.drawBounds();
		root.nodes[1].bounds.drawBounds();
		root.nodes[2].bounds.drawBounds();
		root.nodes[3].bounds.drawBounds();
	}

	drawBounds(root.nodes[0])
	drawBounds(root.nodes[1])
	drawBounds(root.nodes[2])
	drawBounds(root.nodes[3])


}



