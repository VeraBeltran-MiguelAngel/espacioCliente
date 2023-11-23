import { Pipe, PipeTransform } from '@angular/core';
import { dataGym } from 'src/app/service/User';

@Pipe({
  name: 'gimnasio'
})
export class GimnasioPipe implements PipeTransform {

  transform(gimnasios: dataGym[], gym_selected: number=0 ): dataGym[] {
    //filtrar sucursal por id
    //Se realiza la siguiente validacion para evitar el error de lectura del metodo filter
    //TypeError: Cannot read property 'filter' of Undefined in JS
    const result = gimnasios ? gimnasios.filter(gym => gym.idGimnasio === gym_selected) : [];
    //const filterGym  = gimnasios.filter( gym => gym.idGimnasio === gym_selected);
    return result;
  }

  //https://bobbyhadz.com/blog/javascript-cannot-read-property-filter-of-undefined
}
