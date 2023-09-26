import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() product!: Product
  @Output() reviewsChange = new EventEmitter<Review[]>()

  reviews!: Review[]
  reviewsTotalString!: string
  dateNow: Date = new Date

  form!: UntypedFormGroup
  user!: User | null

  constructor(
    private productService: ProductService, 
    private fb: UntypedFormBuilder, 
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(15)]],
    })

    this.reviews = this.product.reviews
    this.reviewsTotalString = this.reviews.length.toString() || '0'

    this.user = this.authService.getUserStorage()
  }

  handleSubmit(form: UntypedFormGroup) {
    form.markAllAsTouched()
    
    if(!form.valid) return

    const data = { ...form.value, userId: this.user?._id }

    this.productService.addReview(this.product._id, data).subscribe({
      next: (res: any) => {
        this.reviews = [ ...this.reviews, res.data.reviews[res.data.reviews.length - 1] ]
        this.reviewsTotalString = (parseInt(this.reviewsTotalString) + 1).toString()
        this.productService.displayMessage('Reviews added', 'Successfully')
        
        form.reset()
        this.reviewsChange.emit(this.reviews)
      },
      error: ({ error }) => {       
        this.productService.displayMessage(error.message ? error.message : 'Internal server error', 'Error', 'error')
      }
    })
  }
}
