export default class Field {
    constructor(rootHTML, settings) {
        this.rootHTML = rootHTML;
        this.initialSettings = settings;
        this.fieldHTML = this.createField();
        this.snakeOnField = null;
    }

    get fieldSize() {
        const {width = 500, height = 500} = this.initialSettings;

        return {
            width: parseFloat(width),
            height: parseFloat(height)
        }
    }

    createField() {
        const fieldHTML = document.createElement('div'),
            {width, height} = this.fieldSize;

        fieldHTML.style.width = width + 'px';
        fieldHTML.style.height = height + 'px';
        fieldHTML.style.border = '1px solid red';
        fieldHTML.style.position = 'relative';

        return fieldHTML;
    }

    init(snake) {
        this.snakeOnField = snake;

        this.fieldHTML.appendChild(this.snakeOnField.html);

        this.fieldHTML.addEventListener('mousemove', event => {
            const {layerX, layerY} = event;

            this.snakeOnField.move({x: layerX, y: layerY});
        });

        this.rootHTML.appendChild(this.fieldHTML);
    }


    push(item) {
        this.fieldHTML.appendChild(item.html);

        this.startSlideDown({
            item,
            speed: 50
        });

    }

    startSlideDown({item, speed, initialTop, ignoreBlock = false, stopCount}) {
        const {style} = item.html;
        let top = initialTop || 0;

        style.top = top;

        if (!ignoreBlock) {
            const timer = setInterval(() => {
                if (this.snakeOnField.coordinates.y > 300 && this.snakeOnField.coordinates.y <= item.coordinates.y) {

                    clearInterval(timer);
                    setTimeout(() => {
                        const blockDeep = item.getItemDeep(this.snakeOnField.coordinates.x),
                            snakeLength = this.snakeOnField.len;

                        if (snakeLength > blockDeep && blockDeep > 0) {
                            this.snakeOnField.cut();
                            item.cut(this.snakeOnField.coordinates.x);
                            this.startSlideDown({item, speed, initialTop: top, stopCount: true});
                        } else {
                            this.startSlideDown({item, speed, initialTop: top, stopCount: false, ignoreBlock: true});
                        }
                    }, 100);
                }

                if (!stopCount) {
                    top += 3;
                    style.top = top + 'px';
                }
            }, speed)
        } else {
            const deleteTimer = setInterval(() => {
                if (item.coordinates.y <= 500) {
                    top += 3;
                    style.top = top + 'px';
                } else {
                    item.html.remove();
                    clearInterval(deleteTimer);
                }
            }, speed);
        }
    }
}