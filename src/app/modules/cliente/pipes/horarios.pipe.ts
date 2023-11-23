import { Pipe, PipeTransform } from '@angular/core';
import { dataHoraios } from 'src/app/service/User';

@Pipe({
  name: 'horarios'
})
export class HorariosPipe implements PipeTransform {

  transform(horarios: dataHoraios [], id_gym: number=0): dataHoraios [] {
    const result = horarios ? horarios.filter(horario => horario.Gimnasio_idGimnasio === id_gym) : [];
    return result;
  }

}
