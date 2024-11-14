import { Component } from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from "@angular/material/card";
import {CommonModule, NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Universidad} from '../../../model/universidad';
import {UniversidadService} from '../../../services/universidad.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-univerisdades-universitarios',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    NgForOf,
    MatCardContent,
    NgClass,
    MatCardActions,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './univerisdades-universitarios.component.html',
  styleUrl: './univerisdades-universitarios.component.css'
})
export class UniverisdadesUniversitariosComponent {
  universidades: Universidad[] = [];
  displayedUniversidades: Universidad[] = [];
  currentIndex: number = 0;
  chunkSize: number = 4; // Número de universidades visibles

  constructor(private universidadService: UniversidadService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUniversidades();
  }

  obtenerUniversidades(): void {
    this.universidadService.getUniversidades().subscribe((data: Universidad[]) => {
      this.universidades = data;
      this.updateDisplayedUniversidades();
    });
  }

  updateDisplayedUniversidades(): void {
    this.displayedUniversidades = this.universidades.slice(this.currentIndex, this.currentIndex + this.chunkSize);
  }

  next(): void {
    if (this.currentIndex + this.chunkSize < this.universidades.length) {
      this.currentIndex += this.chunkSize;
      this.updateDisplayedUniversidades();
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.chunkSize;
      this.updateDisplayedUniversidades();
    }
  }
}