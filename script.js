document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.flowers-container');
    const itemTypes = [
        { src: 'flores.png', class: 'flower-item', minSize: 40, maxSize: 80, weight: 0.8 }, 
        { src: 'flor-2.png', class: 'butterfly-item', minSize: 40, maxSize: 100, weight: 0.8 } 
    ];

    function createFallingItem() {
        let selectedItem;
        let totalWeight = itemTypes.reduce((sum, item) => sum + item.weight, 0);
        let randomNum = Math.random() * totalWeight;
        for (let i = 0; i < itemTypes.length; i++) {
            randomNum -= itemTypes[i].weight;
            if (randomNum <= 0) {
                selectedItem = itemTypes[i];
                break;
            }
        }
        if (!selectedItem) selectedItem = itemTypes[0];

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('falling-item');
        itemWrapper.classList.add(selectedItem.class);

        const itemImage = document.createElement('img');
        itemImage.src = selectedItem.src;
        itemWrapper.appendChild(itemImage);

        const viewportWidth = window.innerWidth;
        const startXMin = 0; 
        const startXMax = viewportWidth; 
        itemWrapper.style.left = Math.random() * (startXMax - startXMin) + startXMin + 'px';

        const size = Math.random() * (selectedItem.maxSize - selectedItem.minSize) + selectedItem.minSize;
        itemWrapper.style.width = size + 'px';
        itemWrapper.style.height = size + 'px';

        const animationDuration = Math.random() * 8 + 6;
        itemWrapper.style.animationDuration = `${animationDuration}s`;

        const endXOffset = Math.random() * 100 - 50;
        itemWrapper.style.setProperty('--end-x-offset', `${endXOffset}px`);

        container.appendChild(itemWrapper);

        setTimeout(() => {
            itemWrapper.remove();
        }, animationDuration * 1000);
    }

    setInterval(createFallingItem, 200);
});
