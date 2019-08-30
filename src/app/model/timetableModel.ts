import { VehicleModel } from './vehicleModel';

export class TimetableModel{
    Id: string;
    Departures: string;
    
    LineId: string;
    DayTypeId: number;
    Version: number;
    Vehicles: VehicleModel[];
    
    constructor( name: string, lId: string,dId: number,id: string, v?: number ){
        this.Id = id;
        this.Departures = name;
       
        this.LineId = lId;
        this.DayTypeId = dId;
        this.Vehicles = [];
        this.Version = v;
      
    }
}