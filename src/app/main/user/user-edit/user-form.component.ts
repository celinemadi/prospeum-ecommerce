import { ParsedToken as User } from '../../../authentication/models/parsed-token';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';
import { JwtService } from 'src/app/authentication/jwt.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  user;
  userToBeUpdated: User

  isUpdateActivated = false;
  submitInProgress = false;
  newUser = false
  userForm: FormGroup
  constructor(private userService: UserService, private jwtService:JwtService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userService.getUser(this.jwtService.getUser().id).subscribe(res=> {this.user = res;
      this.initializeForm(this.user)
    })
  }

  initializeForm(user?: User) {
    this.userForm =  new FormGroup({
      firstname: new FormControl( user?.firstname || '', Validators.required),
      lastname: new FormControl(user?.lastname|| '', Validators.required),
      
    });
  }
 

  updateUser(updateValues: any) {
    this.userService.update(this.user.id,updateValues).subscribe(res=>this.router.navigate(['/main/products']))
  }


  save(){
    if (this.userForm.invalid) {
      return;
    }
    
    this.updateUser(this.userForm.value)
    
  }
}