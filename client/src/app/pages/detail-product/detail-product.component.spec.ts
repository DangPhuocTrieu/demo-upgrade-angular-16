import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { ReviewsComponent } from 'src/app/component/reviews/reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeModule } from 'primeng/badge';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { DetailProductComponent } from './detail-product.component';


fdescribe('DetailProductComponent', () => {
  let component: DetailProductComponent;
  let productService: jasmine.SpyObj<ProductService>;
  let fixture: ComponentFixture<DetailProductComponent>;

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
      quantily: 4,
      size: 38,
      originPrice: 20000, 
      rating: 3
    },
  ]

  let reviews = [
    {
      _id: '1',
      rating: 4,
      comment: 'Comment 1', 
      name: 'Trieu',
      email: 'trieu@gmail.com'
    },
    {
      _id: '2',
      rating: 2,
      comment: 'Comment 2', 
      name: 'Hong',
      email: 'hong@gmail.com'
    },
  ]

  beforeEach(async () => {
    productService = jasmine.createSpyObj('productService', ['getProduct', 'formatVND', 'calcPriceDiscount', 'getCartListStorage']);
    productService.getProduct.and.returnValue(of({
      success: true, 
      message: 'Get product successfully!', 
      data: {
        _id: '2', 
        name: 'Product 2', 
        description: 'Desc 2',
        price: 20000,
        images: { image_1: 'image-1', image_2: 'image-2', image_3: 'image-2' },
        reviews: [],
      }
    }));

    await TestBed.configureTestingModule({
      declarations: [ DetailProductComponent, ReviewsComponent ],
      imports: [
        HttpClientModule, 
        RatingModule,
        InputNumberModule,
        PanelModule,
        BadgeModule,
        ToastModule,
        // HttpClient,
        BrowserModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: ProductService, useValue: productService },
        HttpClient,
        HttpClientModule,
        MessageService,
        Store
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call func handleChooseSize', () => {
    let size = 40;
    component.handleChooseSize(size)
    expect(component.sizeSelected).toEqual(size)
  })

  it('call func handleCalcPrice', () => {
    let originPrice = component.handleCalcPrice(20000, 20)    
    expect(originPrice).toEqual('16.000 ₫')

    originPrice = component.handleCalcPrice(20000)    
    expect(originPrice).toEqual('20.000 ₫')
  })

  it('call func handleCalcRating', () => {
    let rating = component.handleCalcRating(reviews)
    expect(component.rating).toEqual(rating)
    
    reviews = []
    rating = component.handleCalcRating(reviews)
    expect(component.rating).toEqual(rating)
  })

  it('call func handleReviewsChange', () => {
    let reviewList = reviews
    component.cartList = cartList    
    
    component.getProduct()
  
    component.handleReviewsChange(reviewList)
    console.log(component.cartList)
    
    // expect(component.cartList[1]).toEqual({
    //   ...cartList[1],
    //   rating: component.rating
    // })
  }) 
});
