import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.css'
})
export class ViewServiceComponent implements OnInit{

  service: Service | undefined;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServicesService,
    private router: Router
  ){}

  
  async ngOnInit(){
    let serviceId: string = this.route.snapshot.params['id'];
    this.service = await this.serviceService.getService(serviceId);
  }

  goToServices(){
    this.router.navigate(['/services/list'])
  }

}
