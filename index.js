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

//animation loop - infintie recursion, repaints window at the display refresh rate
function animate() {
	window.requestAnimationFrame(animate);
	console.log('animate');

	c.drawImage(image, -785, -650);
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
}
animate();

window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'w':
			console.log('w');
			break;
		case 'a':
			console.log('a');
			break;
		case 's':
			console.log('s');
			break;
		case 'd':
			console.log('d');
			break;
	}
});
