import { PROMO_CODE } from "../../utils/constants";
import { apiGet, apiPost } from "../../utils/utils";

export const getAdvertise = code => {
  const data = {
    verificationCode: code,
  };
  return apiPost(PROMO_CODE, data);
};
