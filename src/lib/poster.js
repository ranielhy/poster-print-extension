const DEFAULT_PAGE_WIDTH = 1240;
const DEFAULT_PAGE_HEIGHT = 1754;
const PAGE_INSET = 56;

function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
}

export function getPosterPageSize(imageWidth, imageHeight, columns, rows) {
    const safeColumns = clamp(Number(columns) || 1, 1, 12);
    const safeRows = clamp(Number(rows) || 1, 1, 12);
    const posterAspect = (imageWidth / safeColumns) / (imageHeight / safeRows);

    if (posterAspect >= 1) {
        return { width: DEFAULT_PAGE_HEIGHT, height: DEFAULT_PAGE_WIDTH };
    }

    return { width: DEFAULT_PAGE_WIDTH, height: DEFAULT_PAGE_HEIGHT };
}

export function getPosterTiles(imageWidth, imageHeight, columns, rows) {
    const safeColumns = clamp(Number(columns) || 1, 1, 12);
    const safeRows = clamp(Number(rows) || 1, 1, 12);
    const tiles = [];

    for (let row = 0; row < safeRows; row += 1) {
        for (let column = 0; column < safeColumns; column += 1) {
            const left = Math.round((column / safeColumns) * imageWidth);
            const top = Math.round((row / safeRows) * imageHeight);
            const right = Math.round(((column + 1) / safeColumns) * imageWidth);
            const bottom = Math.round(((row + 1) / safeRows) * imageHeight);

            tiles.push({
                index: row * safeColumns + column + 1,
                row,
                column,
                x: left,
                y: top,
                width: Math.max(1, right - left),
                height: Math.max(1, bottom - top)
            });
        }
    }

    return tiles;
}

export function loadImage(source) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Não foi possível carregar a imagem selecionada."));
        image.src = source;
    });
}

function getContainRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
    const sourceAspect = sourceWidth / sourceHeight;
    const targetAspect = targetWidth / targetHeight;

    if (sourceAspect > targetAspect) {
        const width = targetWidth;
        const height = targetWidth / sourceAspect;

        return {
            width,
            height,
            x: (targetWidth - width) / 2,
            y: (targetHeight - height) / 2
        };
    }

    const height = targetHeight;
    const width = targetHeight * sourceAspect;

    return {
        width,
        height,
        x: (targetWidth - width) / 2,
        y: (targetHeight - height) / 2
    };
}

function renderTile(image, tile, pageWidth, pageHeight) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = pageWidth;
    canvas.height = pageHeight;

    if (!context) {
        throw new Error("Canvas indisponível para gerar a pré-visualização.");
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, pageWidth, pageHeight);

    const inset = PAGE_INSET;
    const availableWidth = pageWidth - inset * 2;
    const availableHeight = pageHeight - inset * 2;
    const drawRect = getContainRect(tile.width, tile.height, availableWidth, availableHeight);

    context.drawImage(
        image,
        tile.x,
        tile.y,
        tile.width,
        tile.height,
        inset + drawRect.x,
        inset + drawRect.y,
        drawRect.width,
        drawRect.height
    );

    context.strokeStyle = "rgba(15, 23, 42, 0.14)";
    context.lineWidth = 4;
    context.strokeRect(2, 2, pageWidth - 4, pageHeight - 4);

    context.fillStyle = "rgba(15, 23, 42, 0.82)";
    context.beginPath();
    context.roundRect(24, 24, 128, 44, 22);
    context.fill();

    context.fillStyle = "#ffffff";
    context.font = "600 24px 'Trebuchet MS', sans-serif";
    context.textBaseline = "middle";
    context.fillText(`P${tile.index}`, 52, 46);

    return canvas.toDataURL("image/png");
}

export async function buildPosterPages(source, columns, rows) {
    const image = await loadImage(source);
    const pageSize = getPosterPageSize(image.naturalWidth, image.naturalHeight, columns, rows);
    const tiles = getPosterTiles(image.naturalWidth, image.naturalHeight, columns, rows);

    return {
        imageWidth: image.naturalWidth,
        imageHeight: image.naturalHeight,
        pageWidth: pageSize.width,
        pageHeight: pageSize.height,
        tiles: tiles.map((tile) => ({
            ...tile,
            dataUrl: renderTile(image, tile, pageSize.width, pageSize.height)
        }))
    };
}

export function formatDimensions(width, height) {
    return `${width} × ${height}px`;
}