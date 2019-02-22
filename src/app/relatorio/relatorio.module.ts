import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatSnackBarModule, MatTableModule, MatInputModule } from "@angular/material";
import { RelatorioListComponent } from "./relatorio-list.component";

@NgModule({
  declarations: [RelatorioListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [RelatorioListComponent]
})
export class RelatorioModule {}
