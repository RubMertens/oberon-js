import {
  map,
  merge,
  mergeMap,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";
import { GuitarPlayer } from "./guitarPlayer";

export class Orchestra {
  private playerOne = new GuitarPlayer();
  private playerTwo = new GuitarPlayer();

  //   private music: Observable<string>;
  private playSubject = new Subject<void>();
  private stopSubject = new Subject<void>();

  private music_0: Observable<string>;
  private music_1: Observable<string>;
  private music_2: Observable<string>;
  private music_3: Observable<string>;

  constructor() {
    this.music_0 = merge(
      this.playerOne.listenToMePlay_5().pipe(map((n) => "PLAYER ONE: " + n)),
      this.playerTwo.listenToMePlay_5().pipe(map((n) => "PLAYER TWO: " + n))
    );

    this.music_1 = this.playSubject.pipe(
      mergeMap(() =>
        merge(
          this.playerOne
            .listenToMePlay_5()
            .pipe(map((n) => "PLAYER ONE: " + n)),
          this.playerTwo.listenToMePlay_5().pipe(map((n) => "PLAYER TWO: " + n))
        )
      )
    );

    this.music_2 = this.playSubject.pipe(
      mergeMap(() =>
        merge(
          this.playerOne
            .listenToMePlay_5()
            .pipe(map((n) => "PLAYER ONE: " + n)),
          this.playerTwo.listenToMePlay_5().pipe(map((n) => "PLAYER TWO: " + n))
        )
      ),
      takeUntil(this.stopSubject)
    );

    this.music_3 = this.playSubject.pipe(
      switchMap(() =>
        merge(
          this.playerOne
            .listenToMePlay_5()
            .pipe(map((n) => "PLAYER ONE: " + n)),
          this.playerTwo.listenToMePlay_5().pipe(map((n) => "PLAYER TWO: " + n))
        )
      ),
      takeUntil(this.stopSubject)
    );
  }

  getMusic() {
    return this.music_3;
  }

  stop() {
    this.stopSubject.next();
  }

  play() {
    this.playSubject.next();
  }
}
