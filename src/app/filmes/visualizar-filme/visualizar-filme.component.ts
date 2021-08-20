import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {

  readonly semFoto = 'https://bit.ly/3kb04Mj';
  filme: Filme;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private filmeService: FilmesService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Voce tem certeza que deseja excluir?',
        descricao: 'Caso voce tenha certeza que deseja excluir, clique no botao ok',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao) {
        this.filmeService.excluir(this.id).subscribe(() => {
          this.router.navigateByUrl('/filmes');
        })
      }
    });
  }

  private visualizar(): void {
    this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}
