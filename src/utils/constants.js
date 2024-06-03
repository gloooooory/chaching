export const BASE_URL = "http://192.168.101.78:3000";

export const getApiUrl = endpoint => BASE_URL + endpoint;

export const PROMO_CODE = getApiUrl("/api/verify-code");
