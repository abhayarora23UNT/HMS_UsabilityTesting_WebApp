import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PublishEventService } from './core/services/utils/publish-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HmsApp';

  constructor(private router: Router, private location:Location,private eventService: PublishEventService) {
    this.routerInterceptor();
  }

  /**
 * Function for showing/hiding spinner while  routing
 */
  routerInterceptor() {
    this.router.events.subscribe({
      next: (event: any) => {
        if (event instanceof NavigationEnd ) {
          const path=this.location.path();
          this.eventService.sendMessage(path);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
       
      }
    } );

  }
}
