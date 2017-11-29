import { Injectable } from '@angular/core';
import { ToastOptions } from 'ng2-toastr';

@Injectable()

export class CustomOption extends ToastOptions {
  dismiss = 'auto';
  toastLife = 3000;
  newestOnTop = true;
  showCloseButton = true;
  maxShown = 1;
  positionClass = 'toast-top-right';
  animate = 'flyRight';
}
