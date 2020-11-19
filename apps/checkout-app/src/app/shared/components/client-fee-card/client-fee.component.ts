import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'client-fee',
  templateUrl: './client-fee.component.html',
  styleUrls: ['./client-fee.component.scss']
})
export class ClientFeeCardComponent {

  @Input('clientProgramFee') clientProgramFee ;

  constructor() { }

}
