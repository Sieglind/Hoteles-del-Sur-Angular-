import {Component, OnInit} from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';
import {PexelsService} from '../../services/pexels.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  photoMedia: any[] = [];
  photoCount: number = 0;
  companyInfo: any = {};

  constructor(private pexelService: PexelsService, private eventBus: EventBusService, private companyService: CompanyService) {
  }

  showReservationForm: boolean = false;

  ngOnInit() {
    this.companyService.getCompanyInfo().subscribe((data) => {
      this.companyInfo = data[0]; 
    });    
    this.getServiceMedia();
    this.eventBus.toggleForm$.subscribe(() => {
      this.showReservationForm = !this.showReservationForm;
    });
  }


  async getServiceMedia(): Promise<void> {
    try {
      const collection = await this.pexelService.getCollectionMedia('imbkzhu');
      if (collection) {
        this.photoMedia = collection.media.filter(media => media.type === 'Photo');
        this.photoCount = this.photoMedia.length;
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  }
}
