import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apertura-tramite',
  templateUrl: './apertura-tramite.component.html',
  styleUrl: './apertura-tramite.component.css',
})
export class AperturaTramiteComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  private numeroRadicado: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.numeroRadicado = params['numeroRadicado'];
    });
  }

  submit() {
    this.router.navigate(['/documentos', this.numeroRadicado]);
  }
}
