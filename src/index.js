import Field from './field';
import Snake from './snake';
import BlocksRow from './blocksRow';
import './style/main.sass';

const rootHTML = document.getElementById('app');
const field = new Field(rootHTML, {
    width: '500px',
    height: '500px'
});
const snake = new Snake({
    length: 20
});

field.init(snake);


// setInterval(() => {
    field.push(new BlocksRow([1,2,3,4,5]));
// }, 1000);


