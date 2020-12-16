import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm){
  return this.http.post(`${this.base_url}/usuarios`, formData);
    }

    login(formData: LoginForm) {
      return this.http.post(`${this.base_url}/auth/login`, formData).pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp.data);
        })
      );
    }

    loginGoogle(token) {
      console.log(token);
      return this.http.post(`${this.base_url}/auth/google`, { token }).pipe(
        tap((resp: any) => {
          //console.log(resp.data);
          localStorage.setItem('token', resp.data);
        })
      );
    }

    validarToken(): Observable<boolean>{
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';

      return this.http.post(`${this.base_url}/auth/renew`, { email, token }).pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.data);
        }),
        map((resp)=> {
          if(resp.status){
            return true;
          }else{
            return false;
          }
        }),
        catchError((error)=> of(false))
      )
    }
  }

    /*validarToken():Observable<boolean> {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem("email") || '';

      return this.http.post(`${base_url}/login/renew`, {email, token}).pipe(
        tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      }),
      map((resp) => true),
      catchError((error) => of(false))
      );
    }
  }*/






/*import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

import { UsuarioI, UsuarioTokenI } from "../interfaces/usuarios";


@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  private urlAPI = environment.base_url;

  constructor(private http: HttpClient) {
  }

  // GetAll Obtener todos los usuarios
  getAllUsers(): Observable<UsuarioI[]> {
    const path = this.urlAPI + 'usuarios/';
    return this.http.get<UsuarioI[]>(path);
  }

  // GetbyID Obtener un usuario
  getUser(idUser: number): Observable<UsuarioI> {
    const path = this.urlAPI + 'usuarios/' + idUser;
    return this.http.get<UsuarioI>(path);
  }

  // CreateUser Agregar un usuario DUDA****************************
  addUser(newUser: UsuarioI): Observable<UsuarioTokenI> {
    return this.http.post(${base_url}/usuarios, formData);
  }

  // UpdateUser Editar usuario DUDA****************************
  updateUser(user: UsuarioI): Observable<UsuarioI[]> {
    const path = this.urlAPI + 'usuarios/' + user.idUsuario;
    return this.http.put<UsuarioI[]>(path, user);
  }

  // DeleteUser Elimina el usuario
  deleteUser(idUser: number): Observable<{}> {
    const path = `${this.urlAPI}usuarios/${idUser}`;
    return this.http.delete(path);
  }

  // Login native with token
  /*login(userLogin: AuthLocalI) {
    const path = `${this.urlAPI}auth/login`;
    this.http.post<any>(path, userLogin).subscribe(res => {
      this.tokenSvc.dispatch(res.token);
    });
  }

  // Login native
  login(userLogin: UsuarioI): Observable<UsuarioTokenI> {
    const path = `${this.urlAPI}auth/login`;
    return this.http.post<UsuarioTokenI>(path, userLogin);
  }

  // Login Google
  // tslint:disable-next-line:typedef
  /*googleLogin(token: AuthGoogleI) {
    const path = `${this.urlAPI}auth/google`;
    return this.http.post(path, token);
  }*/

