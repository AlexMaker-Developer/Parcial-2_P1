import { Component, OnInit} from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmited = false;
  public auth2;

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.usuariosService.login(this.loginForm.value).subscribe((resp: any) => {
      if (resp.status) {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        }else {
          localStorage.removeItem('email');
        }

        Swal.fire({
          title: 'Exito!',
          text: resp.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/');
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }

    });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id:
        '762655773128-7u3k6476cbakm9bvqoi5qq591ctgin9f.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuariosService.loginGoogle(id_token).subscribe();
        const correo = googleUser.getBasicProfile().du;
        this.usuariosService.loginGoogle(id_token).subscribe((usutoken: any) => {
            if (usutoken.status) {
              localStorage.setItem('email', correo);
              Swal.fire({
                title: 'Exito!',
                text: usutoken.message,
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('/');
                }
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: usutoken.message,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          } )
      },
        (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        }
        );
  }


}
