import { Component, OnInit } from '@angular/core';
import { TicketPricesPomModel } from 'src/app/model/ticketPricesPomModel';
import { PriceListModel } from 'src/app/model/pricelistModel';
import { PricelistService } from 'src/app/services/pricelist/pricelist.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  priceList: any;
  ticketPricesPom: TicketPricesPomModel = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []));
  datumVazenjaBool: boolean = false;
  validPrices: TicketPricesPomModel;
  pocDatum: string = "";
  endDatum: string = "";
    constructor( private pricelistServ: PricelistService) { 
      this.pricelistServ.getPricelist().subscribe(data => {
        
        this.priceList = data; 
         console.log(data);
        
         this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []))
         if(this.priceList){
           let d : Date = new Date(this.priceList.startOfValidity);
           this.pocDatum = d.getDate().toString()+ "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString() + ".";
           let e: Date = new Date(this.priceList.endOfValidity);
           this.endDatum = e.getDate().toString() + "." + (e.getMonth() + 1).toString() + "." + e.getFullYear().toString() + ".";
        

           this.pricelistServ.getTicketPrices(this.priceList._id).subscribe(tp => {
            this.validPrices.Hourly = tp[0].price;
            this.validPrices.Daily = tp[1].price;
            this.validPrices.Monthly= tp[2].price;
            this.validPrices.Yearly = tp[3].price;
           });
      }
      });
       
    }

  ngOnInit() {
  }

}

