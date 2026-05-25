import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
@Component({
  selector: 'app-home',
  imports: [ChartModule, ButtonModule, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    // Configuración de los datos del gráfico
    this.chartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Tareas Completadas',
          backgroundColor: '#818cf8', // Color violeta/azul claro
          borderColor: '#818cf8',
          data: [65, 59, 80, 81, 56, 95] 
        },
        {
          label: 'Nuevos Proyectos',
          backgroundColor: '#38bdf8', // Color celeste
          borderColor: '#38bdf8',
          data: [28, 48, 40, 19, 86, 27] 
        }
      ]
    };

    // Opciones visuales del gráfico
    this.chartOptions = {
      maintainAspectRatio: false, // Permite que el gráfico respete el alto de su contenedor CSS
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#6c757d' },
          grid: { color: '#dfe7ef', drawBorder: false }
        },
        y: {
          ticks: { color: '#6c757d' },
          grid: { color: '#dfe7ef', drawBorder: false }
        }
      }
    };
  }
}
