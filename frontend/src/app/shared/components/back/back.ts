import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button'; 

@Component({
  selector: 'app-back',
  standalone: true, 
  imports: [ButtonModule], 
  templateUrl: './back.html',
  styleUrl: './back.css',
})
export class Back {}