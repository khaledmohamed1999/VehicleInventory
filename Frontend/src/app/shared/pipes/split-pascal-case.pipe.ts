import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitPascalCase',
  standalone: true
})
export class SplitPascalCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    // "InMaintenance" -> "In Maintenance", "Active" -> "Active" (unchanged)
    return value.replace(/(?!^)([A-Z])/g, ' $1');
  }
}