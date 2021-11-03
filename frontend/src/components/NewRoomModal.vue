<template>
<Modal :modalActive="modalActive"
       @close="toggleModal()">
    <template v-slot:title>
        <h1>Join Room</h1>
    </template>
    <template v-slot:content>
        <div>
            <h2>Direct contact</h2>
            <p>Start a chat with semeone.</p>
            <form @submit.prevent="newRoom('direct')">
                <label for="direct_username">Contact Username:</label>
                <input id="direct_username" type="text" v-model="directUsername">
                <PrimaryButton class="form_button">Chat now!</PrimaryButton>
            </form>
        </div>
        <div>
            <h2>Create Group</h2>
            <p>Crate a room where you can chat with multiple persons.</p>
            <form @submit.prevent="newRoom('group')">
                <label for="user_list">Room Name:</label>
                <input id="user_list" type="text">
                <PrimaryButton class="form_button">Create group</PrimaryButton>
            </form>
        </div>
    </template>
</Modal>
</template>

<script>
import { mapState } from 'vuex';
import Modal from "@/components/Modal.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

export default {
    name: "NewRoomModal",
    components: {
        Modal,
        PrimaryButton,
    },
    data() {
        return {
            modalActive: false,
            directUsername: null,
        }
    },
    methods: {
        toggleModal() {
            this.modalActive = !this.modalActive
        },
        newRoom(type) {
            let data
            if (type == 'direct') {
                data = {
                    'participants': [this.username, this.directUsername,]
                }
            }

            if (type == 'group') {
                console.log('INSIDE GROUP')
                return
            }
            this.$store.dispatch('room/newRoom', data)
              .catch(error => {
                  console.log(error.message)
              })
        }
    },
    computed: mapState({
        username: state => state.account.username,
    })
}
</script>

<style lang="scss" scoped>
.form_button {
    display: block;
    margin-top: 1rem;
}
</style>