import axiosInstance from "../middleware/axios-interceptor";
import { ICodeTable } from "../models/ICodeTable";

/**
 * Make a call to retrieve a list of CodeTable
 * @param codeCategory - Category of CodeTable to be retrieved
 * @returns 
 */
export const retrieveCodeTable = async (codeCategory: string): Promise<ICodeTable[]> => {
  try {
    const response = await axiosInstance.get("/api/ct/" + codeCategory);
    return response['data']['data'] as ICodeTable[];
  } catch (err: any) {
    throw new Error(`Unexpected error: ${err}`);
  }
}