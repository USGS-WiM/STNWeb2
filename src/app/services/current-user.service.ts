import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CurrentUserService {

  private userSource = new BehaviorSubject('None');
  currentUser = this.userSource.asObservable();

  constructor() { }

  updateCurrentUser(user) {
    this.userSource.next(user);
  }

}
