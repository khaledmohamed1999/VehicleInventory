import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NavComponent } from './shared/layout/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private readonly msalService: MsalService) {}

  ngOnInit(): void {
    // Subscribing to handleRedirectObservable both initializes MSAL and
    // processes the redirect back from Microsoft's sign-in page. This must
    // happen once at the app root, before any guard or component asks MSAL
    // for the current account.
    this.msalService.handleRedirectObservable().subscribe();
  }
}
