export class Address {
    constructor(){}
    private _address_id!: number;
    public get address_id(): number {
        return this._address_id;
    }
    public set address_id(value: number) {
        this._address_id = value;
    }
    private _address!: string;
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    private _address2!: string;
    public get address2(): string {
        return this._address2;
    }
    public set address2(value: string) {
        this._address2 = value;
    }
    private _district!: string;
    public get district(): string {
        return this._district;
    }
    public set district(value: string) {
        this._district = value;
    }
    private _city!: string;
    public get city(): string {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }
    private _postal_code!: number;
    public get postal_code(): number {
        return this._postal_code;
    }
    public set postal_code(value: number) {
        this._postal_code = value;
    }
    private _phone!: number;
    public get phone(): number {
        return this._phone;
    }
    public set phone(value: number) {
        this._phone = value;
    }
}