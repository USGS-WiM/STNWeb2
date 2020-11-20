import { APP_SETTINGS } from '../app.settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

import { Site } from '@interfaces/site';

@Injectable({
    providedIn: 'root',
})
export class SitesService {
    constructor(private httpClient: HttpClient) {}

    private eventSitesSubject: Subject<any>;

    public get eventSites(): Observable<any> {
        return this.eventSitesSubject.asObservable();
    }

    public getEventSites(eventID: number): Observable<Site[]> {
        return this.httpClient
            .get(APP_SETTINGS.EVENTS + '/' + eventID + '/Sites.json')
            .pipe(
                tap((response) => {
                    console.log('Sites response: ' + response);
                    return response;
                }),
                catchError(this.handleError<any>('getEventSites', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // Consider creating a message service for this (https://angular.io/tutorial/toh-pt4)
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return EMPTY;
        };
    }

    //This version returns a subscription, we seem to be using a different pattern elsewhere in the app.
    /* public getEventSites(eventID: string) {
        const url = APP_SETTINGS.EVENTS + '/' + eventID + '/Sites.json';
        const headers = APP_SETTINGS.AUTH_JSON_HEADERS;
        return this.http
            .get<any>(url, { headers })
            .subscribe(
                (res: any) => {
                    console.log('getting sites for: ' + eventID);
                    this.eventSitesSubject.next(res);
                },
                (err) => {
                    console.log(`http error getting {{eventID}}`);
                },
                () => {
                    console.log('getEvents successful for event: ' + eventID);
                }
            );
    } */
}
