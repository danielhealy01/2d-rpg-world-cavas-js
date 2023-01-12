const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// posiitons map / collision map
const offset = {
	x: -785,
	y: -650,
};

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
	collisionsMap.push(collisions.slice(i, 70 + i));
}

console.log(collisionsMap);

class Boundary {
	static width = 48;
	static height = 48;
	// red squares from collision map are x4 from tiled's 12px
	constructor({ position }) {
		this.position = position;
		this.width = 48;
		this.height = 48;
	}
	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 1025) {
			// 1025 is the json tiled value from collisions for a red collision tile.
			boundaries.push(
				new Boundary({
					position: {
						x: j * Boundary.width + offset.x,
						y: i * Boundary.height + offset.y,
					},
				})
			);
		}
	});
});

console.log(boundaries);

//test boundary to experiment with collision
const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400,
  }
})

const image = new Image();
// generates <img />
image.src = './assets/Pellet Town.png';

const playerImage = new Image();
playerImage.src = './assets/playerDown.png';

class Sprite {
	constructor({ position, velocity, image }) {
		// pass in params as obj so order of params don't matter
		this.position = position;
		this.image = image;
	}
	draw() {
		c.drawImage(this.image, this.position.x, this.position.y);
	}
}

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: image,
});

const keys = {
	w: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
	d: {
		pressed: false,
	},
};

//movable array +3 to everything that needs to appear locked when char moves
const movables = [background, testBoundary]


//animation loop - infintie recursion, repaints window at the display refresh rate
function animate() {
	window.requestAnimationFrame(animate);
	background.draw();
	// boundaries.forEach((boundary) => {
	// 	boundary.draw();
	// });
  testBoundary.draw()
	console.log('animate');
	c.drawImage(
		//src
		//crop x start
		//crop y start
		//crop x finish
		//crop y finish
		//position on canvas x
		//position of canvas y
		//render width
		//render height

		//cropping
		playerImage,
		0,
		0,
		playerImage.width / 4,
		playerImage.height,
		//location
		canvas.width / 2 - playerImage.width / 1.35 / 2,
		canvas.height / 2 - playerImage.height / 0.8,
		playerImage.width / 4,
		playerImage.height
	);
  if (keys.s.pressed && lastKey === 's') {
    background.position.y -= 3
    testBoundary.position.y -= 3;
  };
	if (keys.w.pressed && lastKey === 'w') {
    background.position.y += 3
    testBoundary.position.y += 3;
  };
	if (keys.a.pressed && lastKey === 'a') {
    background.position.x += 3
    testBoundary.position.x += 3;
  };
	if (keys.d.pressed && lastKey === 'd') {
    background.position.x -= 3
    testBoundary.position.x -= 3;
  };
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = true;
			console.log(keys);
			lastKey = 'w';
			break;
		case 'a':
			keys.a.pressed = true;
			lastKey = 'a';
			break;
		case 's':
			keys.s.pressed = true;
			lastKey = 's';
			break;
		case 'd':
			keys.d.pressed = true;
			lastKey = 'd';
			break;
	}
});

window.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'w':
			keys.w.pressed = false;
			console.log(keys);
			break;
		case 'a':
			keys.a.pressed = false;
			break;
		case 's':
			keys.s.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
	}
});
