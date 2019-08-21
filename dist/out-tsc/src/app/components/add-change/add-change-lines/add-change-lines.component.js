import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Polyline } from 'src/app/model/map/polyliner';
import { MarkerInfo } from 'src/app/model/map/marker-info.model';
import { StationModel } from 'src/app/model/stationModel';
import { GeoLocation } from 'src/app/model/map/geolocation';
import { StationService } from 'src/app/services/stations/station.service';
import { LineService } from 'src/app/services/lines/line.service';
import { LineModel } from 'src/app/model/lineModel';
let AddChangeLinesComponent = class AddChangeLinesComponent {
    constructor(ngZone, mapsApiLoader, statServ, lineServ) {
        this.ngZone = ngZone;
        this.mapsApiLoader = mapsApiLoader;
        this.statServ = statServ;
        this.lineServ = lineServ;
        this.sl = new LineModel(0, "", [], "");
        this.selectedL = "none";
        this.selected = "";
        this.stati = [];
        this.drugiMarkeriStati = [];
        this.allLines = [];
        this.selectedStations = [];
        this.boolic = false;
        this.boolZaAktivanRadio = true;
        this.boolZaMarkerZaDodavanje = false;
        this.LineSelected = "none";
        this.visibleLine = true;
        this.iconPath = { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } };
        //validations: AddLinesValidation = new AddLinesValidation();
        this.errorForListStat = "";
        this.linesWStations = [];
        this.setradio("Add");
        this.statServ.getAllStations().subscribe(data => {
            this.stati = data;
            this.drugiMarkeriStati = data;
        });
        this.lineServ.getAllLines().subscribe(data => {
            this.allLines = data;
            this.linesWStations = [];
            let lineses = new LineModel(0, "", [], "");
            this.allLines.forEach(element => {
                lineses.ColorLine = element.colorLine;
                lineses.LineNumber = element.lineNumber;
                lineses.Id = element._id;
                lineses.Stations = this.findStations(element.stations);
                this.linesWStations.push(lineses);
            });
            console.log("data", data);
            console.log("linsWStations", this.linesWStations);
        });
    }
    findStations(e) {
        let ret = [];
        //let statPom : StationModel = new StationModel()
        e.forEach(element => {
            ret.push(this.stati.find(x => x._id == element));
        });
        return ret;
    }
    ngOnInit() {
        this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), "assets/ftn.png", "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
        this.polyline = new Polyline([], 'blue', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
        this.selLine = new Polyline([], 'red', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
        // this.directionsService  = new google.maps.DirectionsService();
        // this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.mapsApiLoader.load().then(() => {
            google.maps.event.addListener(this.sl, 'positionChanged', (function (selLine, i) {
                return function (event) {
                    console.log(event.LatLngLiteral);
                    alert("WTF");
                };
            }));
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer();
        });
    }
    stationClick(id) {
        this.pomStat = new StationModel("", "", 0, 0, 0);
        let postojiStanica = false;
        if (this.selected == 'Add') {
            this.stati.forEach(element => {
                if (element._id == id) {
                    this.pomStat.Id = element._id;
                    this.pomStat.Name = element.name;
                    this.pomStat.Latitude = element.latitude;
                    this.pomStat.Longitude = element.longitude;
                    this.pomStat.Address = element.address;
                }
            });
            this.selectedStations.forEach(element => {
                if (element.Id == this.pomStat.Id) {
                    postojiStanica = true;
                }
            });
            if (postojiStanica) {
                window.alert("Station already exists in line! Choose another station.");
            }
            else {
                this.selectedStations.push(this.pomStat);
                this.polyline.addLocation(new GeoLocation(this.pomStat.Latitude, this.pomStat.Longitude));
                this.id = id;
            }
        }
    }
    SelectedLine(event) {
        this.selectedL = event.target.value;
        this.visibleLine = false;
        if (this.selectedL == "none" || this.selectedL == "") {
            this.sl = new LineModel(0, "", [], "");
            this.selLine = new Polyline([], 'red', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
            this.selektovanaLinijaZaIzmenu = new LineModel(0, "", [], "");
            this.idForRemove = 0;
            this.directionsDisplay.setMap(null);
        }
        else {
            this.directionsDisplay.setMap(null);
            this.visibleLine = false;
            this.selektovanaLinijaZaIzmenu = new LineModel(0, "", [], "");
            this.selLine = new Polyline([], 'red', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
            this.linesWStations.forEach(x => {
                if (x.LineNumber == this.selectedL) {
                    this.selektovanaLinijaZaIzmenu = x;
                    this.sl = x;
                    this.idForRemove = x.Id;
                    x.Stations.forEach(stat => {
                        this.selLine.addLocation(new GeoLocation(stat.Longitude, stat.Latitude));
                    });
                    this.visibleLine = true;
                }
            });
        }
    }
    isSelectedLine(name) {
        if (!this.selectedL) {
            return false;
        }
        return (this.selectedL === name);
    }
    setradio(e) {
        this.visibleLine = false;
        this.selektovanaLinijaZaIzmenu = new LineModel(0, "", [], "");
        this.sl = new LineModel(0, "", [], "");
        this.LineSelected = "none";
        this.refresh();
        this.selected = e;
        if (this.selected != "Add") {
            this.boolZaAktivanRadio = false;
        }
    }
    isSelected(name) {
        if (!this.selected) {
            return false;
        }
        return (this.selected === name);
    }
    onSubmit(lineData, form) {
        if (this.selected == "Add") {
            lineData.Stations = this.selectedStations;
            if (lineData.ColorLine == "" || lineData.ColorLine == null) {
                lineData.ColorLine = "#000000";
            }
            this.lineServ.addLine(lineData).subscribe(data => {
                this.boolic = data;
                window.alert("Line successfully added!");
                form.reset();
                this.refresh();
            }, err => {
                window.alert(err.error);
                form.reset();
                this.refresh();
            });
        }
        else if (this.selected == "Change") {
            if (this.selectedL != "none") {
                lineData.Stations = this.selektovanaLinijaZaIzmenu.Stations;
                lineData.Id = this.selektovanaLinijaZaIzmenu.Id;
                lineData.ColorLine = this.selektovanaLinijaZaIzmenu.ColorLine;
                lineData.LineNumber = this.selektovanaLinijaZaIzmenu.LineNumber;
                lineData.Version = this.selektovanaLinijaZaIzmenu.Version;
                console.log(lineData);
                // if(this.validations.validate(lineData)) {
                //   this.refresh();
                //   //form.reset();
                //   return;
                // }
                this.lineServ.changeLine(lineData, this.selektovanaLinijaZaIzmenu.Id.toString()).subscribe(data => {
                    window.alert("Line successfully changed!");
                    this.LineSelected = "none";
                    form.reset();
                    this.refresh();
                }, err => {
                    window.alert(err.error);
                    this.refresh();
                });
            }
        }
        else if (this.selected == "Remove") {
            if (this.idForRemove == undefined) {
                this.idForRemove = 0;
            }
            this.lineServ.deleteLine(this.idForRemove.toString()).subscribe(data => {
                window.alert("Line successfully removed!");
                // ponovo kupi sve linije, osvezavanje
                form.reset();
                this.refresh();
            }, err => {
                window.alert(err.error);
                this.refresh();
            });
        }
        else {
            console.log("lalallaa");
        }
    }
    removeFromLine(stationId, i) {
        this.selektovanaLinijaZaIzmenu.Stations.splice(i, 1);
    }
    addStationIntoLine(i, form) {
        let postojiStanica = false;
        this.selektovanaLinijaZaIzmenu.Stations.forEach(element => {
            if (element._id == this.markerZaDodavanje.Id) {
                postojiStanica = true;
            }
        });
        if (postojiStanica) {
            window.alert("Station already exists in line! Choose another station.");
        }
        else {
            if (i.rBr <= 0 || i.rBr > this.selektovanaLinijaZaIzmenu.Stations.length + 1) {
                window.alert("Index out of range!");
                form.reset();
            }
            else {
                this.errorForListStat = "";
                this.selektovanaLinijaZaIzmenu.Stations.splice(i.rBr - 1, 0, this.markerZaDodavanje);
                this.boolZaMarkerZaDodavanje = false;
            }
        }
    }
    stationClick1(id) {
        this.stati.forEach(element => {
            if (element._id == id) {
                this.markerZaDodavanje = element;
                this.boolZaMarkerZaDodavanje = true;
            }
        });
    }
    refresh() {
        this.polyline = new Polyline([], 'blue', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
        this.sl = new LineModel(0, "", [], "");
        this.selektovanaLinijaZaIzmenu = new LineModel(0, "", [], "");
        this.selLine = new Polyline([], 'red', { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } });
        this.selectedL = "none";
        this.markerZaDodavanje = new StationModel("", "", 0, 0, 0);
        this.allLines = [];
        this.selectedStations = [];
        this.boolZaMarkerZaDodavanje = false;
        this.idForRemove = 0;
        this.LineSelected = "none";
        this.statServ.getAllStations().subscribe(data => {
            this.stati = data;
            this.drugiMarkeriStati = data;
        });
        this.lineServ.getAllLines().subscribe(data => {
            this.allLines = data;
            this.linesWStations = [];
            let lineses = new LineModel(0, "", [], "");
            this.allLines.forEach(element => {
                lineses.ColorLine = element.colorLine;
                lineses.LineNumber = element.lineNumber;
                lineses.Id = element._id;
                lineses.Stations = this.findStations(element.stations);
                this.linesWStations.push(lineses);
            });
            console.log(data);
        });
    }
};
AddChangeLinesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-change-lines',
        templateUrl: './add-change-lines.component.html',
        styleUrls: ['./add-change-lines.component.css'],
        styles: ['agm-map {height: 500px; width: 700px;}']
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone, MapsAPILoader, StationService, LineService])
], AddChangeLinesComponent);
export { AddChangeLinesComponent };
//# sourceMappingURL=add-change-lines.component.js.map