import { TratamientoMInterface } from './../../../../interfaces/tratamiento-model';
import { TratamientoService } from './../../../../services/tratamiento/tratamiento.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.page.html',
  styleUrls: ['./tratamientos.page.scss'],
})
export class TratamientosPage implements OnInit {

  @Input() cedPaciente: string;
  public tratamientos: TratamientoMInterface[];
  existTratamiento: boolean;

  constructor(
    private modalCtrl: ModalController,
    private tratamientoService: TratamientoService
  ) { }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.getTratamientosbyP();
  }
  onCloseModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  getTratamientosbyP() {
    this.tratamientoService.getTratamientosByPacientes(this.cedPaciente).subscribe(res => {
      this.tratamientos = res;
      if (Object.keys(res).length === 0) {
        this.existTratamiento = false;
      } else {
        this.existTratamiento = true;
      }
    });
  }

}
