export type PersonMatch = {
  id: number;
  name: string;
};

export type PersonDetails = {
  favorite_color: 'red' | 'blue' | 'green';
  id: number;
  name: string;
  quotes: Record<string, string[]>;
};
