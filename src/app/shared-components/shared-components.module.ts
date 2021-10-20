import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesNoteComponent } from './coordinates-note/coordinates-note.component';



@NgModule({
  declarations: [CoordinatesNoteComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CoordinatesNoteComponent
  ],
  entryComponents: [
    CoordinatesNoteComponent
  ]
})
export class SharedComponentsModule { }
