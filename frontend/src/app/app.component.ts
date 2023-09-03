import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router){}
  readonly menus: Array<PoMenuItem> = [
    { label: 'Paises', shortLabel: 'Paises', icon: 'po-icon-folder', action: this.onClick.bind(this, '/pais') },
    { label: 'P. Turisticos', shortLabel: 'P. Turisticos', icon: 'po-icon-finance-secure', action: this.onClick.bind(this, 'ponto-turistico') }
  ];


  private onClick(rota: string) {
    this.router.navigateByUrl(rota)
  }

}
