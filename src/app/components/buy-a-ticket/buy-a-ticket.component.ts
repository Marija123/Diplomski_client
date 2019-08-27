import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { PayPalConfig } from 'ngx-paypal'
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { ShowTicketsComponent } from '../show-tickets/show-tickets.component';

import { TicketService } from 'src/app/services/ticket/ticket.service';
import { PricelistService } from 'src/app/services/pricelist/pricelist.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TicketPricesPomModel } from 'src/app/model/ticketPricesPomModel';
import { PriceListModel } from 'src/app/model/pricelistModel';
@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  allTicketTypes : any = [];
  ticketTypeDetail: string = "";
  selecetTT : number;
  priceList: any;
  dobavljanjePayPal: any;
  validPrices: TicketPricesPomModel;
  price: number;
  discount: number;
  priceWDiscount: number;
  user: any;
  neregKupVremKartu : boolean= false;
  poruka: string = "";
  prikaziButtonK : boolean = false;
   typeM : any;
   EmailForPay : string = "";
   validan : any;
   korisceniEmail: string = "";
   boolZaOtvaranjeForme: boolean = false;
   mailZaSlanje: string = "";
   boolZaPrikazCena: boolean = false;
   skloniFormu: boolean = false;
   idTT: string = "";
   TicketPricess = [];

  constructor(private router: Router,private ticketServ: TicketService, private pricelistServ: PricelistService, private auth: AuthenticationService) {
    ticketServ.getAllTicketTypes().subscribe( data => {
      this.allTicketTypes = data;

      this.pricelistServ.getPricelist().subscribe(data => {
        this.priceList = data; 
        console.log(data);

        this.validPrices = new TicketPricesPomModel(0,0,0,0,0,new PriceListModel(new Date(),new Date(),0, []))
       
        this.pricelistServ.getTicketPrices(this.priceList._id).subscribe(tp => {
          this.TicketPricess = tp;
          this.validPrices.Hourly = tp[0].price;
          this.validPrices.Daily = tp[1].price;
          this.validPrices.Monthly= tp[2].price;
          this.validPrices.Yearly = tp[3].price;


          let ro = localStorage.getItem('role');
          if(ro)
          {
            if(ro == "AppUser")
            {
              this.auth.profile().subscribe(data => {
              
                this.user = data;    
                console.log(this.user); 
                
              });
            }
          }else {
            this.neregKupVremKartu = true;
          }
 

        });

      });
    });
    

    // this.initConfig();

   }

  ngOnInit() {
    
  }

