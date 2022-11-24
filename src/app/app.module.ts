import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspaceListComponent } from './features/workspaces/components/workspace-list/workspace-list.component';
import { HeaderComponent } from './core/components/header/header.component';
import { httpInterceptorProviders } from './app.interceptors';
import { LoginPromptComponent } from './home/components/login-prompt/login-prompt.component';
import { EditWorkspaceDialogComponent } from './features/workspaces/components/edit-workspace-dialog/edit-workspace-dialog.component';
import { ConfirmationDialogComponent } from './core/components/confirmation-dialog/confirmation-dialog.component';
import { WorkspaceBrowserComponent } from './features/workspaces/components/workspace-browser/workspace-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceListComponent,
    HeaderComponent,
    LoginPromptComponent,
    EditWorkspaceDialogComponent,
    ConfirmationDialogComponent,
    WorkspaceBrowserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
