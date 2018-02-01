export default class Snake {
    constructor(settings) {
        const {length = 5} = settings;

        this.length = length;
        this.createSnakeTamplate();
        this.setInitialState();
    }

    createSnakeTamplate() {
        this.template = document.createElement('div');
        this.template.classList.add('snake');

        Array.from({length: this.length}).forEach(() => {
            const snakePart = document.createElement('div');

            snakePart.classList.add('snake-block');
            this.template.appendChild(snakePart);
        });
    }

    cut() {
        this.template.children[this.template.children.length - 1].remove();
        this.length-=1;
    }

    setInitialState() {
        this.y = 350;
        this.template.style.top = this.y + 'px';
    }

    get len() {
        return this.template.children.length;
    }

    get html() {
        return this.template;
    }

    get coordinates() {
        return {x: this.x, y: this.y};
    }
    
    move({x ,y}) {
        this.x = x;

        this.template.style.left = this.x + 'px';
    }
}