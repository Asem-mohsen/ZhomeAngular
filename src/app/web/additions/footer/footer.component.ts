import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../Services/translation/translation.service';
import { ContactService } from '../../../Services/contact/contact.service';
import { Contact } from '../../../Interfaces/contact';
import { NgIf, NgStyle, isPlatformBrowser, CommonModule } from '@angular/common';
import { SubscriptionsService } from '../../../Services/subscriptions/subscriptions.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, FormGroup, Validators , FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink , TranslateModule , NgIf , NgStyle, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  isLoggedIn: boolean = false;
  currentLang: string = 'en';
  isSearchPopupVisible = false;
  zhomeContact !: Contact ;
  cursorStyle = {};
  cursorFollowerStyle = {};
  isScrollButtonVisible = false;
  emailSuccess: boolean = false;
  isEmailDisabled: boolean = false;

  subscriptionForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
  });

  constructor(private _AuthService : AuthService , private translationService : TranslationService, private contactService : ContactService , @Inject(PLATFORM_ID) private platformId: Object , private subscriberService : SubscriptionsService , private toastr : ToastrService , private fb: FormBuilder){
    // Initialize FormGroup and set email control to enabled by default
    this.subscriptionForm = this.fb.group({
      email: [{ value: null, disabled: false }, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

    this.isLoggedIn = this._AuthService.isAuthenticated();

    if (isPlatformBrowser(this.platformId)) {
      this.contactService.getZhomeData().subscribe({
        next : (res) => {
          this.zhomeContact = res.data
        },
        error: (err) => {
          console.error("Failed to load contact data", err);
        }
      })

      // Subscribe to email input with debounce time
      this.subscriptionForm.get('email')!.valueChanges
      .pipe(debounceTime(5000)) // Wait for 5 seconds
      .subscribe(() => {
        if (this.subscriptionForm.valid) {
          this.saveEmail();
        }
      });
    }

  }

  closeSearchPopup() {
    this.isSearchPopupVisible = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isSearchPopupVisible) {
      this.closeSearchPopup();
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    this.isScrollButtonVisible = scrollPosition > 300;
  }

  onMouseMove(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    this.cursorStyle = {
      left: `${mouseX}px`,
      top: `${mouseY}px`
    };

    setTimeout(() => {
      this.cursorFollowerStyle = {
        left: `${mouseX - 15}px`,
        top: `${mouseY - 15}px`
      };
    }, 100);
  }

  toggleSearchPopup() {
    this.isSearchPopupVisible = !this.isSearchPopupVisible;
  }

  switchLang(lang: string): void {
    this.translationService.changeLang(lang);
    this.translationService.changeDirection(lang);
    this.currentLang = lang;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  saveEmail(): void {
    this.subscriberService.subscription(this.subscriptionForm.value).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.subscriptionForm.get('email')?.disable();
        this.emailSuccess = true;
        this.isEmailDisabled = true;
      },
      error: (err) => {
        this.toastr.error('Failed to save email');
      }
    });
  }
}
