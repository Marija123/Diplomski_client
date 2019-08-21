import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GeoLocation } from 'src/app/model/map/geolocation';
import { MarkerInfo } from 'src/app/model/map/marker-info.model';
import { StationService } from 'src/app/services/stations/station.service';
//import { AddStationValidation } from 'src/app/models/Validation/validationModels';
let AddChangeStationsComponent = class AddChangeStationsComponent {
    // validations : AddStationValidation = new AddStationValidation();
    constructor(ngZone, mapsApiLoader, statServ) {
        this.ngZone = ngZone;
        this.mapsApiLoader = mapsApiLoader;
        this.statServ = statServ;
        this.selected = "";
        this.coordinates = new GeoLocation(0, 0);
        this.name = "";
        this.stati = [];
        // version: number;
        this.allStations = [];
        this.iconPath = { url: "assets/busicon.png", scaledSize: { width: 50, height: 50 } };
        this.statServ.getAllStations().subscribe(data => {
            this.stati = data;
            console.log(this.stati);
            this.setradio("Add");
        });
    }
    ngOnInit() {
        this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), "assets/ftn.png", "Jugodrvo", "", "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
        this.mapsApiLoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    }
    onSubmit(stationData, form) {
        if (this.selected == "Add") {
            stationData.Latitude = this.coordinates.latitude;
            stationData.Longitude = this.coordinates.longitude;
            stationData.Address = this.address;
            console.log(stationData);
            this.statServ.addStation(stationData).subscribe(data => {
                window.alert("Station successfully added!");
                form.reset();
                this.refresh();
            }, err => {
                window.alert(err.error);
                this.refresh();
            });
        }
        else if (this.selected == "Change") {
            stationData.Latitude = this.coordinates.latitude;
            stationData.Longitude = this.coordinates.longitude;
            stationData.Address = this.address;
            if (stationData.Name == "" || stationData.Name == null) {
                stationData.Name = this.name;
            }
            stationData.Id = this.id;
            ///stationData.Version = this.version;
            console.log("stationData");
            console.log(stationData);
            this.statServ.changeStation(stationData).subscribe(data => {
                window.alert("Station successfully changed!");
                form.reset();
                this.refresh();
            }, err => {
                window.alert(err.error);
                this.refresh();
            });
        }
    }
    RemoveStation() {
        if (this.id == undefined) {
            this.id = 0;
        }
        this.statServ.deleteStation(this.id.toString()).subscribe(data => {
            window.alert("Station successfully removed!");
            this.refresh();
        }, err => {
            window.alert(err.error);
            this.refresh();
        });
    }
    setradio(e) {
        this.selected = e;
        this.stati = [];
        this.name = "";
        this.address = "";
        this.statServ.getAllStations().subscribe(data => {
            this.stati = data;
        });
    }
    isSelected(name) {
        if (!this.selected) { // if no radio button is selected, always return false so every nothing is shown  
            return false;
        }
        return (this.selected === name); // if current radio button is selected, return true, else return false  
    }
    placeMarker1($event) {
        this.coordinates = new GeoLocation($event.coords.lat, $event.coords.lng);
        this.getAddress(this.coordinates.latitude, this.coordinates.longitude);
    }
    getAddress(latitude, longitude) {
        this.geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
            console.log(results);
            if (status === 'OK') {
                if (results[0]) {
                    this.address = results[0].formatted_address;
                }
                else {
                    window.alert('no results found');
                }
            }
        });
    }
    markerDragEnd($event, name, id) {
        this.coordinates.latitude = $event.coords.lat;
        this.coordinates.longitude = $event.coords.lng;
        this.getAddress(this.coordinates.latitude, this.coordinates.longitude);
        this.name = name;
        this.id = id;
        //this.version = version;
        console.log(id);
    }
    stationClick(id) {
        this.id = id;
    }
    refresh() {
        this.stati = [];
        this.address = "";
        this.name = "";
        this.coordinates = new GeoLocation(0, 0);
        this.statServ.getAllStations().subscribe(data => {
            this.stati = data;
        });
    }
};
AddChangeStationsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-change-stations',
        templateUrl: './add-change-stations.component.html',
        styleUrls: ['./add-change-stations.component.css'],
        styles: ['agm-map {height: 500px; width: 700px;}']
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone, MapsAPILoader, StationService])
], AddChangeStationsComponent);
export { AddChangeStationsComponent };
//# sourceMappingURL=add-change-stations.component.js.map