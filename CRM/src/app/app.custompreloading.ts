import { Observable } from 'rxjs/Observable';
import { PreloadingStrategy, Route } from '@angular/router';

export class CustomPreloading implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        if (route.data) { return load();} 
        else { return Observable.of(null);}
    }
}