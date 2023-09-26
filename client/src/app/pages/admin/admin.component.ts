import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { from, mergeMap, Observer } from 'rxjs';
import { DataServer } from 'src/app/models/data';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewChecked {
  products!: Product[]
  productsTemp!: Product[]
  selectedProducts: Product[] = []
  images!: any

  isVisible: boolean = false

  observer: Observer<any> = {
    next: (data: DataServer) => {
      if(data.status === 'CREATE') {
        this.productService.displayMessage('Successfully', 'Product created')
      }
      else if(data.status === 'EDIT') {
        this.productService.displayMessage('Successfully', 'Product updated')
      }
      else {
        this.productService.displayMessage('Successfully', 'Product deleted')
      }

      this.isVisible = false
      this.getProducts()
    },
    error: ({ error }) => {
      this.productService.displayMessage('Error', error.message ? error.message : 'Internal server error', 'error')
    }, 
    complete: () => {}
  }

  form: UntypedFormGroup = this.fb.group({
    _id: [''],
    name: ['', Validators.required], 
    description: ['', Validators.required],
    discount: ['', Validators.required],
    price: ['', Validators.required]
  })

  constructor(
    private productService: ProductService,
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
    )
     { }

  ngOnInit(): void {
    this.getProducts()
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  formatPrice(price: number) {
    return this.productService.formatVND(price)
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl)
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.data as Product[]
      this.productsTemp = res.data as Product[]
    })
  }

  openNew() {
    this.isVisible = true
    this.form.reset()
    this.images = null
  }
 
  editProduct(product: Product) {
    this.isVisible = true
    this.form.patchValue(product)
    this.images = product.images
  }

  // CLOSE DIALOG
  hideDialog() {
    this.isVisible = false
  }

  // CREATE FORM DATA
  createFormData(file: File) {
    const form = new FormData()
    form.append('file', file)
    form.append('upload_preset', 'instagramimages')

    return form
  }

  // CHOOSE FILE IMAGE
  handleSelectImage(event: any) {
    const files = event.files

    if(files.length === 3) {
      this.images = {
        image_1: URL.createObjectURL(files[0]),
        image_2: URL.createObjectURL(files[1]),
        image_3: URL.createObjectURL(files[2])
      }
    }
    else {
      this.images = null
    }
  }

  // SUBMIT FORM
  saveUser(form: UntypedFormGroup) {
    form.markAllAsTouched()
    
    if(!form.valid) return

    // EDIT USER
    if(form.value._id) {
      const {_id, ...data} = form.value
      this.productService.editProduct(_id, data).subscribe(this.observer)
    }

    // CREATE USER
    else {
      if(this.images !== null) {
        this.productService.addProduct({
          ...form.value,
          images: this.images
        }).subscribe(this.observer)
      }
      else {
        this.productService.displayMessage('Please choose three images', 'Error', 'error')
      }
    }
  }

  // DELETE USER
  handleDeleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(this.observer)
      }
    })
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        from(this.selectedProducts).pipe(mergeMap(product => (
          this.productService.deleteProduct(product._id)
        ))).subscribe(this.observer)
      }
    })
  }

  handleSearchChange(e: any) {
    const searchValue = e.target.value
    this.products = this.productsTemp.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
  }
}
