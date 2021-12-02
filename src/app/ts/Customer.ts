export class Customer {

    private _customer_id!: number;
    public get customer_id(): number {
        return this._customer_id;
    }
    public set customer_id(value: number) {
        this._customer_id = value;
    }
    private _store_id!: number;
    public get store_id(): number {
        return this._store_id;
    }
    public set store_id(value: number) {
        this._store_id = value;
    }
    private _first_name!: string;
    public get first_name(): string {
        return this._first_name;
    }
    public set first_name(value: string) {
        this._first_name = value;
    }
    private _last_name!: string;
    public get last_name(): string {
        return this._last_name;
    }
    public set last_name(value: string) {
        this._last_name = value;
    }
    private _email!: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    private _address_id!: number;
    public get address_id(): number {
        return this._address_id;
    }
    public set address_id(value: number) {
        this._address_id = value;
    }
    private _active!: number;
    public get active(): number {
        return this._active;
    }
    public set active(value: number) {
        this._active = value;
    }
    private _create_date!: string;
    public get create_date(): string {
        return this._create_date;
    }
    public set create_date(value: string) {
        this._create_date = value;
    }

    constructor(){

    }
   
}
