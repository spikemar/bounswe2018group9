import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../../providers/auth/auth.service';
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['../../auth.module.scss', './signin.page.scss'],
})
export class SigninPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController,
    public toastController: ToastController
  ) {
    this.form = this.formBuilder.group(
      {
        email: ['',  [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  ngOnInit() {
  }

  login() {
    this.authService
      .login(this.form.value)
      .subscribe(response => {
        this.route.queryParams
          .subscribe(params => {
            this.router.navigate([ params['return'] ? params['return'] : '/feed' ]);
          });
      }, error => {
        console.log(error);
        this.presentToast();
      });
  }

  register() {
    this.route.queryParams
      .subscribe(params => {
        this.router.navigate(['/signup'], {
          queryParams: params ? params : null
        })
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Wrong email or password.',
      duration: 2000
    });
    toast.present();
  }

}
