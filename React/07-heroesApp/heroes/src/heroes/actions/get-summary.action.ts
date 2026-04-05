import { heroApi } from "../api/hero.api";
import type { SummaryInformationResponse } from "../types/summart-information.response";

export const getSummaryAction = async () => {
  const { data } = await heroApi.get<SummaryInformationResponse>("/summary");
  return data;
};
