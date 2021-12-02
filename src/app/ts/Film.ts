export class Film {
    private _filmId!: number;
    private _title!: string;
    private _description!: string;
    public get description(): string {
      return this._description;
    }
    public set description(value: string) {
      this._description = value;
    }
    private _releaseYear!: number;
    public get releaseYear(): number {
      return this._releaseYear;
    }
    public set releaseYear(value: number) {
      this._releaseYear = value;
    }
    private _rental_duration!: number;
    public get rental_duration(): number {
      return this._rental_duration;
    }
    public set rental_duration(value: number) {
      this._rental_duration = value;
    }
    private _rental_rate!: number;
    public get rental_rate(): number {
      return this._rental_rate;
    }
    public set rental_rate(value: number) {
      this._rental_rate = value;
    }
    constructor(
    ){}

    public get filmId(): number {
        return this._filmId;
    }
    
    public set filmId(value: number) {
    this._filmId = value;
    }

    public get title(): string {
        return this._title;
      }
      public set title(value: string) {
        this._title = value;
      }
  }