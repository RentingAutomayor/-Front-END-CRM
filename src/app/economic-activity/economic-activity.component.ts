import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
/*Importamos el servicio */
import { EconomicActivityService } from '../Services/economic-activity.service';
import { EconomicActivity } from '../Models/EconomicActivity';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-economic-activity',
  templateUrl: './economic-activity.component.html',
  styleUrls: ['./economic-activity.component.scss']
})
export class EconomicActivityComponent implements OnInit {
  lsEconomicActivity: EconomicActivity[];
  frmEconomicActivity: FormGroup;
  @Input() EconomicActSelected: EconomicActivity;

  constructor(private economicActivityService: EconomicActivityService) {
    this.frmEconomicActivity = new FormGroup({
      cmbEconomicActivity: new FormControl('Seleccione ...')
    });

    this.frmEconomicActivity.controls.cmbEconomicActivity.setValue(0);
  }

  ngOnInit() {
    this.getEconomicActivities();

  }

  getEconomicActivities() {
    this.economicActivityService.getEconomicActivities().subscribe(lsEa => this.lsEconomicActivity = lsEa);
  }

  setEconomicActivity(obj: any) {
    let economicAct: EconomicActivity;
    economicAct = this.lsEconomicActivity.find(ea => ea.id == obj.value);
    this.economicActivityService.setEconomicActivity(economicAct);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log("Funcionó");
    console.log(changes);
    for (let propName in changes) {
      if (this.EconomicActSelected != undefined) {
        this.frmEconomicActivity.controls.cmbEconomicActivity.setValue(this.EconomicActSelected.id);
      }
    }
  }

  setFromEconomicActivity(pEconomicActivity: EconomicActivity) {
    this.frmEconomicActivity.controls.cmbEconomicActivity.setValue(pEconomicActivity.id);
  }

}
