import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { HttpService } from 'src/app/service/http-service.service';
import { triggerFormValidators } from 'src/app/shared/util';

@Component({
  selector: 'app-cadastro-pontos-turisticos',
  templateUrl: './cadastro-pontos-turisticos.component.html',
  styleUrls: ['./cadastro-pontos-turisticos.component.css']
})
export class CadastroPontosTuristicosComponent implements OnInit {
	lsPaises: Array<Pais> = [];
  	idPontoTuristico: string;
  	formPontoTuristico: FormGroup;
  	title: string = "Novo Cadastro de Ponto Turístico"
  constructor(
    private formBuilder: FormBuilder,
	private poNotification: PoNotificationService,
	private route: ActivatedRoute,
	private router: Router,
	private http: HttpService
  ) { 
    this.formPontoTuristico = this.formBuilder.group({
      pais: ['', Validators.compose([Validators.required])],
	    cidade: ['', Validators.compose([Validators.required])],
	    nome: ['', Validators.compose([Validators.required])],
	    estacao: ['', Validators.compose([Validators.required])],
  	  descricao: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
    this.idPontoTuristico = this.route.snapshot.paramMap.get('idPontoTuristico');
		if (this.idPontoTuristico !== null){
			this.buscaDadosPontoTuristico()
			this.title = "Alteração do Ponto Turístico"
		}
		;
		
		console.log(this.lsPaises);
		
  }

  carregarPaises(){
	 this.http.get('pais/').subscribe({
		next: (resposta)=>{
			let registros: Array<Pais> = []
			resposta.forEach(item => {
				let novoPais: Pais = {
					id: item.id,
					nome: item.nome,
					sigla: item.sigla,
					continente: item.continente,
					codigoDdi: item.ddi
				}
				registros.push(novoPais);
			});

			return this.lsPaises = registros;
		}
	})
}

  salvar(){
		if (this.validarRegistro()){
			if (this.idPontoTuristico == null || this.idPontoTuristico == ""){
				this.enviarPost()
			} else {
				this.enviarPut()
			}
		} else {
			this.poNotification.error("Preencha todos os campos antes de salvar as alterações!")
		}
	}

  voltar(){
		this.router.navigate(['/ponto-turistico'], { relativeTo: this.route })
	}

	validarRegistro(): boolean{
		return this.formPontoTuristico.valid;
	}

	enviarPost(){
		this.http.post('ponto-turistico/',this.formPontoTuristico.value).subscribe({
			next:(resposta) => {
				this.poNotification.success("Registro criado com sucesso!");
				this.voltar();
			},
			error:(erro) => {
				this.poNotification.error(erro)
			},
		})
	}

	enviarPut(){
		this.http.put('ponto-turistico/' + this.idPontoTuristico,this.formPontoTuristico.value).subscribe({
			next:(resposta) => {
				this.poNotification.success("Registro atualizado com sucesso!");
				this.voltar();
			},
			error:(erro) => {
				this.poNotification.error(erro)
			},
		})
	}

  buscaDadosPontoTuristico(){
		this.http.get('ponto-turistico/' + this.idPontoTuristico).subscribe({
			next: (resposta)=>{
				this.formPontoTuristico.patchValue({
          			pais: resposta.pais,
          			cidade: resposta.cidade,
					nome: resposta.nome,
					estacao: resposta.estacao,
					descricao: resposta.descricao
				})
			},
			error: (erro)=>{
				this.poNotification.error(erro)
			}
		})
	}
}

interface Pais{
	id: string,
	nome: string,
	sigla: string,
	continente: string,
	codigoDdi: number
}
