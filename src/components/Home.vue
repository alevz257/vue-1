<template>
 <div
    id="app"
    class="small-container"
  >
    <h1>Ticket</h1>

    <ticket-form/>
    <ticket-table
      :tickets="tickets"
      @delete:ticket="deleteTickets"
      @edit:ticket="editTickets"
    />
    
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TicketForm from './TicketForm.vue'
import TicketTable from './TicketTable.vue'


export default {
  name: 'App',
  components: {
    TicketForm,
    TicketTable
  },
  data(){
    return {
      tickets: [],
    }
  },
  methods: {
    editTickets(id, updatedTicket){
      this.tickets = this.tickets.map (ticket => ticket.id === id ? updatedTicket: ticket)
    },
    deleteTickets(id){
      this.tickets = this.tickets.filter(
        ticket => ticket.id !== id
      )
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.small-container {
    max-width: 680px;
  }
</style>
