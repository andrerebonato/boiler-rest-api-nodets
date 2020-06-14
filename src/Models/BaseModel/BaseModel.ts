/* Essa classe será herdada pela maioria das classes do Model. */

export abstract class BaseModel {
    public id: number;
    public active: Boolean;
    public createdAt: Date;
    public lastUpdate: Date;
    public removedAt: Date;
}