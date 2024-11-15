import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';
import { PexelService } from '../../services/pexel.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  photoMedia: any[] = [];
  photoCount: number = 0;

  constructor(private pexelService: PexelService, private eventBus: EventBusService, private sanitizer: DomSanitizer) {
  }

  showReservationForm: boolean = false;

  ngOnInit() {
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
    } catch (error) { console.error('Error fetching media:', error); }
  }
}
