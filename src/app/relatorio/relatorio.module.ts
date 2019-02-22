import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSnackBarModule, MatTableModule, MatSelectModule } from "@angular/material";
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
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RelatorioListComponent]
})
export class RelatorioModule {}
