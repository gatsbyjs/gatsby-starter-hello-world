export const minPrice = (priceBySize) => {
    return Math.min(...priceBySize.map(({ price }) => parseFloat(price)));
}