(function() {
	const app = document.getElementById('app');
	const dir = {
		UP: 0,
		RIGHT: 1,
		DOWN: 2,
		LEFT: 3,
	};
	const height = 200;
	const width = 400;
	const grid = Array(height).fill(Array(width).fill(0));
	const ant = {
		x: Math.round(width / 2),
		y: Math.round(height / 2),
		dir: dir.UP,
	};

	
	const createCell = () => {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		return cell;
	};
	const createRow = () => {
		const row = document.createElement('div');
		row.classList.add('row');
		return row;
	}

	grid.forEach((rowNums) => {
		const row = createRow();
		rowNums.forEach(() => {
			const cell = createCell();
			row.appendChild(cell);
		});
		app.appendChild(row);
	});

	const turnLeft = () => {
		if (ant.dir === dir.UP) {
			ant.dir = dir.LEFT;
			return;
		}
		ant.dir -= 1;
	};
	const turnRight = () => {
		if (ant.dir === dir.LEFT) {
			ant.dir = dir.UP;
			return;
		}
		ant.dir += 1;
	};
	const cellAtAnt = () => {
		return app.children.item(ant.y).children.item(ant.x);
	}
	const setAnt = () => {
		const cells = document.getElementsByClassName('ant');
		if (cells.length > 0) {
			document.getElementsByClassName('ant')[0].classList.remove('ant');
		}
		cellAtAnt().classList.add('ant');
	};
	const updateGrid = () => {
		cellAtAnt().classList.toggle('stepped');	
	};

	const timer = setInterval(() => {
		if (cellAtAnt().classList.contains('stepped')) {
			turnLeft();
		} else {
			turnRight();
		}
		switch (ant.dir) {
			case dir.UP:
				if (ant.y === 0) {
					ant.y = height - 1;
					break;
				}
				ant.y -= 1;
				break;
			case dir.RIGHT:
				if (ant.x === width - 1) {
					ant.x = 0;
					break;
				}
				ant.x += 1;
				break;
			case dir.DOWN:
				if (ant.y === height - 1) {
					ant.y = 0;
					break;
				}
				ant.y += 1;
				break;
			case dir.LEFT:
				if (ant.x === 0) {
					ant.x = width - 1;
					break;
				}
				ant.x -= 1;
				break;
			default:
				throw new Error(`Invalid direction: ${ant.dir}`);
		}
		setAnt();
		updateGrid();
	}, 50);
}());
