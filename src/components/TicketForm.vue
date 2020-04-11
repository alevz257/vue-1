<template>
  <section class="content">
  <div id="ticket-form">
    <form @submit.prevent="handleSubmit" class="content__form contact-form">
      <div class="contact-form__input-group">
      <label class="contact-form__label">Sender name</label>
      <input
        ref="first"
        type="text"
        class= "contact-form__input contact-form__input--text"
        v-model="ticket.sendername"
        @focus="clearStatus"
        @keypress="clearStatus"
      >
      </div>
      <div class="contact-form__input-group">
      <label class="contact-form__label">Sender Email</label>
      <input
        type="text"
        class= "contact-form__input contact-form__input--text"
        v-model="ticket.senderemail"
        @focus="clearStatus"
      >
      </div>
      <div class="contact-form__input-group">
      <label class="contact-form__label">Message</label>
      <textarea
        type="textarea"
        class= "contact-form__input contact-form__input--textarea"
        v-model="ticket.message"
        placeholder="Please define your issue"
        rows="6"
        cols="65"
        @focus="clearStatus"
      ></textarea>
      </div>
      <p
        v-if="error && submitting"
        class="error-message"
      >❗Please fill out all required fields</p>
      <p
        v-if="success"
        class="success-message"
      >✅ Ticket has been sent</p>
      <button class="contact-form__button" type="submit">Add Tickets</button>
    </form>
  </div>
  </section>
</template>

<script>
export default {
  name: 'ticket-form',
  data() {
    return {
      error: false,
      submitting: false,
      success: false,
      ticket: {
        sendername: '',
        senderemail: '',
        message: '',
      }
    }
  },
  computed: {
    invalidName() {
      return this.ticket.sendername === ''
    },
    invalidEmail() {
      return this.ticket.senderemail === ''
    },
  },
  methods: {
    handleSubmit() {
      this.clearStatus()
      this.submitting = true
      if (this.invalidName || this.invalidEmail) {
        this.error = true
        return
      }
      this.$emit('add:ticket', this.ticket)
      this.$refs.first.focus()
      this.ticket = {
        sendername: '',
        senderemail: '',
        message: '',
      }
      this.success = true
      this.error = false
      this.submitting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    }
  }}
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}

[class*="-message"] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}

/* additional for ticketing css */

/* A simple reset. */
*,::before,::after {
  margin: 0;
  box-sizing: border-box;
  }
  
  /* Heydon Pickering’s lobotomized owl. Details: https://bit.ly/1H7MXUD */
  *+* {
  margin-top: 16px;
  margin-top: 1rem;
  }
  
  /* Set up fonts, colors and all that jazz. */
  body {
  background: #f9fdfe;
  color: #686a69;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  line-height: 1.75;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  
  /* Headings use a different font because they’re hipsters. */
  h1,h2 {
  color: #2a2f2c;
  font-family: Lato, sans-serif;
  font-weight: 300;
  line-height: 1.125;
  }
  
  /* Set up general layout rules for outer containers. */
  .content,.results {
  width: 90vw;
  max-width: 550px;
  margin: 8vh auto;
  }
  
  .content__heading {
    font-size: 125%;
  }
  
  .content__lede {
    margin-top: 8px;
    margin-top: 0.5rem;
    font-size: 87.5%;
  }
  
  .results__heading {
    font-size: 110%;
  }
  
  .results__display-wrapper {
    margin-top: 16px;
    margin-top: 1rem;
    padding: 8px 16px;
    padding: 0.5rem 1rem;
    background: #f9fdfe;
    border: 1px solid #cdcfcf;
    overflow-x: scroll;
  }
  
  .contact-form {
  position: relative;
  display: block;
  margin: 0;
  padding: 16px 0 32px;
  padding: 1rem 0 2rem;
  border-top: 1px solid #cdcfcf;
  border-bottom: 1px solid #cdcfcf;
  overflow: hidden;
  }
  
  .contact-form__input-group {
    margin-top: 4px;
    margin-top: 0.25rem;
    padding: 8px 16px;
    padding: 0.5rem 1rem;
  }
  
  .contact-form__label {
    display: block;
    color: #414643;
    font-family: Lato, sans-serif;
    font-size: 75%;
    line-height: 1.125;
  }
  
  .contact-form__label--checkbox-group {
      display: inline-block;
      margin-right: 16px;
      margin-right: 1rem;
      font-size: 75%;
    }
  
  .contact-form__label--checkbox,.contact-form__label--radio {
      display: inline-block;
      margin-left: 4px;
      margin-left: 0.25rem;
    }
  
  .contact-form__input {
    display: block;
    margin-top: 0;
    padding: 8px 12px;
    padding: 0.5rem 0.75rem;
    border: 1px solid #cdcfcf;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-size: 1rem;
    transition: 150ms border-color linear;
  }
  
  .contact-form__input--checkbox,.contact-form__input--radio {
      display: inline-block;
      width: auto;
    }
  
  .contact-form__input--checkbox~.contact-form__input--checkbox, .contact-form__input--radio~.contact-form__input--radio {
        margin-left: 16px;
        margin-left: 1rem;
      }
  
  .contact-form__input:focus,.contact-form__input:active {
      border-color: #686a69;
      outline: 0;
    }
  
  .contact-form__button {
    display: block;
    margin: 8px 16px 0;
    margin: 0.5rem 1rem 0;
    padding: 0 16px 2px;
    padding: 0 1rem 0.125rem;
    background-color: #686a69;
    border: 0;
    color: #f9fdfe;
    font-family: lato, sans-serif;
    font-size: 100%;
    letter-spacing: 0.05em;
    line-height: 1.5;
    text-transform: uppercase;
    transition: 150ms all linear;
  }
  
  .contact-form__button:hover,.contact-form__button:active,.contact-form__button:focus {
      background: #2a2f2c;
      cursor: pointer;
      outline: 0;
    }

</style>