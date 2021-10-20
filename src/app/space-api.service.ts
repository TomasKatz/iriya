import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {SpaceCoordinates} from './app.component';
import {retry, share, switchMap, takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpaceApiService {
  private getStationPosition$: Observable<SpaceCoordinates[]>;
  constructor(private http: HttpClient) {}
  getStationPositionPoll(): Observable<SpaceCoordinates>{
    return timer(1, 3000).pipe(
      switchMap(() => this.http.get<SpaceCoordinates>('http://api.open-notify.org/iss-now.json')),
      retry(),
      share()
    );
  }
}
