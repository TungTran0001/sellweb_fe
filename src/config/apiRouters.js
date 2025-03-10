const baseUrl = "http://localhost:3001/api/v1";

const apiEndpoints = {
    addresses: `${baseUrl}/addresses`,
    provinces: `${baseUrl}/locations/provinces`,
    districts: (provinceId) => `${baseUrl}/locations/districts/${provinceId}`,
    wards: (districtId) => `${baseUrl}/locations/wards/${districtId}`,
    getHomePageBanners: `${baseUrl}/banners/homepage`,
    categories: `${baseUrl}/categories`,
    products: `${baseUrl}/products`,
    getProductDetails: (idQuery) => `${baseUrl}/products/details/${idQuery}`,
    carts: `${baseUrl}/carts`,
};

export default apiEndpoints;