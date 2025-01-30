import { UserPreview } from "../models/user.model";

export interface UserSearchParams {
  term?: string;
  color?: string;
}

export interface UserSearchResponse {
  matches: UserPreview[];
}