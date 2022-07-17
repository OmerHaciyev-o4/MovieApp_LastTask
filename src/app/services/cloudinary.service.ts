import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class CloudinaryService {
    constructor(private httpClient: HttpClient) { }
    
    uploadImage(formData: FormData): Observable<any>{
        let data = formData;

        return this.httpClient.post(
            'https://api.cloudinary.com/v1_1/social-network-web/image/upload',
            data
        )
        .pipe(
            tap(data => {}),
            catchError(this.handleError)
        );
    }



    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }
}