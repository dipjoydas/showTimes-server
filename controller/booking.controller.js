const Shows =require('../models/shows')
const Tickets =require('../models/tickets')
const TempoTickets =require('../models/tempoTickets')
let timeout
const lockseat =async(req,res)=>{
   
    const ress =await Shows.findById(req.body.id)
    if(ress.screen.seats[req.body.index].locked ==false){
        ress.screen.seats[req.body.index].locked =true 
        ress.screen.seats[req.body.index].userEmail =req.user.email 
       
    
        await ress.save()
       timeout = setTimeout(async() => {
        const ress =await Shows.findById(req.body.id)
        ress.screen.seats[req.body.index].locked =false 
        ress.screen.seats[req.body.index].userEmail =''
      
        await ress.save()
      
        
       }, 40000);
      
        res.send({result:'seat selected'})

    }else {
      
        if( ress.screen.seats[req.body.index].userEmail == req.user.email){
            clearTimeout(timeout)
            ress.screen.seats[req.body.index].locked =false 
            ress.screen.seats[req.body.index].userEmail =''
            await ress.save()
            res.send({result:'seat selection cancel'})

           
        }else {
            res.send({result:'processed by other user'})
         
        }
        
    }

        

  

}
const checkeIsLocked =async (req,res)=>{
    const ress =await Shows.findById(req.params.id)
    if(ress.screen.seats[req.params.index].locked ==true){
        if( ress.screen.seats[req.params.index].userEmail == req?.user?.email){
            res.send({result:'locked'})

        }else {
            res.send({result:'process by other user'})
        }
        
    }else {
        res.send({result:'unlocked'})
    }

}
const unlock =async (req,res)=>{
    const ress =await Shows.findById(req?.params?.id)
    const selectedSeats = req.body
    selectedSeats.map((seat,index)=>{
        if(ress.screen.seats[seat.index].userEmail == req?.user?.email){
            ress.screen.seats[seat.index].locked = false 
            

        }
    })
    res.send({result:'done'})
   
}
const lockedForPayment =async (req,res)=>{
    clearTimeout(timeout)
    const ress =await Shows.findById(req?.params?.id)
    const selectedSeats = req?.body

    selectedSeats.map((seat,index)=>{
            ress.screen.seats[seat.index].locked = true  
            ress.screen.seats[seat.index].userEmail =req?.user?.email
    })
    await ress.save()
    res.send({result:'locked'})


   timeout = setTimeout(async() => {
        selectedSeats.map((seat,index)=>{
            ress.screen.seats[seat.index].locked =false 
        ress.screen.seats[seat.index].userEmail =''

        })
        await ress.save()
       
        
       }, 60000);


}
const tempoTicket =async (req,res)=>{
    const selectedSeats = req?.body
    let totalTicketPrice = 0
    selectedSeats.map((seat,index)=>{
        totalTicketPrice+=Number(seat.ticketPrice)
    })
    const ticket = {name:req.user.name,email:req.user.email,price:totalTicketPrice,tickets:selectedSeats, expiresAt: new Date(Date.now() + (60 * 10 * 1000))}
    
    const tempoTickets =new TempoTickets(ticket)
    const storedTempoTicketsInfo = await tempoTickets.save()
    
    res.send({result:storedTempoTicketsInfo})
}
const bookseat =async(req,res)=>{
    clearTimeout(timeout)
   
    const ress =await Shows.findById(req?.params?.id)
    const selectedSeats = req?.body.tickets
    let totalTicketPrice = 0
    selectedSeats.map((seat,index)=>{
        totalTicketPrice+=Number(seat.ticketPrice)
        ress.screen.seats[seat.index].booked =true
    })
    await ress.save()
  
   const ticketsData =req.body 
   delete ticketsData.expiresAt 
    const tickets = new Tickets(ticketsData)
    const storedTicketsInfo = await tickets.save()
  
    res.send({result:storedTicketsInfo._id})

}
const getTickets =async(req,res)=>{
    const tickets = await Tickets.find({'email': req?.user?.email}).select({tickets:1}).sort({timestamp:-1})
    res.send(tickets)


}
module.exports ={lockseat,bookseat,checkeIsLocked,unlock,lockedForPayment,tempoTicket,getTickets}