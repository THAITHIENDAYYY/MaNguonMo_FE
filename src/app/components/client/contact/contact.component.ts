import { Component } from '@angular/core';
import {faBars, faHeart, faEnvelope ,faMobile,faAddressBook, faTimeline,faUser} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  icon_mail_alt = faEnvelope;
  phone=faMobile;
  add=faAddressBook;
  time=faTimeline;
}
