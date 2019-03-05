import {AbstractControl} from '@angular/forms';
import {Observable, of} from 'rxjs';

export const ImageValidator = (control: AbstractControl): Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  if (typeof (file) === 'string') {return of(null); }
  const reader = new FileReader();
  let isValid = false;
  reader.readAsArrayBuffer(file);
  return Observable.create((obs) => {
    reader.addEventListener('loadend', () => {
      let fileHeader = '';
      // @ts-ignore
      const arr = new Uint8Array(reader.result).subarray(0, 4);
      for (let i = 0; i < 4; i++) {
        fileHeader += arr[i].toString(16);
      }
      switch (fileHeader) {
        case '89504e47':
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        obs.next(null);
      } else {
        obs.next({invalidFormat: true});
      }
      obs.complete();
    });
  });
};

