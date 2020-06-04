import { Component, OnInit , OnChanges,SimpleChange, Input} from '@angular/core';
import { CanalService } from '../Services/canal.service';
import { Canal } from '../canal';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.scss']
})
export class CanalComponent implements OnInit {
  lsCanals: Canal[];  
  cmbCanal = new FormControl('Seleccione');
  @Input() canalSelected:Canal;

  constructor(private canalSercice: CanalService) {
    this.cmbCanal.setValue(0);
   }

  ngOnInit() {
    this.getAllCanals();
  }

  getAllCanals() {
    this.canalSercice.getCanals().subscribe(lscnl => this.lsCanals = lscnl);
  }

  setCanal(idCanal: any) {
    let canalSelected = this.lsCanals.find(c=> c.id == idCanal);
    this.canalSercice.setSelectedCanal(canalSelected);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log("Funcionó en canales");
    console.log(changes);
    for (let propName in changes) {
      if (this.canalSelected != undefined) {
        console.log("CANAL DEL CLIENTE");
        console.log(this.canalSelected);
        this.cmbCanal.setValue(this.canalSelected.id);
      }
    }
  }

}
