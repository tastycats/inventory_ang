import { TestBed } from '@angular/core/testing';

import { CommunicatorService } from './communicator.service';

describe('CommunicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    expect(service).toBeTruthy();
  });

  it('should initially contain null', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    service.getMessages().subscribe(msg => {
      expect(msg.dest).toBeNull();
      expect(msg.data).toBeNull();
      expect(msg.src).toBeNull();
    });
  });

  it('should pass dest', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    service.postMessage(this, '@all', {test: 'testing'});
    service.getMessages().subscribe(msg => {
      expect(msg.dest).toBe('@all');
    });
  });

  it('should pass on data keys', () => {
    const service: CommunicatorService = TestBed.get(CommunicatorService);
    service.postMessage(this, '@all', {test: 'testing'});
    service.getMessages().subscribe(msg => {
      expect('test' in msg.data).toBeTruthy();
      expect(msg.data.test === 'testing').toBeTruthy();
    });
  });


});
