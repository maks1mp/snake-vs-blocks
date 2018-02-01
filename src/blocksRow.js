export default class BlocksRow {
    constructor(blocksDeep) {
        this.blocksDeep = blocksDeep;
        this.quantity = blocksDeep.length;

        this.row = this.createHtmlRow();
    }

    get html() {
        return this.row;
    }

    get coordinates() {
        return {
            x: parseFloat(this.html.style.left || 500),
            y: parseFloat(this.html.style.top || 500) + 20 ,
        }
    }

    getItemDeep(x) {
        const currentPart = this.getPartsCoordinates(x);

        return parseFloat(this.row.children[currentPart].innerHTML);
    }

    cut(x) {
        const currentPart = this.getPartsCoordinates(x),
            currentValue = parseFloat(this.row.children[currentPart].innerHTML),
            newValue = currentValue - 1;

        this.row.children[currentPart].innerHTML =  currentValue - 1;

        if (newValue === 0) {
            this.row.children[currentPart].style.opacity = 0;
        }
    }

    getPartsCoordinates(x) {
        const coordinates = [];

        [].forEach.call(this.row.children, (itemHTML,index) => {
            const itemWidth = parseFloat(getComputedStyle(itemHTML).width);

            coordinates.push(index === 0 ? itemWidth : Math.round(itemWidth * index) + itemWidth)
        });

        return coordinates.findIndex(i => i >= x);
    }

    createHtmlRow() {
        const htmlRow = document.createElement('div');

        htmlRow.classList.add('blocks-row');
        this.blocksDeep
            .map(this.createBlock, this)
            .forEach(htmlBlock => htmlRow.appendChild(htmlBlock));

        return htmlRow;
    }

    createBlock(item) {
        const blockItem = document.createElement('div');

        blockItem.classList.add('blocks-row-item');

        blockItem.innerHTML = item;

        return blockItem;
    }
}