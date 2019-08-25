import { VehicleModel } from './vehicleModel';

export class TimetableModel{
    Id: string;
    Departures: string;
    
    LineId: string;
    DayTypeId: number;
    
    Vehicles: VehicleModel[];
    
    constructor( name: string, lId: string,dId: number,id: string ){
        this.Id = id;
        this.Departures = name;
       
        this.LineId = lId;
        this.DayTypeId = dId;
        this.Vehicles = [];
      
    }
}