import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommunicatorProtocol } from './interfaces/communicatorprotocol';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  public bvs: BehaviorSubject<CommunicatorProtocol>;

  constructor() {
    this.bvs = new BehaviorSubject<CommunicatorProtocol>({
      src: null,
      dest: null,
      data: null
    });
  }

  getMessages() {
    return this.bvs;
  }

  postMessage(src: object, dest: string, data: any) {
    this.bvs.next({
      src, dest, data
    });
  }
}
