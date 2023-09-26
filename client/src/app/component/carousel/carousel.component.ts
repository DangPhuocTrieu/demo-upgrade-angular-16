import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  products = [
    {
      name: 'Nike sport shoe',
      title: 'Nike metcon shoes',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minus illum autem sit maxime, fugiat soluta omnis, blanditiis magnam quam obcaecati dolorum modi ipsum nesciunt est vero dignissimos dicta recusandae?',
      image: 'https://github.com/hoanghoa12345/sf-shoe-shop/blob/main/src/User/assets/images/slide_1.png?raw=true'
    },
    {
      name: 'Nike sport shoe',
      title: 'Nike metcon shoes',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minus illum autem sit maxime, fugiat soluta omnis, blanditiis magnam quam obcaecati dolorum modi ipsum nesciunt est vero dignissimos dicta recusandae?',
      image: 'https://github.com/hoanghoa12345/sf-shoe-shop/blob/main/src/User/assets/images/slide_2.png?raw=true'
    },
    {
      name: 'Nike sport shoe',
      title: 'Nike metcon shoes',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minus illum autem sit maxime, fugiat soluta omnis, blanditiis magnam quam obcaecati dolorum modi ipsum nesciunt est vero dignissimos dicta recusandae?',
      image: 'https://github.com/hoanghoa12345/sf-shoe-shop/blob/main/src/User/assets/images/slide_3.png?raw=true'
    },
    {
      name: 'Nike sport shoe',
      title: 'Nike metcon shoes',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minus illum autem sit maxime, fugiat soluta omnis, blanditiis magnam quam obcaecati dolorum modi ipsum nesciunt est vero dignissimos dicta recusandae?',
      image: 'https://github.com/hoanghoa12345/sf-shoe-shop/blob/main/src/User/assets/images/slide_4.png?raw=true'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