setradio(sel)
{
  this.boolZaPrikazCena = false;
  this.boolZaOtvaranjeForme = false;
  this.mailZaSlanje = "";
  
  // if(sel == 0)
  // {
  //   this.allTicketTypes.forEach(element => {
  //     if(element.name == "Hourly")
  //     {
  //       this.idTT = element._id;
  //     }
  //   });
  // }else if(sel == 1)
  // {
  //   this.allTicketTypes.forEach(element => {
  //     if(element.name == "Daily")
  //     {
  //       this.idTT = element._id;
  //     }
  //   });
  // }else if(sel == 2)
  // {
  //   this.allTicketTypes.forEach(element => {
  //     if(element.name == "Monthly")
  //     {
  //       this.idTT = element._id;
  //     }
  //   });
  // }else if(sel == 3)
  // {
  //   this.allTicketTypes.forEach(element => {
  //     if(element.name == "Yearly")
  //     {
  //       this.idTT = element._id;
  //     }
  //   });
  // }

  if(sel != 0)
  {
    this.selecetTT = sel;
    let bla = new FormData();
    bla.append("id",sel );
    bla.append("name",localStorage.getItem('name') );
    //let bla = new TicketTypeModel(localStorage.getItem('name'), sel);
    this.ticketServ.checkValidity(bla).subscribe(data =>{
      this.validan = data;
      if(this.validan.message == "Ok")
        {

          if(sel == 1)
          {
            this.price = this.validPrices.Hourly;
          }else if(sel == 2){
            this.price = this.validPrices.Daily;
          }else if(sel == 3){
            this.price = this.validPrices.Monthly;
          }else if(sel == 4)
          {
            this.price = this.validPrices.Yearly;
          }

          if(!this.neregKupVremKartu)
          {
              this.CalculateDiscount();
            
          }else{
            
            this.discount = 0;
            this.priceWDiscount = this.price;
           this.boolZaOtvaranjeForme = true;
           this.boolZaPrikazCena = true;
          }
        }else{
          window.alert("You are not authorized for this purchase!");
          this.price = 0;
          this.priceWDiscount = 0;
          this.discount = 0;
        }
      })
  }
}

  

  

  CalculateDiscount(){
    this.ticketServ.getTypeUser(localStorage.getItem('name')).subscribe(data =>{
      this.typeM = data;
      this.discount =  this.typeM.coefficient * 100;
      this.priceWDiscount = this.price - (this.price * this.typeM.coefficient) ;
      this.boolZaPrikazCena = true;
      this.initConfig();
    });
  }

  UpisiKartu() {

    // let payPalMod = new PayPalModel(0);
    // payPalMod.PayementId = this.dobavljanjePayPal.id;
    // let pom = new Date(this.dobavljanjePayPal.create_time);
    // //pom.setHours(pom.getHours() + 2);
    // payPalMod.CreateTime = pom;
    // payPalMod.PayerEmail = this.dobavljanjePayPal.payer.email_address;
    // payPalMod.PayerName = this.dobavljanjePayPal.payer.name.given_name;
    // payPalMod.PayerSurname = this.dobavljanjePayPal.payer.name.surname;
    // payPalMod.CurrencyCode = this.dobavljanjePayPal.purchase_units[0].amount.currency_code;
    // payPalMod.Value = this.dobavljanjePayPal.purchase_units[0].amount.value;

    // console.log("PayPal model: ", payPalMod);

let payPalMod = new FormData();
payPalMod.append("payementId", this.dobavljanjePayPal.id);
payPalMod.append("createTime", new Date(this.dobavljanjePayPal.create_time).toString());
payPalMod.append("payerEmail",  this.dobavljanjePayPal.payer.email_address);
payPalMod.append("payerName",this.dobavljanjePayPal.payer.name.given_name );
payPalMod.append("payerSurname",this.dobavljanjePayPal.payer.name.surname );
payPalMod.append("currencyCode",this.dobavljanjePayPal.purchase_units[0].amount.currency_code );
payPalMod.append("value", this.dobavljanjePayPal.purchase_units[0].amount.value);

    //let ticketMod = new TicketModel("",new Date(),0,"",0,0);
    //let ticketMod = new FormData();
    
    let b = new Date();
    b.setHours(b.getHours()+ 2);

    payPalMod.append('purchaseTime', new Date(b).toString());
    //ticketMod.PurchaseTime = new Date(b);
    //ticketMod.append('purchaseTime', new Date(b).toString());
    //payPalMod.append('ticketType', this.selecetTT.toString());
    //ticketMod.TicketTypeId = this.selecetTT;
    if(this.selecetTT == 1)
    {
      payPalMod.append("ticketPrices", this.TicketPricess[0]._id)
      payPalMod.append('ticketType', "Hourly");
    }else if(this.selecetTT == 2)
    {
      payPalMod.append("ticketPrices", this.TicketPricess[1]._id)
      payPalMod.append('ticketType', "Daily");
    }else if(this.selecetTT == 3)
    {
      payPalMod.append("ticketPrices", this.TicketPricess[2]._id)
      payPalMod.append('ticketType', "Monthly");
    }else if(this.selecetTT == 4)
    {
      payPalMod.append("ticketPrices", this.TicketPricess[3]._id)
      payPalMod.append('ticketType', "Yearly");
    }

    // this.TicketPricess.forEach(element => {
    //   if(element.TicketTypeId == this.selecetTT)
    //   {
    //     ticketMod.TicketPricesId = element.Id;
    //   }
    // });
    payPalMod.append('user', this.user._id);
    //ticketMod.append('paypal',this.dobavljanjePayPal.id );
   // let tpom = new TicketPomModel(ticketMod, payPalMod.PayementId);
    // this.ticketServ.addPayPal(payPalMod).subscribe(data => {
    // this.ticketServ.addTicket(ticketMod).subscribe(data => {
     
      
    //     window.alert("Ticket successfully bought!")
    //     //ShowTicketsComponent.returned.next(false);
    //     //this.router.navigateByUrl('/show_tickets');
    //     this.router.navigate(['home']);
    //   },
    //   err => {
    //     window.alert(err.error);
    //   })

     
    // },
    // err =>{
    //   window.alert(err.error)
    //   console.log(err);
    // });

    this.ticketServ.buyTicket(payPalMod).subscribe(data => {
      window.alert("Ticket successfully bought!")
        this.router.navigate(['home']);
    },
     err =>{
       window.alert(err.error.message)
       console.log(err);
    });
  }

  submitEmail(t:any, form:NgForm){
    if(t.Email != "" && t.Email != undefined && t.Email != null){
        
      this.mailZaSlanje = t.Email;
      
      this.initConfig();
    }
    form.reset();
  }

  // upisiKartuNew()
  // {

  //   let payPalMod = new PayPalModel(0);
  //   payPalMod.PayementId = this.dobavljanjePayPal.id;
  //   let pom = new Date(this.dobavljanjePayPal.create_time);
  //   pom.setHours(pom.getHours() + 2);
  //   payPalMod.CreateTime = pom;
  //   payPalMod.PayerEmail = this.dobavljanjePayPal.payer.email_address;
  //   payPalMod.PayerName = this.dobavljanjePayPal.payer.name.given_name;
  //   payPalMod.PayerSurname = this.dobavljanjePayPal.payer.name.surname;
  //   payPalMod.CurrencyCode = this.dobavljanjePayPal.purchase_units[0].amount.currency_code;
  //   payPalMod.Value = this.dobavljanjePayPal.purchase_units[0].amount.value;

  //   console.log("PayPal model: ", payPalMod);

  //   let ticketMod = new TicketModel("",new Date(),0,"",0,0);
  //   let b = new Date();
  //   b.setHours(b.getHours()+ 2);
  //   ticketMod.PurchaseTime = new Date(b);
    
  //   ticketMod.TicketTypeId = this.selecetTT;
  //   this.priceList.TicketPricess.forEach(element => {
  //     if(element.TicketTypeId == this.selecetTT)
  //     {
  //       ticketMod.TicketPricesId = element.Id;
  //     }
  //   });

  //   if(this.mailZaSlanje != "" && this.mailZaSlanje != undefined && this.mailZaSlanje != null){
        
  //     ticketMod.Name = this.mailZaSlanje;
  //   }else{
  //     ticketMod.Name = this.korisceniEmail;
  //   }
  //   let tpom = new TicketPomModel(ticketMod, payPalMod.PayementId);
  //   this.ticketServ.addPayPal(payPalMod).subscribe(data => {
  //     this.ticketServ.addTicket(tpom).subscribe(data => {
        
        

  //         this.ticketServ.SendMail(ticketMod).subscribe(resp =>{
  //           if(resp == 'Ok'){
  //            window.alert("Ticket successfully bought!")
  //             this.router.navigateByUrl('/home');
  //           }
  //           else{
  //             alert("Something went wrong");
  //             this.router.navigateByUrl('/home');
  //           }
  //         });
  //       },
  //       err => {
  //         window.alert(err.error);
  //       });

  //       window.alert("Ticket successfully bought!")
  //       this.router.navigate(['home']);
  //     },
  //     err =>{
  //       window.alert(err.error)
  //       console.log(err);
  //     });
      
      
  // }


  


  private initConfig(): void {
    
   
    var diffDays =this.priceWDiscount;
    console.log("cena u dinarima: ", diffDays);
    diffDays = diffDays/118;
    var str = diffDays.toFixed(2);
    console.log("cena u evrima: ", str);

    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      
      createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: str,
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: str
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: str,
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'horizontal',
          size:  'medium',
          shape: 'pill',
          color:  'blue' 
          
      },
      
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          //actions.order.get().then(details => {
            //  console.log('onApprove - you can get full order details inside onApprove: ', details);
         // });

      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point');
          console.log("paypal data: ", data);
          this.dobavljanjePayPal = data;
          if(this.neregKupVremKartu)
          {

            this.korisceniEmail  = data.payer.email_address;
           // this.upisiKartuNew();
          }
          else{
            this.UpisiKartu();
          }
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
      },
      onError: err => {
          window.alert("Something went wrong!");
          console.log('OnError', err);
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
      }
  };
}



 
}
