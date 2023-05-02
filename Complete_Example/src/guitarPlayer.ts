import {
    concat,
    delay,
    from,
    map,
    Observable,
    repeat,
    retry,
    share,
    take,
    timer
} from "rxjs";

export class GuitarPlayer {
  private play: Observable<string>;

  constructor() {
    // const songOne = ["G", "A", "B", "G"];
    // const songTwo = ["B", "C", "D"];
    // const playTwoSong$ = concat(this.playSong(songOne), this.playSong(songTwo));
    // this.play = range(10)
    //     .pipe(
    //         concatMap(i => playTwoSong$.pipe(delay(3000), map(n => n + i))),
    //         share()
    //     )
  }

  public listenToMePlay_0() {
    const notes = ["G", "A", "B", "G"];
    return from(notes);
  }

  public listenToMePlay_1() {
    const notes = ["G", "A", "B", "G"];
    return timer(0, 1000).pipe(
      take(notes.length),
      map((i) => notes[i])
    );
  }

  public listenToMePlay_2() {
    const notes = ["G", "A", "B", "G"];
    return timer(0, 1000).pipe(
      take(notes.length),
      map((i) => notes[i]),
      delay(500),
      repeat()
    );
  }

  public playSong_3(notes: string[]) {
    return timer(0, 1000).pipe(
      take(notes.length),
      map((i) => notes[i])
    );
  }
  public listenToMePlay_3() {
    const songOne = ["G", "A", "B", "G"];
    const songTwo = ["B", "C", "D"];
    const playTwoSong$ = concat(
      this.playSong_3(songOne),
      this.playSong_3(songTwo)
    ).pipe(delay(500), repeat());
    return playTwoSong$;
  }

  public listenToMePlay_4() {
    const songOne = ["G", "A", "B", "G"];
    const songTwo = ["B", "C", "D"];
    const playTwoSong$ = concat(
      this.playSong_3(songOne),
      this.playSong_3(songTwo)
    ).pipe(delay(500), repeat());

    return playTwoSong$.pipe(share());
  }

  public playSong_5(notes: string[]) {
    return timer(0, 1000).pipe(
      take(notes.length),
      map((i) => {
        if (Math.random() > 0.8) throw new Error("klablang");
        return notes[i];
      }),
      //   catchError((err) => {
      //     return this.playSong_5(notes);
      //   })
      // catchError((err,caught) => caught)
      retry()
    );
  }

  public listenToMePlay_5() {
    const songOne = ["G", "A", "B", "G"];
    const songTwo = ["B", "C", "D"];
    const playTwoSong$ = concat(
      this.playSong_5(songOne),
      this.playSong_5(songTwo)
    ).pipe(delay(500), repeat());

    return playTwoSong$.pipe(share());
}
