export function convertPriceTextToNumber(priceText) {

    return Number(
        parseFloat(priceText.replace('$', '')).toFixed(2)
    );
}

export function calculateTotalPrice(prices) {

    return Number(
        prices.reduce((total, price) => total + price, 0).toFixed(2)
    );
}

export function calculateFinalPrice(itemTotal, tax) {

    return Number(
        (itemTotal + tax).toFixed(2)
    );
}