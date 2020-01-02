import { Subject } from 'rxjs';

export class UIService {
  // true - loading started
  // false - loading finished
  loadingStateChanged = new Subject<boolean>();
}
