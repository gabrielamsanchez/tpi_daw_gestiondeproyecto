import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button'; 
@Component({
  selector: 'app-logout',
  standalone: true, 
  imports: [ButtonModule], 
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {}