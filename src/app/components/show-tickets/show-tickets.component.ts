import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Router, NavigationEnd } from '@angular/router';
import { PricelistService } from 'src/app/services/pricelist/pricelist.service';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.css']
})
export class ShowTicketsComponent implements OnInit {

  uniqueName : string = "";
  prikazKarata : boolean = true;
  allTickets: any  = [];
  blaa: any = [];
  blaa1: any = [];
  blaa2: any = [];
  blaa3: any = [];
  allTTypes = [];

  navigationSubscription;
 
  constructor(private ticketServ: TicketService,  private router: Router, private prlServ: PricelistService) {


    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
       this.prikazi();
      }
    });

    
  }

  ngOnInit() {
  }

  prikazi(){
    this.prikazKarata = true;
    this.uniqueName = localStorage.getItem('name');
    if(this.uniqueName == "" || this.uniqueName == null)
    {
      this.prikazKarata = false;
    }
    this.ticketServ.getAllTicketsForOneUser(this.uniqueName).subscribe(data => {
      this.allTickets = [];
      //this.prikazKarata = true;
      this.allTickets = data;
      if(this.allTickets == [] || this.allTickets == null || this.allTickets.length == 0){
        this.prikazKarata  = false;
      }else{
        this.prikazKarata = true;
      }
      this.ticketServ.getAllTicketTypes().subscribe(allTT => {
        this.allTTypes = allTT;
        
        this.allTickets.forEach(element => {
          let y = this.allTTypes.find(x => x._id == element.ticketType);
          if(y.name == "Hourly")
          {
            this.blaa1.push("Hourly");
            this.blaa2.push("Ticket expires an hour after the purchase time");
          }else if(y.name == "Daily")
          {
            this.blaa1.push("Daily");
            this.blaa2.push("Ticket expires by the end of the purchase day");
          }else if(y.name == "Monthly"){
            this.blaa1.push("Monthly");
            this.blaa2.push("Ticket expires by the end of the purchase month");
          }else if(y.name == "Yearly"){
            this.blaa1.push("Yearly");
            this.blaa2.push("Ticket expires by the end of the purchase year");
          }

          let d : Date = new Date(element.purchaseTime);
          let mesec : number = d.getMonth() + 1;
          let m : string = "";
          m = m+ d.getDate().toString() + ".";
          m = m+ mesec.toString() + ".";
          m = m + d.getFullYear().toString() + "." + "  ";
          d.setHours(d.getHours()-2);
          m = m + d.getHours().toString() + ":";
          m = m + d.getMinutes().toString();
  
          this.blaa.push(m);

          this.ticketServ.getPrice(element.ticketPrice, element.user).subscribe(tpr => {
            let broj = parseInt(tpr,10);
            this.blaa3.push(broj);
          })
      })
      
      });
      this.allTickets.reverse();
      this.blaa.reverse();
      this.blaa1.reverse();
      this.blaa2.reverse();
      this.blaa3.reverse();
    },
    err =>{
      window.alert(err.error);
      this.prikazKarata = false;
    });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }  

}
