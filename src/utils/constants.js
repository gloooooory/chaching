export const BASE_URL = "http://3.93.186.5:8000";

export const getApiUrl = endpoint => BASE_URL + endpoint;

export const PROMO_CODE = getApiUrl("/api/verify-code/");
