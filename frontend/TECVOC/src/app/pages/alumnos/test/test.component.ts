// test.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  userName: string | null = '';
  cuestionarios: any;
  currentQuestionIndex: number = 0;
  selectedAnswers: { [key: number]: string } = {};
  totalScore: { [key: string]: number } = {};
  recommendedCareer: string | null = null;
  showResult: boolean = false;

  constructor(
    private testService: TestService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.testService.getCuestionarios().subscribe(data => {
      this.cuestionarios = data;
    });

    if (!this.usersService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.userName = this.usersService.getUserName();
    }
  }

  selectAnswer(questionId: number, answerValue: string) {
    this.selectedAnswers[questionId] = answerValue;
    this.updateTotalScore(questionId, answerValue);
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.cuestionarios[0].Preguntas.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showResults();
    }
  }

  updateTotalScore(questionId: number, answerValue: string) {
    const pregunta = this.cuestionarios[0].Preguntas.find((pregunta: any) => pregunta.id === questionId);
    const opcion = pregunta.opciones.find((opcion: any) => opcion.valor === answerValue);

    this.cuestionarios[0].Carreras.forEach((carrera: any) => {
      const criterio = carrera.criterios.find(
        (criterio: any) => criterio.pregunta === questionId && criterio.respuesta === opcion.valor
      );

      if (criterio) {
        if (this.totalScore[carrera.nombre]) {
          this.totalScore[carrera.nombre] += criterio.puntaje;
        } else {
          this.totalScore[carrera.nombre] = criterio.puntaje;
        }
      }
    });
  }

  showResults() {
    this.recommendedCareer = this.determineRecommendedCareer();
    this.showResult = true;
  }

  determineRecommendedCareer(): string {
    let maxScore = 0;
    let recommendedCareer = '';

    for (const carrera in this.totalScore) {
      if (this.totalScore[carrera] > maxScore) {
        maxScore = this.totalScore[carrera];
        recommendedCareer = carrera;
      }
    }

    return recommendedCareer;
  }
}





















// import { Component, OnInit } from '@angular/core';

// interface Question {
//   id: number;
//   text: string;
//   options: { text: string, value: string }[];
// }

// interface Result {
//   name: string;
//   score: number;
// }

// @Component({
//   selector: 'app-test',
//   templateUrl: './test.component.html',
//   styleUrls: ['./test.component.css']
// })
// export class TestComponent implements OnInit {
//   userName: string | null = 'Yolanda Blanco';
//   questions: Question[] = [
//     {
//       id: 1,
//       text: '¿Qué prefieres hacer en tu tiempo libre?',
//       options: [
//         { text: 'Leer un libro', value: 'lectura' },
//         { text: 'Practicar deportes', value: 'deportes' },
//         { text: 'Hacer manualidades', value: 'manualidades' },
//         { text: 'Salir con amigos', value: 'social' }
//       ]
//     },
//     {
//       id: 2,
//       text: '¿Qué materia te gusta más?',
//       options: [
//         { text: 'Matemáticas', value: 'matematicas' },
//         { text: 'Lenguaje', value: 'lenguaje' },
//         { text: 'Ciencias', value: 'ciencias' },
//         { text: 'Arte', value: 'arte' }
//       ]
//     },
//     {
//       id: 3,
//       text: '¿Cómo te describirías?',
//       options: [
//         { text: 'Creativo', value: 'creativo' },
//         { text: 'Analítico', value: 'analitico' },
//         { text: 'Sociable', value: 'sociable' },
//         { text: 'Detallista', value: 'detallista' }
//       ]
//     },
//     {
//       id: 4,
//       text: '¿Cuál de estos trabajos te gustaría más?',
//       options: [
//         { text: 'Ingeniero', value: 'ingeniero' },
//         { text: 'Profesor', value: 'profesor' },
//         { text: 'Artista', value: 'artista' },
//         { text: 'Médico', value: 'medico' }
//       ]
//     },
//     {
//       id: 5,
//       text: '¿Qué habilidad consideras tu fuerte?',
//       options: [
//         { text: 'Resolución de problemas', value: 'problemas' },
//         { text: 'Comunicación', value: 'comunicacion' },
//         { text: 'Creatividad', value: 'creatividad' },
//         { text: 'Organización', value: 'organizacion' }
//       ]
//     }
//   ];

//   currentQuestionIndex: number = 0;
//   selectedAnswers: { [key: number]: string } = {};
//   showResult: boolean = false;
//   result: Result = { name: '', score: 0 };

//   constructor() {}

//   ngOnInit() {}

//   selectAnswer(questionId: number, answerValue: string) {
//     this.selectedAnswers[questionId] = answerValue;
//     this.nextQuestion();
//   }

//   nextQuestion() {
//     if (this.currentQuestionIndex < this.questions.length - 1) {
//       this.currentQuestionIndex++;
//     } else {
//       this.showResults();
//     }
//   }

//   showResults() {
//     this.showResult = true;
//     this.result.name = this.calculateCareer();
//     this.result.score = 100; // Por simplicidad, asignamos un puntaje fijo
//   }

//   calculateCareer(): string {
//     // Lógica simple para determinar una carrera recomendada
//     const answerValues = Object.values(this.selectedAnswers);
//     if (answerValues.includes('lectura') || answerValues.includes('lenguaje')) {
//       return 'Literatura';
//     } else if (answerValues.includes('deportes')) {
//       return 'Educación Física';
//     } else if (answerValues.includes('ciencias') || answerValues.includes('problemas')) {
//       return 'Ingeniería';
//     } else if (answerValues.includes('arte') || answerValues.includes('creatividad')) {
//       return 'Artes Plásticas';
//     } else {
//       return 'Ciencias Sociales';
//     }
//   }

//   resetTest() {
//     this.currentQuestionIndex = 0;
//     this.selectedAnswers = {};
//     this.showResult = false;
//   }
// }
