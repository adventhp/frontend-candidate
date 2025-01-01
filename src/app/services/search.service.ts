import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "../models/person";
import { catchError, Observable } from "rxjs";


interface SearchResult {
    matches: Person[]
}

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private searchEndpoint: string = 'http://localhost:5000';
    public results: Observable<Person>;

    constructor(private client: HttpClient) { }

    public search(term?: string, color?: string): Observable<SearchResult> {
        let query = '';
        query += !!term ? 'term=' + term : '';
        query += !!color && !!term ? '&' : '';
        query += !!color ? 'color=' + color : '';
            
        return this.client.get<SearchResult>(`${this.searchEndpoint}/search?${query}`);
    }

    public getDetails(id: number | string): Observable<Person> {
        return this.client.get<Person>(`${this.searchEndpoint}/details/${id}`);
    }

}