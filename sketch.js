let grid;
let rows;
let cols;
let resolution = 20;
let start = true;

function CreateGrid(){
	let arr = new Array(rows);
	for(let i = 0; i<rows; i++){
		arr[i] = new Array(cols);
		for(let j = 0; j<cols; j++){
			arr[i][j] = max(0,floor(random(-.5,2)));
		}
	}
	return arr;
}

function show(){
	for(let i = 0; i<rows; i++){
		for(let j = 0; j<cols; j++){
			if(grid[i][j] == 0) continue;

			fill(255);
			strokeWeight(1);
			rect(i*resolution, j*resolution, resolution-1, resolution-1);
		}
	}
}

function update(){
	let next = CreateGrid();
	for(let i = 0; i < rows; i++){
		for(let j = 0; j<cols; j++){
			let cont = count(i,j);
			if(grid[i][j] == 0 && cont == 3){
				next[i][j] = 1;
			}
			else if(grid[i][j] == 1){
				if(cont < 2 || cont > 3)
					next[i][j] = 0;
				else next[i][j] = 1;
			}
			else{
				next[i][j] = 0;
			}
		}
	}
	return next;
}

function count(x, y){
	let cont = 0;
	for(let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++){
			let newx = (x+i+rows)%rows;
			let newy = (y+j+cols)%cols;
			cont += grid[newx][newy];
		}
	}
	return cont - grid[x][y];
}

function setup() 
{
	createCanvas(900, 700);
	rows = width/resolution;
	cols = height/resolution;
	grid = CreateGrid();
	//frameRate(20);
}

function mouseClicked(){
	let x = floor(mouseX/resolution);
	let y = floor(mouseY/resolution);
	grid[x][y] = !grid[x][y];
}

function draw()
{
	background(0);
	show();
	if(start)
		grid = update();
}
