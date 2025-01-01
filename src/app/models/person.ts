export interface Person {
    id: number;
    name: string;
    favorite_color: string;
    quotes: Map<number, string[]>
}