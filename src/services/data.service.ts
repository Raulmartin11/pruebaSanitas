import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loremIpsum } from "lorem-ipsum";
import { Observable, concatMap, map, mergeMap, of, range, take, tap, toArray } from "rxjs";
import { PhotoData } from "src/models/photo.model";

@Injectable()
export class DataService {
    private url = 'https://picsum.photos/id'
    private currentData = 20;
    private currentID = 1
    private jsonData: PhotoData[] = [];
    constructor(private http: HttpClient) {}

    getData() {
        this.http.get<PhotoData[]>('./assets/photoData.json').pipe(
            map(data => {
                console.log('Datos obtenidos:', data);
            }) 
        );
        
    }


    private generateUniqueId() {
        return this.currentID++;
    }

    private generateRandomPhotoUrl(id: number) {
        return `${this.url}/${id}/500/500.jpg`;
    }

    private generateRandomObject(): any {
        const id = this.generateUniqueId();
        const photo = this.generateRandomPhotoUrl(id);
        const text = loremIpsum({ count: 1, units: 'paragraphs' });

        const obj: PhotoData = {
            id: id,
            photo: photo,
            text: text
        };

        return obj;
    }

    generateRandomArray(): any {
        const jsonArray: PhotoData[] = [];

        for (let i = 0; i < 4000; i++) {
        const obj: PhotoData = this.generateRandomObject();
        jsonArray.push(obj);
        }

        return JSON.stringify(jsonArray);
    }
      
}