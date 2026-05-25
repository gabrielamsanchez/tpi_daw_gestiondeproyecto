import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [ButtonModule, CardModule, ToastModule, InputTextModule, MessageModule, AutoCompleteModule, FormsModule],
  providers: [MessageService]
})
export class Login {
  private messageService = inject(MessageService);

  user = { username: '', password: '' };
  formSubmitted = false;

  // Autocomplete state
  value: string | null = null;
  items: string[] = [];

  private allSuggestions = ['alice', 'bob', 'carol', 'dave', 'eve', 'mallory'];

  search(event: any) {
    const q = (event.query || '').toLowerCase();
    this.items = this.allSuggestions.filter(s => s.toLowerCase().includes(q));
  }

  onSubmit(form: NgForm) {
    this.formSubmitted = true;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Formulario Enviado',
      life: 3000
    });

    form.resetForm();
    this.user = { username: '', password: '' };
    this.formSubmitted = false;
  }

  isInvalid(control: any) {
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}


