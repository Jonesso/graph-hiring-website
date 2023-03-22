import { Pipe, PipeTransform } from '@angular/core';
import { isBidirectional, RelationType } from '@shared/types/relations/relation-type.enum';

@Pipe({
  name: 'isBidirectional'
})
export class IsBidirectionalPipe implements PipeTransform {

  transform(type: RelationType): boolean {
    return isBidirectional(type);
  }

}
