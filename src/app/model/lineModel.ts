import { StationModel } from './stationModel';

export class LineModel{
    Id: number;
    LineNumber: string;
    ColorLine: string;
    Stations: StationModel[] = [];
    Version: number;
    _id: string;
    
    
    constructor( id: number,  linenumber:string,stations: StationModel[], col:string, ver? : number, d?: string ){
        this.Id = id;
        this.LineNumber = linenumber;
        this.Stations = stations;
        this.ColorLine = col;
        this.Version = ver;
        this._id = d;
      
    }
}