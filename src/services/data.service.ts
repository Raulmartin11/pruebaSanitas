import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, range, toArray } from "rxjs";

@Injectable()
export class DataService {
    private url = 'https://i.picsum.photos/id'
    private currentData = 20;
    constructor(private http: HttpClient) {}

    getData() {
        const _range = range(1, 4000).pipe(
            concatMap(number => this.http.get(`${this.url}/${number}/500/500.jpg`)),
            toArray()
          );

        _range.subscribe((response) => {
            console.log(response);
            return response
        });
        
    }
}