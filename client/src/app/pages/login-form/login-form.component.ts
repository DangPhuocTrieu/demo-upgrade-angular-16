import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { USER_KEY } from 'src/app/constants';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { loginStart, loginSuccess } from '../../store/auth/auth.action'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loading$!: Observable<boolean>

  form: UntypedFormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(
    private fb: UntypedFormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  handleSubmit(form: UntypedFormGroup) {
    form.markAllAsTouched()

    if(!form.valid) return

    this.authService.login(this.form.value).subscribe({
      next: (res) => {

        localStorage.setItem(USER_KEY, JSON.stringify(res.data))
        this.router.navigate(['/'])
      },
      error: ({ error }) => {
        this.messageService.add({severity:'error', summary:'Failed', detail:  error.message ? error.message : 'Internal server error' });
      }
    })
  }

}
