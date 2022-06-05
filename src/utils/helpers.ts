export const formatPrice = (price: string | number, decimals: number) => (Math.round(+price * 100) / 100).toFixed(decimals)