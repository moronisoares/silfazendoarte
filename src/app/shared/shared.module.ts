import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from '../components/modal-confirmacao/modal-confirmacao.component';

@NgModule({
  declarations: [
    ModalConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatGridListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    CurrencyMaskModule
  ],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: BUCKET, useValue: 'gs://silfazendoarte-984f4.appspot.com' },
  ],
})
export class SharedModule { }
