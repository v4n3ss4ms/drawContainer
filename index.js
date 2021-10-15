const MAIN_SQUARE_ID = 'mainSquare';
const CONTAINER_CLASS = 'container';
const ITEM_CLASS = 'item';
const ALERT_CLASS = 'alert';
const DIV_ELEMENT = 'div';

const alertNumberOfRenderedChildrenIfNeeded = (numberOfChildren, maxChildren) => {
    if (numberOfChildren > maxChildren) {
        const alertDiv = document.createElement(DIV_ELEMENT);
        alertDiv.className = ALERT_CLASS;
        alertDiv.innerHTML = `You only have space for ${maxChildren} children. You cannot allocate ${numberOfChildren} children.`;
        document.body.appendChild(alertDiv);
    }
};

const getRandomColor = () => {
    let hex = Math.floor(Math.random()*16777215).toString(16);
    return `#${hex.padStart(6, '0')}`;
};

const newItem = (size) => {
    const initialRandomColor = getRandomColor();
    const childDiv = document.createElement(DIV_ELEMENT);
    childDiv.className = ITEM_CLASS;
    childDiv.setAttribute(`style`,`background-color:${initialRandomColor}; width:${size}px; height:${size}px;`);
    return childDiv;
};

const getContainer = (size) => {
    const container = document.getElementById(MAIN_SQUARE_ID);
    container.className = CONTAINER_CLASS;
    container.setAttribute(`style`,`width:${size}px; height:${size}px;`);
    return container;
};

const addItemListener = () => {
    document.querySelectorAll(`.${ITEM_CLASS}`).forEach(item => {
        item.addEventListener('mouseover', () => {
            const currentBackgroundColor = item.style.backgroundColor;
            item.style.backgroundColor = getRandomColor();
            let timer = setTimeout(removeMe, 2000, item);
            item.onmouseout = () => {
                item.style.backgroundColor = currentBackgroundColor;
                clearTimeout(timer);
            };
        })
    })
};

const removeMe = (item) => item.remove();

const fillContainer = (containerSize, childSize, maxChildren) => {
    const container = getContainer(containerSize);
    for (let i = 0; i < maxChildren; i++) {
        const childDiv = newItem(childSize);
        container.appendChild(childDiv);
    };
    addItemListener();
};

const drawContainer = (containerSize, childSize, numberOfChildren) => {
    const maxChildren = Math.pow(Math.trunc(containerSize / childSize), 2);
    fillContainer(containerSize, childSize, maxChildren);
    alertNumberOfRenderedChildrenIfNeeded(numberOfChildren, maxChildren);
};


drawContainer(200, 50, 17);
//drawContainer(310, 200, 4);
//drawContainer(413, 42, 30);
//drawContainer(200, 300, 2);

