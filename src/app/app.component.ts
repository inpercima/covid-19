import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../environments/environment';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@Component({
    selector: 'covid-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatToolbarModule, DashboardComponent],
})
export class AppComponent {
  public appname: string;

  // Adds the custom theme to the app root.
  @HostBinding('class') class = `${environment.theme}-theme`;

  public constructor(private dialog: MatDialog, private titleService: Title, public overlayContainer: OverlayContainer) {
    this.appname = environment.appname;
    this.titleService.setTitle(this.appname);
    // Adds the custom theme to dialogs.
    this.overlayContainer.getContainerElement().classList.add(`${environment.theme}-theme`);
  }

  openDialog(ref: TemplateRef<Element>): void {
    this.dialog.open(ref, {
      maxWidth: '800px',
    });
  }
}
