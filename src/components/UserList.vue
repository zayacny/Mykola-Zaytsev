<template>
 <div>
    <b-button class="btn_create" size="lg" variant="warning" v-b-modal.modal-1 @click="createNew"> Create new User </b-button>
    <br>
    <br>
    <b-table-simple head-variant='light' table-variant="success"  :small="true" >
          <b-thead>
            <b-th>User ID</b-th>
            <b-th>User Name</b-th>
            <b-th>Name Company</b-th>
            <b-th>User photo</b-th>
            <b-th>Options</b-th>
          </b-thead>
          <b-tr v-for="user in users" :key="user._id" > 
              <b-td>{{user._id}}</b-td>
              <b-td>{{user.name}}</b-td>
              <b-td>{{user.company.name}}</b-td>
              <b-td> 
                <b-img width='auto' height='45px' :src="'http://localhost:3000/'+user.photoName"> </b-img>
                </b-td>
              <b-td>
                <div>
                  <b-button variant="success" v-b-modal.modal-1 @click="editClick(user)"> Edit </b-button>
                  <b-button variant="danger" @click="deletClick(user._id)"> Delete </b-button>
                </div>
              </b-td>
          </b-tr>
        </b-table-simple>
      </div>   
</template>

<script>
import { del } from '@/services/User'
export default {
  data(){ 
    return { 
      
     };
  }, 
  props: ['users'],
  methods:{
      async editClick(user) {
      this.$parent.edit(user);
      },
      async deletClick(userID) {
        await del(userID);
        this.$parent.fetchUsers()
      },
      createNew() {
          this.$parent.createNew();
        }
    }
}
</script>
<style >
.btn_create {
  margin-left: 100px;
}
</style>