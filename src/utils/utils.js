/**
 * Transforms MELI's thumbnail low-res image URL to original full-res image URL
 * @param {string} url - MELI's thumbnail product property from fetch response
 */
export const transformImageUrl = (url) => {
    const hyphenIndex = url.lastIndexOf("-");
    const dotIndex = url.lastIndexOf(".");

    return url.substring(0, hyphenIndex + 1) + "O" + url.substring(dotIndex, url.length);
};

export const dataJSON = (apiData) => {
    return apiData.json();
};

export const numberWithDots = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const formatCurrency = (currencyId) => {
    currencyId === "USD" ? currencyId = "U$S" : currencyId = "$";
    return currencyId
}

export const colorToHEX = (colorName) => {
    switch (colorName) {
        case 'Blanco': return `#FFFFFF`;
        case 'Negro': return `#000000`;
        case 'Plateado': return `#C0C0C0`;
        case 'Gris': return `#808080`;
        case 'Rojo': return `#FF0000`;
        case 'Azul': return `#0000FF`;
        case 'Verde': return `#008000`;
        case 'Amarillo': return `#FFFF00`;
        case 'Celeste': return `#00FFFF	`;
        case 'Dorado': return `#FFD700`;
        case 'Marrón': return `#804000`;
        case 'Naranja': return `#FF8000`;
        case 'Rosa': return `#FF00FF`;
        case 'Violeta': return `#800080	`;
    }
    return `N/D`
}





