import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService 
{
  
  constructor(private fb : FormBuilder){}

  clientContactFormSettings : any = 
  [
    {
      name : "name",
      label : 'Imię',
      type : 'text',
      required: true,
    },
    {
      name : "lastname",
      label : 'Nazwisko',
      type : 'text',
      required: true,
    },
    {
      name : "email",
      label : 'Email',
      type : 'text',
      required: true,
    },
    {
      name : "phoneNumber",
      label : 'Numer telefonu',
      type : 'text',
      required: true,
    },
    {
      label : 'Płatność',
    },
    {
      name : "isPaymentOnline",
      label : 'Przy odbiorze',
      type : 'radio',
      value : false
    },
    {
      name : "isPaymentOnline",
      label : 'Online',
      type : 'radio',
      value : true
    }
  ]

  contactForm = this.fb.group(
  {
    name : ['', [Validators.required, Validators.minLength(3)]],
    lastname : ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber : ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
    isPaymentOnline : [false]
  })

  deliveryFormSettings : any = 
  [
    {
      name : "name",
      label : 'Imię',
      type : 'text',
      required: true,
    },
    {
      name : "lastname",
      label : 'Nazwisko',
      type : 'text',
      required: true,
    },
    {
      name : "email",
      label : 'Email',
      type : 'text',
      required: true,
    },
    {
      name : "phoneNumber",
      label : 'Numer telefonu',
      type : 'text',
      required: true,
    },
    {
      name : 'city',
      label : 'Miasto',
      type : 'text',
      required : true,
    },
    {
      name : 'postalCode',
      label : 'Kod pocztowy',
      type : 'text',
      required : true,
    },
    {
      name : 'street',
      label : 'Ulica',
      type : 'text',
      required : true,
    },
    {
      name : 'houseNumber',
      label : 'Numer domu',
      type : 'text',
      required : true,
    },
    {
      label : 'Płatność',
    },
    {
      name : "isPaymentOnline",
      label : 'Przy odbiorze',
      type : 'radio',
      value : false
    },
    {
      name : "isPaymentOnline",
      label : 'Online',
      type : 'radio',
      value : true
    }
  ]

  deliveryForm = this.fb.group(
  {
    name : ['', [Validators.required, Validators.minLength(2)]],
    lastname : ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber : ['', [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    postalCode: ['', [Validators.required, Validators.maxLength(6), Validators.maxLength(6)]],
    street: ['', [Validators.required, Validators.minLength(2)]],
    houseNumber: ['', [Validators.required]],
    isPaymentOnline : [false]
  })

  loginFormSettings : any = 
  [
    {
      name : "email",
      label : 'Email',
      type : 'text',
      required: true,
    },
    {
      name : "password",
      label : 'Hasło',
      type : 'password',
      required: true,
    },
  ]

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

    productFormSettings : any = 
  [
    {
      name : "name",
      label : 'Nazwa',
      type : 'text',
      required: true,
    },
    {
      name : "price",
      label : 'Cena',
      type : 'number',
      required: true,
    },
    {
      name : 'photo',
      label : 'Zdjęcie',
      type : 'file',
      require : true,
    },
    {
      label : 'Typ produktu',
    },
    {
      name : "productType",
      label : 'Burger',
      type : 'radio',
      value : 'burger'
    },
    {
      name : "productType",
      label : 'Przekąska',
      type : 'radio',
      value : 'przekaska'
    },
    {
      name : "productType",
      label : 'Napój',
      type : 'radio',
      value : 'napoj'
    }
  ]

  productForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['1', [Validators.required, Validators.min(1)]],
      photo: ['', Validators.required],
      productType : ['burger'],
    })
    
}
