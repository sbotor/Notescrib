import { map, Observable, takeWhile } from 'rxjs';

const ignoreFalsy = () =>
  function <T>(source: Observable<T>) {
    return source.pipe(
      takeWhile((x) => !!x),
      map((x) => x!)
    );
  };

export default ignoreFalsy;
