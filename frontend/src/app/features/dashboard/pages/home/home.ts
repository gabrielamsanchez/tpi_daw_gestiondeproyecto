import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { UiService } from '../../../../core/service/ui';
import { ProyectoService } from '../../../../core/service/proyecto';
@Component({
  selector: 'app-home',
  imports: [ChartModule, ButtonModule, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
   
  chartData: any;
  chartOptions: any;
  
  constructor(
    private uiService: UiService,
    private proyectoService: ProyectoService,
  ){}

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

  abrirModalNuevoProyecto(){
    const ref = this.uiService.openNuevoProyecto();

    // Verificamos que 'ref' no sea null antes de suscribirnos
    if (ref) {
      ref.onClose.subscribe((datosDelFormulario: any)=>{
        if(datosDelFormulario){
          console.log("Enviando datos al servidor(simulando)")
          this.proyectoService.crearProyecto(datosDelFormulario).subscribe({ 
            next: (respuesta) => {
              console.log('2. Respuesta del servidor recibida:', respuesta);
          
            },
            error: (err) => {
              console.log('Hubo un error:', err);
            }
          })
        }
      })
    }
  }

  abrirModalNuevaTarea() {
    const ref = this.uiService.openNuevaTarea();

    if (ref) {
      ref.onClose.subscribe((datosDeLaTarea: any) => {
        if (datosDeLaTarea) {
          console.log('Datos de la tarea listos para enviar:', datosDeLaTarea);
          // Aquí llamarás a tu TareaService(mock) en el futuro
        }
      });
    }
  }

}
