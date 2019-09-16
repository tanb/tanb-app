import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  hasError = false;
  completed = false;

  constructor(private translate: TranslateService, private modalService: ModalService, private indicator: IndicatorService, private api: ApiService) {
    this.translate.use(this.translate.currentLang);
  }
  keys(obj: any) {
    return Object.keys(obj);
  }
  public forms = {
    name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
    email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
    message: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(2000)])),
    recaptchaReactive: new FormControl(null, Validators.required)
  };

  public reactiveForm: FormGroup = new FormGroup(this.forms);

  ngOnInit() {
  }

  onClose() {
    this.modalService.hide();
  }

  submitForm() {
    const body = {
      name: this.forms.name.value,
      email: this.forms.email.value,
      message: this.forms.message.value,
      recaptcha: this.forms.recaptchaReactive.value
    };

    const indicatorRef = this.indicator.show();
    this.api.contactMe(body)
      .then(contactMe => {
        this.indicator.hide(indicatorRef);
        this.completed = true;
      })
      .catch(error => {
        this.indicator.hide(indicatorRef);
        this.hasError = true;
        console.log(`handleError: ${error}`);
      });
  }
}