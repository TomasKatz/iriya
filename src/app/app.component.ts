import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {retry, share, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {SpaceApiService} from './space-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CoordinatesNote, CoordinatesNoteComponent} from './shared-components/coordinates-note/coordinates-note.component';

export interface SpaceCoordinates {
  message: string;
  timestamp: number;
  iss_position: {
    latitude: string,
    longitude: string
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit{
  private getStationPosition$: Observable<SpaceCoordinates>;
  private stopPolling = new Subject();
  currentSpaceCoordinates: SpaceCoordinates;
  notes: CoordinatesNote[] = [];
  constructor(
    private spaceService: SpaceApiService,
    private modalService: NgbModal
  ) {
    this.getStationPosition$ = this.spaceService
                                .getStationPositionPoll()
                                .pipe(takeUntil(this.stopPolling));
  }
  getAllCurrencies(): Observable<SpaceCoordinates> {
    return this.getStationPosition$;
  }
  ngOnInit(): void {
    this.getStationPosition$.subscribe((res: SpaceCoordinates) => {
      this.currentSpaceCoordinates = res;
    });
  }
  ngOnDestroy(): void {
    this.stopPolling.next();
  }
  openNoteModal(): void{
    const modalRef = this.modalService.open(CoordinatesNoteComponent);
    modalRef.componentInstance.coordinates = JSON.parse(JSON.stringify(this.currentSpaceCoordinates));
    modalRef.result.then((res: CoordinatesNote) => {
      this.notes.push(res);
    });
  }
}
