import { Component, inject, OnInit } from '@angular/core';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  standalone: false,
  selector: 'lib-product-management',
  template: ` <p>product-management works!</p> `,
  styles: [],
})
export class ProductManagementComponent implements OnInit {
  private service = inject(ProductManagementService);

  ngOnInit(): void {
    this.service.sample().subscribe(console.log);
  }
}
