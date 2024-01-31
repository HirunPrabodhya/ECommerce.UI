import { Component, OnInit } from '@angular/core';
import { Category } from '../Common/Category';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  categories : Category[] = [];
  homeForm : FormGroup;
  file : File;
    constructor(private service : CategoryService, private fb : FormBuilder) {
      this.homeForm = fb.group({
        name:["",Validators.required],
        description:["",Validators.required]
      });
    }

    
    ngOnInit(): void {
        this.service.getAllCategory()
        .subscribe(
          {
            next:(res: Category[]) => {
              
              this.categories = res;
              
            },
            error:(err:Response)=>{
              console.log(err)
            }
          }
        );
    }
    changeImage(e : any){
        const fileList : FileList = e.target.files;
        this.file = fileList[0] as File;
        console.log(this.file);
    }
    getFormValues(){
        if(this.homeForm.valid){
          const formData = new FormData();
          formData.append("CategoryImage",this.file,this.file.name);
          formData.append("Name",this.homeForm.value.name);
          formData.append("Description",this.homeForm.value.description);
  
          this.service.addCategory(formData)
                      .subscribe(
                        {
                          next: res=>{
                            alert(res.message);
                            window.location.reload();
                          },
                          error: (err : Response)=>{
                            console.log(err);
                          }
                        }
                      )
        }
        else{
          alert("form is invalid");
        }
     

    }

}
