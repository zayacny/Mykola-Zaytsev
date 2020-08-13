<template>
  <div>
    <b-modal centered ok-title="Save" @ok="saveButtonClick(user)"  id="modal-1" title="User Form" >
      <b-form-input block v-model="user.name" type="text" value="user.name" placeholder="Write the name here" ></b-form-input>
      <br>
      <b-form-file v-model="photoFile" @change="handleFileUpload" browse-text="Load Photo"></b-form-file>
        <p class="p">  Select Company : </p>
        <b-form-select v-model="user.company" value-fild="_id"  > 
           <b-form-select-option 
             v-for="comp in companies" 
             :key="comp._id"
             :value="comp._id">
               {{comp.name}}
           </b-form-select-option> 
        </b-form-select>
    </b-modal>
  </div>
</template>

<script>
import { edit, serverUpload } from '@/services/User'
export default {
  props : ['user', 'companies'],
  data(){
    return {
      photoFile: null
    }
  },
  methods:{
      async saveButtonClick(user) {
        if (user._id) { 
          console.log('Есть user ID  делаем Edit', user)
          await edit(user, this.photoFile);
          this.$parent.fetchUsers();
        } 
        else {
          console.log('Новый User - делаем Save', user)
           await this.$parent.save(user,this.photoFile) 
        }
        console.log('[ModalWindow.vue] Завершили Edit/SaveUser', this.user)
        serverUpload(this.photoFile, this.user) 
    },
    handleFileUpload(event) {
        this.photoFile = event.target.files[0]  
    }
  },
}
</script>
<style scoped>
.p {
  padding-top: 30px;
}
</style>