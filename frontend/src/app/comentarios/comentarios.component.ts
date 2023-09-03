import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { firstValueFrom, switchMap } from 'rxjs';
import { HttpService } from '../service/http-service.service';

@Component({
	selector: 'app-comentarios',
	templateUrl: './comentarios.component.html',
	styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
	lsActions: Array<PoTableAction> = this.carregarActions();
	lsColumns: Array<PoTableColumn> = this.carregarColunas();
	lsColumns2: Array<PoTableColumn> = this.carregarColunas2();
	lsComentarios: Array<Comentario> = [];
	lsPontosTuristicos: Array<PontoTuristico> = [];
	idPontoTuristico: string;
	constructor(
		private httpService: HttpService,
		private poNotification: PoNotificationService,
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		let idPontoTuristico = this.route.snapshot.paramMap.get('idPontoTuristico');
		
		this.carregarComentarios(idPontoTuristico);
		this.carregarPontosTuristicos(idPontoTuristico);
	}

	carregarActions(): Array<PoTableAction> {
		return [
			{
				label: 'Editar',
				icon: 'po-icon-edit',
				action: (row: Comentario) => { this.navegarParaCadastroCM(row.id) }
			},
			{
				label: 'Excluir',
				icon: 'po-icon-delete',
				action: (row: Comentario) => { this.deletarCadastro(row.idPontoTuristico, row.id) }
			}
		]
	}

	deletarCadastro(idPontoTuristico: string, id: string): void {
		this.httpService.delete('ponto-turistico/' + idPontoTuristico + '/comentario/' + id).subscribe({
			next: (response) => {
				this.poNotification.success('Registro excluido com sucesso!');
				this.carregarComentarios(idPontoTuristico);
			},
			error: (error) => {
				this.poNotification.error(error);
			}
		})
	}

	navegarParaCadastroCM(codigoComentario: string = "") {
		this.router.navigate(['cadastro', codigoComentario], { relativeTo: this.route })
	}

	voltar(){
		this.router.navigate(['/ponto-turistico'], { relativeTo: this.route })
	}

	carregarComentarios(idPontoTuristico: string) {
		return this.httpService.get('ponto-turistico/' + idPontoTuristico + '/comentario').subscribe({
			next: (resposta) => {
				let registros: Array<Comentario> = []
				resposta.forEach(item => {
					let novoComentario: Comentario = {
						id: item.id,
						comentario: item.comentario,
						autor: item.autor,
						dtComentario: this.formataData(item.dtComentario),
						idPontoTuristico: item.idPontoTuristico
					}
					registros.push(novoComentario);
				});

				this.lsComentarios = [...registros]
			}
		})
	}

	carregarPontosTuristicos(idPontoTuristico: string) {
		return this.httpService.get('ponto-turistico/' + idPontoTuristico).subscribe({
			next: (resposta) => {
				let registros: Array<PontoTuristico> = []

				let novoPontoTuristico: PontoTuristico = {
					id: resposta.id,
					pais: resposta.pais,
					cidade: resposta.cidade,
					nome: resposta.nome,
					estacao: resposta.estacao,
					descricao: resposta.descricao
				}
				registros.push(novoPontoTuristico);


				this.lsPontosTuristicos = [...registros]
			}
		})
	}

	carregarColunas(): Array<PoTableColumn> {
		return [
			{
				property: 'comentario',
				label: 'Comentários'
			},
			{
				property: 'autor',
				label: 'Autor',
			},
			{
				property: 'dtComentario',
				label: 'Data do Comentário'
			}
		]
	}

	carregarColunas2(): Array<PoTableColumn> {
		return [
			{
				property: 'nome',
				label: 'Nome'
			},
			{
				property: 'pais',
				label: 'País',
			},
			{
				property: 'cidade',
				label: 'Cidade',
			},
			{
				property: 'estacao',
				label: 'Melhor estação para visita'
			},
			{
				property: 'descricao',
				label: 'Breve descrição'
			}
		]
	}

	formataData(data: string) {
		let ano = data.substring(0, 4);
		let mes = data.substring(5, 7);
		let dia = data.substring(8, 10);
		let barra = "/";

		return dia + barra + mes + barra + ano;
	}
}

interface Comentario {
	id: string;
	comentario: string;
	autor: string;
	dtComentario: string;
	idPontoTuristico: string;
}

interface PontoTuristico {
	id: string,
	pais: string,
	cidade: string,
	nome: string,
	estacao: string,
	descricao: string
}
