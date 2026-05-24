import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card'; 
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-form-card-demo',
    standalone: true,
    imports: [
        CardModule, 
        MessageModule, 
        ToastModule, 
        ButtonModule, 
        InputTextModule, 
        ReactiveFormsModule
    ],
    providers: [MessageService], 
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class FormCardDemoComponent {
    private fb = inject(FormBuilder); 
    private messageService = inject(MessageService);
    
    exampleForm: FormGroup;
    formSubmitted: boolean = false;

    constructor() {
        this.exampleForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ 
                severity: 'success', 
                summary: 'Éxito', 
                detail: 'Formulario Enviado', 
                life: 3000 
            });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}