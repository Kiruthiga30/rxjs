import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Observable';
  observable = new Observable<number>((observer) => { //define observable type as number
    console.log("Starts emitting values")
    //emit sequence of num from 1-5
    let num = 1;
    setInterval(() => {
      observer.next(num);
      num++;
      //will stop the emission if it reaches the num 5
      if (num > 5) {
        observer.complete();
      }
    }, 1000);
  }).pipe(filter((x: number) => x % 2 === 0), map((x: number) => x * 10), catchError((err: any) => { throw "Error occurred:" + err }));

  subscription = this.observable.subscribe(data => console.log(data));//use of multiple log in subscribe is depreciated in latest version
}
