import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductCategory } from 'src/_model/productCategory';
import { ProductCategoryService } from 'src/_service/productcategory.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrls: ['./categorydialog.component.css']
})
export class CategorydialogComponent implements OnInit {
  form: FormGroup;
  productCategory: ProductCategory;
  Creado: Boolean;
  constructor(
    private productCategoryService:ProductCategoryService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategory,
    private dialogRef:MatDialogRef<CategorydialogComponent>


  ) { }
 
  ngOnInit(): void {
    this.productCategory = new ProductCategory();
    this.productCategory.productCategoryName = this.data.productCategoryName;
    this.productCategory.productCategoryDescription = this.data.productCategoryDescription;
    this.productCategory.state = 'UPDATED';
    this.productCategory.id= this.data.id;
    
    
    this.Creado = new Boolean();
    this.Creado = false
    if (this.productCategory != null && this.productCategory.id > 0) {
      this.Creado = true;
    }
    
    if (this.Creado == true) {
      this.form = this.fb.group({
        productCategoryName: new FormControl(this.data.productCategoryName),
        productCategoryDescription: new FormControl(this.data.productCategoryDescription),
      });

    }
    else {

      this.form = this.fb.group({
        productCategoryName: new FormControl(''),
        productCategoryDescription: new FormControl(''),
      });
    }
  
  
  }


  registerOrUpdate() {
   
    this.productCategory.productCategoryName = this.form.value['productCategoryName'];
    this.productCategory.productCategoryDescription = this.form.value['productCategoryName'];


    if (this.Creado == false) {
      this.productCategory.id = null;
      this.productCategoryService.registerProductCategory(this.productCategory).subscribe(data => {
        this.productCategoryService.getAllProductsCategories().subscribe(savings => {
          this.productCategoryService.productsChange.next(savings);
          this.productCategoryService.message.next("Se registro");
        });
      });
    }
    else {
      this.productCategoryService.updateProductCategory(this.productCategory.id, this.productCategory).subscribe(data => {
        this.productCategoryService.getAllProductsCategories().subscribe(savings => {
          this.productCategoryService.productsChange.next(savings);
          this.productCategoryService.message.next("Se actualizo");
        });
      });
    }
    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }

}
