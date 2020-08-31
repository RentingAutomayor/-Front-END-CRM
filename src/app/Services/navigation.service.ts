import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigatioElement:string;

  constructor() { }

  SetNavigationElement(pNavigationElement:string){
    this.navigatioElement = pNavigationElement;
  }

  GetNavigationElement():string{
    return this.navigatioElement;
  }
}
