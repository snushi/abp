import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar />
    <abp-dynamic-layout />
    <abp-internet-status />
  `,
   "standalone": false,
})
export class AppComponent {}
