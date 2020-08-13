<template>
  <div id="app">
    <br>
    <br>
    <header>
    <h1>  Table of Users    </h1>
    </header>
    <br>
    <ModalWindow  v-bind:user='user' :companies='companies' @save='save'/>
    <UserList v-bind:users="users" />
    </div>
</template>

<script>
import UserList from '@/components/UserList'
import ModalWindow from '@/components/ModalWindow'
import { fetchUsers, fetchCompanies, saveUser, getUser } from '@/services/User'

export default {
  name: 'app',
  data() {
    return {
      users: [],
      user: {},
      companies:[]
      };
  },
  async created() {
    this.users = await fetchUsers(this.users);
    this.companies = await fetchCompanies(this.companies);
   }, 
  components:{
    UserList,
    ModalWindow
  },
  methods: {
    async save (user, photoFile) {
      this.user = await saveUser(user, photoFile)
      console.log('(app.vue) this.user is : ', this.user)
      this.fetchUsers();
    },
    async fetchUsers () {
      console.log('fetch')
      this.users = await fetchUsers() 
    },
    async edit (user) {
      this.user = await getUser(user._id) 
      // this.fetchUsers();
    },
    createNew() {
        this.user = { };
        return this.user;
    }
  }      
  }
  
</script>
<style >
header {
  margin-left: 40%;
}
</style>