const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

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
		x: -785,
		y: -650,
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

//animation loop - infintie recursion, repaints window at the display refresh rate
function animate() {
	window.requestAnimationFrame(animate);
	background.draw();
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
	if (keys.s.pressed && lastKey === 's') background.position.y -= 3;
	else if (keys.w.pressed && lastKey === 'w') background.position.y += 3;
	else if (keys.a.pressed && lastKey === 'a') background.position.x += 3;
	else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3;
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
