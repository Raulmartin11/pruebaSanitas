import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loremIpsum } from "lorem-ipsum";
import { Observable } from "rxjs";
import { PhotoData } from "src/app/models/photo.model";

@Injectable({
    providedIn: 'root'
  })
export class DataService {
    private url = 'https://picsum.photos/id'
    private currentID = 1
    constructor(private http: HttpClient) {}

    getData(): Observable<PhotoData[]> {
        return this.http.get<PhotoData[]>('./assets/photoData.json');
    }


    private generateUniqueId() {
        return this.currentID++;
    }

    private generateRandomPhotoUrl(id: number) {
        return `${this.url}/${id}/500/500.jpg`;
    }

    generateRandomObject(): any {
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