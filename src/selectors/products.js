const productSelector = (products, { sizesFilter = [], varietiesFilter = [] }) => {
    if (sizesFilter.length === 0 && varietiesFilter.length === 0) return products;
    return products.filter(({ node: product }) => {
        const { priceBySize, variety } = product.frontmatter;
        if (priceBySize.length > 0 && variety) {
            const sizeMatch = sizesFilter.length > 0 ?
                                priceBySize.some(({ size }) => sizesFilter.includes(size.label)) :
                                true;
            const varietyMatch = varietiesFilter.length > 0 ?
                                    varietiesFilter.includes(variety) :
                                    true;
            
            return sizeMatch && varietyMatch;
        } else {
            return false;
        }
    })
}

export { productSelector as default };