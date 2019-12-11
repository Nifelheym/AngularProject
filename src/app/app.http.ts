import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

    constructor(private http:HttpClient) {}

    getInfo(url) {
        return this.http.get(url)
    }
}