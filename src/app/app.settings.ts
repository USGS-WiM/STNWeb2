import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class APP_SETTINGS {
    private static _environment = 'development';
    // default env is development
    public static get API_ROOT() {
        return environment.api_root;
    }

    /* istanbul ignore next */
    public static set environment(env: string) {
        this._environment = env;
    }
    public static get IS_LOGGEDIN(): boolean {
        return (
            !!localStorage.getItem('username') &&
            !!localStorage.getItem('password')
        );
    }

    public static get AUTH_URL(): string {
        return this.API_ROOT + 'login';
    }

    // STN
    public static get EVENTS(): string {
        return this.API_ROOT + 'Events';
    }
    public static get EVENT_TYPES(): string {
        return this.API_ROOT + 'EventTypes';
    }

    public static get NETWORK_NAMES(): string {
        return this.API_ROOT + 'NetworkNames';
    }
    public static get STATES(): string {
        return this.API_ROOT + 'States';
    }
    public static get SENSOR_TYPES(): string {
        return this.API_ROOT + 'SensorTypes';
    }
    /* istanbul ignore next */
    public static get SITES_URL(): string {
        return this.API_ROOT + 'sites';
    }

    public static get AUTH_JSON_HEADERS() {
        return new HttpHeaders({
            Authorization:
                'Basic ' +
                btoa(localStorage.username + ':' + localStorage.password),
            Accept: 'application/json',
        });
    }

    // default display query (display verison of search query above) for initial load of map page
    // public static get DEFAULT_DISPLAY_QUERY(): FilterQuery {
    //     return {
    //         events: [],
    //     };
    // }

    // default filter query (display verison of search query above) for initial load of map page
    public static get DEFAULT_FILTER_QUERY() {
        return {
            events: [],
        };
    }
}
