import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactInfo: any;

  constructor(private companyService: CompanyService) {

  }
  ngOnInit(): void {
    this.companyService.getCompanyContact().subscribe((data) => {
      this.contactInfo = data;
    });
  }
}
