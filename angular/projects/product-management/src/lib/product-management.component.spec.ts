import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProductManagementComponent } from './components/product-management.component';
import { ProductManagementService } from '@product-management';
import { of } from 'rxjs';

describe('ProductManagementComponent', () => {
  let component: ProductManagementComponent;
  let fixture: ComponentFixture<ProductManagementComponent>;
  const mockProductManagementService = jasmine.createSpyObj('ProductManagementService', {
    sample: of([]),
  });
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductManagementComponent],
      providers: [
        {
          provide: ProductManagementService,
          useValue: mockProductManagementService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
