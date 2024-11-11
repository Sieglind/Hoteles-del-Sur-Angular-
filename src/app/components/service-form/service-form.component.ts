import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ServicesService } from '../../services/services.service';


@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {

  serviceForm: FormGroup;

  constructor(private fb: FormBuilder,
    private servicesService: ServicesService, 
    private router: Router
  ){
    this.serviceForm = this.fb.group({ 
      title: ['', Validators.required], 
      subtitle: ['', Validators.required], 
      description: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
     if (this.serviceForm.valid) {
        const newService = this.serviceForm.value; 
        try { 
          const addedService = await this.servicesService.addService(newService); 
          if (addedService) { 
            await this.router.navigateByUrl(`/services/${addedService.id}`); 
          } 
          } catch (error) { 
            console.error('Error al añadir el servicio:', error); 
          } 
      } else { 
        console.log('El formulario es inválido'); 
      } 
  }

}
