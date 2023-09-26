import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductService } from 'src/app/services/product.service';
import { CartComponent } from './cart.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let productService: jasmine.SpyObj<ProductService>;
  let fixture: ComponentFixture<CartComponent>;

  let cartList = [
    { 
      _id: '1', 
      name: 'Product 1', 
      description: 'Desc 1',
      price: 20000,
      images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
      reviews: [],
      quantily: 2,
      size: 40,
      originPrice: 30000, 
      rating: 5
    },
    { 
      _id: '2', 
      name: 'Product 2', 
      description: 'Desc 2',
      price: 20000,
      images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
      reviews: [],
      quantily: 4,
      size: 42,
      originPrice: 10000, 
      rating: 4
    },
    { 
      _id: '3', 
      name: 'Product 3', 
      description: 'Desc 3',
      price: 20000,
      images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
      reviews: [],
      quantily: 5,
      size: 38,
      originPrice: 20000, 
      rating: 3
    },
  ]

  beforeEach(async () => {
    productService = jasmine.createSpyObj('productService', ['formatVND', 'getCartListStorage', 'displayMessage'])

    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ 
        HttpClientModule, 
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        BrowserModule,
        RatingModule, 
        ToastModule, 
        ToolbarModule,
        StoreModule.forRoot({}),
        TableModule,
        BrowserAnimationsModule
      ],
      providers: [ 
        MessageService, 
        ConfirmationService,
        Store,
        { provide: ProductService, useValue: productService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('call func formatPrice', () => {
    const price = component.formatPrice(300000)
    expect(price).toEqual('300.000 ₫')
  })

  it('call func handleTotalPrice', () => {
    component.cartList = cartList

    const total = component.handleTotalPrice()
    expect(total).toEqual('200.000 ₫')
  })

  it('call func handleChangeQuantily', () => {
    component.cartList = cartList

    component.handleChangeQuantily('increase', '1', 40, 3)
    expect(component.cartList[0].quantily).toEqual(3)
  })

  it('call func handleDelete', () => {
    component.cartList = cartList

    let newCartList = [ component.cartList[1], component.cartList[2] ]
    
    let confirmdialog: ConfirmDialog
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;

    let accept = spyOn(confirmdialog, 'accept').and.callThrough()
    component.handleDelete('1', 40)
    fixture.detectChanges()
    
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click()
   
    expect(accept).toHaveBeenCalled();
    expect(component.cartList).toEqual(newCartList)

  })

  it('call func handleMultipleDelete', () => {
    component.cartList = cartList

    component.productsSelected = [
      { 
        _id: '1', 
        name: 'Product 1', 
        description: 'Desc 1',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 2,
        size: 40,
        originPrice: 30000, 
        rating: 5
      },
      { 
        _id: '3', 
        name: 'Product 3', 
        description: 'Desc 3',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
        quantily: 4,
        size: 38,
        originPrice: 20000, 
        rating: 3
      },
    ]

    let newCartList = [ component.cartList[1] ]
    
    let confirmdialog: ConfirmDialog
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;

    let accept = spyOn(confirmdialog, 'accept').and.callThrough()
    component.handleMultipleDelete()
    fixture.detectChanges()
    
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click()
   
    expect(accept).toHaveBeenCalled();
    expect(component.cartList).toEqual(newCartList)
  })

  it('call func handleSearchChange', () => {
    component.cartListTemp = cartList
    component.searchValue = 'Product 2'
    
    component.handleSearchChange()
    expect(component.cartList).toEqual([ component.cartListTemp[1] ])
  })
  
  it('call func handlePayment', () => {
    component.cartList = cartList
    
    let confirmdialog: ConfirmDialog
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;

    let accept = spyOn(confirmdialog, 'accept').and.callThrough()
    component.handlePayment()
    fixture.detectChanges()
    
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click()

    expect(component.cartList).toEqual([])
  })
});
