import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ServicesService} from '../../services/services.service';
import {CustomValidators} from '../../validators/custom-validators';
import {PexelsService} from '../../services/pexels.service';


@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {

  serviceForm: FormGroup;
  successMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private router: Router,
    pexelsService: PexelsService
  ) {
    this.serviceForm = this.fb.group({
      id: ['imbkzhu', Validators.required, CustomValidators.collectionExist(pexelsService)],
      title: ['asd', Validators.required],
      subtitle: ['asdasd', Validators.required],
      description: ['asdasdasd', Validators.required],
      imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]],
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.serviceForm.valid) {
      const newService = this.serviceForm.value;
      try {
        const addedService = await this.servicesService.addService(newService);
        if (addedService) {
          this.serviceForm.reset();
          this.successMessage = true;
          setTimeout(() => this.successMessage = false, 3000);
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




