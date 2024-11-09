import {Component, Input, OnInit} from '@angular/core';
import {PexelService} from '../../../services/pexel.service';
import {Photo, Video} from 'pexels';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  @Input() service : any;
  photoMedia: Photo[] | undefined;
  videoMediaUrls: SafeResourceUrl[] = [];
  currentSlide = 0;

  constructor(
    private pexeService: PexelService,
    private sanitizer: DomSanitizer,
    private eventBusService: EventBusService
  ) {}

  async ngOnInit() {
    await this.getServiceMedia();
    this.eventBusService.changeService$.subscribe(
      service => {
        this.service = service;
        this.getServiceMedia();
      }
    )
  }

  ngAfterViewInit(): void { 
    this.updateSlidePosition(); 
  }

  async getServiceMedia(): Promise<void> {
    this.pexeService.getCollectionMedia(this.service.id).then(collection => {
      if (collection) {
        this.photoMedia = collection.media.filter(collectioNmedia => collectioNmedia.type == 'Photo')
        this.videoMediaUrls = [];
        collection.media
          .filter(media => media.type === 'Video')
          .forEach(video => {
            const videoFile = video.video_files.find(file => file.quality === 'hd') || video.video_files[0];
            if (videoFile) {
              this.videoMediaUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(videoFile.link));
            }
          });
          this.updateSlidePosition();
        }
    }).catch(error => console.log(error));
  }

  
  nextSlide(): void { 
    this.currentSlide = (this.currentSlide + 1) 
    % this.service.videoMediaUrls.length;
  } 

  prevSlide(): void { 
    this.currentSlide = (this.currentSlide - 1 + 
    this.service.videoMediaUrls.length) % this.service.videoMediaUrls.length; } 
  
  updateSlidePosition(): void { 
    const slides = document.querySelectorAll('.slide'); 
    slides.forEach((slide: any, index) => {
       slide.style.transform = `translateX(-${this.currentSlide * 100}%)`; }); }

}
