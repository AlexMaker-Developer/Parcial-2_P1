import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(): void{
    this.btnClass = `btn ${this.btnClass}%`;
  }

 @Input() Progreso: number = 90;
 @Input() btnClass: string = 'btn-primary';

 @Output() valorSalida : EventEmitter<number> = new EventEmitter();

  get getPorcentaje(){
  return `${this.Progreso}%`;
  }

  cambiarValor(valor:number){
    if(this.Progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return (this.Progreso = 100);
    }

    if(this.Progreso<=0 && valor<0){
      this.valorSalida.emit(0);
      return(this.Progreso = 0);
    }

    this.Progreso = this.Progreso + valor;
    this.valorSalida.emit(this.Progreso);

  }

  onChange(nuevoValor: number){
    if(nuevoValor>= 100){
      this.Progreso= 100;
    }else if(nuevoValor=0){
      this.Progreso = 0;
    }else{
      this.Progreso = nuevoValor;
    }
    this.valorSalida.emit(this.Progreso)
  }

}
