<template>
  <div id="ticket-table">
    <p v-if="tickets.length < 1"> No Tickets </p>
    <table v-else>
      <thead>
        <tr>
          <th>Sender name</th>
          <th>Sender email</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td v-if="editing === ticket.id">
            <input type="text" v-model="ticket.sendername" />
          </td>
          <td v-else>{{ticket.sendername}}</td>
          <td v-if="editing === ticket.id">
            <input type="text" v-model="ticket.senderemail" />
          </td>
          <td v-else>{{ticket.senderemail}}</td>
          <td v-if="editing === ticket.id">
            <textarea 
              placeholder="Please define your issue"
              rows="6"
              cols="65"
              v-model="ticket.message"
            ></textarea>
          </td>
          <td v-else>{{ticket.message}}</td>
          <td v-if="editing === ticket.id">
            <button @click="editTicket(ticket)">Save</button>
            <button @click="editing = null">Cancel</button>
          </td>
          <td v-else>
            <button @click="editMode(ticket.id)">Edit</button>
            <button @click="$emit('delete:ticket', ticket.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ticket-table',
    props: {
        tickets: Array,
    },
    data() {
      return {
        editing: null,
      }
    },
    methods: {
      editMode(id){
        this.editing = id
      },
      editTicket(ticket){
        if(ticket.sendername === '' || ticket.senderemail === '') return
        this.$emit('edit:ticket', ticket.id, ticket)
        this.editing = null
      }
    }
  }
</script>

<style scoped></style>