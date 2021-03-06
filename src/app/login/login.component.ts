import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {

    }

    loginUser() {
      if (this.loginForm.invalid)
        return alert("Mot de passe ou email invalide");
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
        if (result == null) { // == null ça veut dire a marcher, si == false il y a une error

          console.log('logging in...');
          this.router.navigate(['/liste-fiches']); //Quand l'utiliateur est loggedin il va etre dirigé vers la Liste des fiches
        }
        else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
        });
    }


}
