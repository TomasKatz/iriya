import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SpaceCoordinates} from '../../app.component';
export interface CoordinatesNote {
  coordinates: SpaceCoordinates;
  note: string;
}
@Component({
  selector: 'app-coordinates-note',
  templateUrl: './coordinates-note.component.html',
  styleUrls: ['./coordinates-note.component.css']
})
export class CoordinatesNoteComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  @Input() coordinates: SpaceCoordinates;
  note: string;
  ngOnInit(): void {}
  updateNote(note): void{
    this.note = note.currentTarget.value;
  }
  resolveNote(): void{
    this.activeModal.close({
      coordinates: this.coordinates,
      note: this.note
    });
  }
}
