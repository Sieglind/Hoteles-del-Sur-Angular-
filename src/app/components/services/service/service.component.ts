import {Component, Input, OnInit} from '@angular/core';
import {PexelsService} from '../../../services/pexels.service';
import {Photo} from 'pexels';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  @Input() service: any;
  photoMedia: Photo[] = [];
  photoCount: number = 0;
  currentPhotoSlide = 0;
  videoMediaUrls: SafeResourceUrl[] = [];
  videoCount: number = 0;
  currentVideoSlide = 0;

  constructor(
    private pexeService: PexelsService,
    private sanitizer: DomSanitizer,
    private eventBusService: EventBusService
  ) {
  }

  async ngOnInit() {
    await this.getServiceMedia();
    this.eventBusService.changeService$.subscribe(
      service => {
        this.service = service;
        this.getServiceMedia();
      }
    )
    setInterval(() => this.nextPhoto(), 6000);
  }

  async getServiceMedia(): Promise<void> {
    this.pexeService.getCollectionMedia(this.service.id).then(collection => {
      if (collection) {
        this.photoMedia = collection.media.filter(collectioNmedia => collectioNmedia.type == 'Photo');
        this.photoCount = this.photoMedia.length
        this.videoMediaUrls = [];
        collection.media
          .filter(media => media.type === 'Video')
          .forEach(video => {
            const videoFile = video.video_files.find(file => file.quality === 'hd') || video.video_files[0];
            if (videoFile) {
              this.videoMediaUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(videoFile.link));
            }
          })
        this.videoCount = this.videoMediaUrls.length
      }
    }).catch(error => console.log(error));
  }

  prevVideo() {
    if (this.currentVideoSlide > 0) {
      this.currentVideoSlide--;
    } else {
      this.currentVideoSlide = this.videoCount - 1;
    }
  }

  nextVideo() {
    if (this.currentVideoSlide == this.videoCount - 1) {
      this.currentVideoSlide = 0;
    } else {
      this.currentVideoSlide++
    }
  }

  prevPhoto() {
    if (this.currentPhotoSlide > 0) {
      this.currentPhotoSlide--;
    } else {
      this.currentPhotoSlide = this.photoCount - 1;
    }
  }

  nextPhoto() {
    if (this.currentPhotoSlide == this.photoCount - 1) {
      this.currentPhotoSlide = 0;
    } else {
      this.currentPhotoSlide++
    }
  }
}
