import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from '../service/http-service.service';

@Component({
  selector: 'app-pontos-turisticos',
  templateUrl: './pontos-turisticos.component.html',
  styleUrls: ['./pontos-turisticos.component.css']
})
export class PontosTuristicosComponent implements OnInit {
	lsActions: Array<PoTableAction> = this.carregarActions();
	lsColumns: Array<PoTableColumn> = this.carregarColunas();
	lsBotoes: Array<PoTableColumn> = this.acessoComentarios();
	lsPontosTuristicos: Array<PontoTuristico> = [];
	
	constructor(
		private httpService: HttpService,
		private poNotification: PoNotificationService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
    this.carregarPontosTuristicos();
	}

	carregarActions(): Array<PoTableAction> {
		return [
			{
				label: 'Editar',
				icon: 'po-icon-edit',
				action: (row: PontoTuristico)=>{ this.navegarParaCadastroPT(row.id) }
			},
			{
				label: 'Excluir',
				icon: 'po-icon-delete',
				action: (row: PontoTuristico)=>{ this.deletarCadastro(row.id) }
			},
			{
				label: 'Comentários',
				icon: 'po-icon-chat',
				action: (row: PontoTuristico)=>{ this.navegarParaDetalhesPT(row.id) }
			}
		]
	}

	deletarCadastro(id: string): void {
		this.httpService.delete('ponto-turistico/' + id).subscribe({
			next: (response)=>{
				this.poNotification.success('Registro excluido com sucesso!');
				this.carregarPontosTuristicos();
			},
			error: (error)=>{
				this.poNotification.error(error);
			}
		})
	}

	navegarParaCadastroPT(codigoPontoTuristico: string = ""){
		this.router.navigate(['cadastro', codigoPontoTuristico], { relativeTo: this.activatedRoute });
	}

	navegarParaDetalhesPT(codigoPontoTuristico: string = ""){
		this.router.navigate([codigoPontoTuristico, 'comentario' ], { relativeTo: this.activatedRoute });
	}

  carregarPontosTuristicos(){
    return this.httpService.get('ponto-turistico/').subscribe({
			next: (resposta)=>{
				let registros: Array<PontoTuristico> = []
				resposta.forEach(item => {
					let novoPontoTuristico: PontoTuristico = {
						id: item.id,
            			pais: item.pais,
						cidade: item.cidade,
						nome: item.nome,
						estacao: item.estacao,
						descricao: item.descricao
					}
					registros.push(novoPontoTuristico);
				});

				this.lsPontosTuristicos = [...registros]
			}
	})
  }

  carregarColunas(): Array<PoTableColumn>{
		return [
			{
				property: 'nome',
				label: 'Nome do Ponto Turistico',
			},
			{
				property: 'pais',
				label: 'País'
			},
			{
				property: 'cidade',
				label: 'Cidade',
			},
      		{
				property: 'estacao',
				label: 'Estação do Ano',
			},
			{
				property: 'descricao',
				label: 'Breve Descrição'
			}
		]
	}

	acessoComentarios(): Array<PoTableColumn>{
		return [
			{
				label: 'Comentários',
				action: (row: PontoTuristico)=>{ this.navegarParaDetalhesPT(row.id) }
			}
		]
	}
}

interface PontoTuristico{
	id: string,
	pais: string,
	cidade: string,
	nome: string,
	estacao: string,
  	descricao: string
}