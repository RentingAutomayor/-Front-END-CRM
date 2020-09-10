import { Component, OnInit, Input } from '@angular/core';
import { PreRequestObservation } from '../Models/PreRequestObservation';

@Component({
  selector: 'app-tbl-pre-request-observation',
  templateUrl: './tbl-pre-request-observation.component.html',
  styleUrls: ['./tbl-pre-request-observation.component.scss']
})
export class TblPreRequestObservationComponent implements OnInit {

  @Input() lsObservation: PreRequestObservation[];
  constructor() { }

  ngOnInit() {
  }

}
