import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CloudOSAAppComponent } from './app.component';
import { CloudOSAAppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CloudOSAAppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CloudOSAAppService],
  bootstrap: [CloudOSAAppComponent],
})
export class AppModule {}
