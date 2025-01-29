export interface User {
  id: number;
  name: string;
  favorite_color: string;
  quotes: {
    [key: number]: string[];
  };
}

export interface UserPreview {
  id: number;
  name: string;
}
