<template>
<Modal :modalActive="modalActive"
       @close="toggleModal()">
    <template v-slot:title>
        <h1>Join Room</h1>
    </template>
    <template v-slot:content>
        <div class="form_container">
            <h2>Direct contact</h2>
            <p>A private room to chat direct with someone.</p>
            <form @submit.prevent="newRoom('direct')">
                <div>
                    <label for="direct_username">Contact Username:</label>
                    <input id="direct_username" type="text" v-model="directUsername">
                </div>
                <PrimaryButton class="form_button">Chat now!</PrimaryButton>
            </form>
        </div>
        <div class="form_container">
            <h2>Create Group</h2>
            <p>A room where you can chat with multiple persons.</p>
            <form @submit.prevent="newRoom('group')">
                <div>
                    <label for="room_name">Room Name:</label>
                    <input id="room_name" type="text" v-model="roomName">
                </div>
                <div>
                    <label for="user_list">Participants:</label>
                    <input id="user_list" 
                           type="text"
                           @keypress.enter.prevent=""
                           @keyup="userListInputHandler"
                           v-model="groupUsername">
                </div>
                <div v-for="username in groupUsernameList"
                     :key="username">
                     {{username}}
                     </div>
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
            groupUsername: null,
            groupUsernameList: [],
            roomName: null,
        }
    },
    methods: {
        toggleModal() {
            this.modalActive = !this.modalActive
        },
        newRoom(type) {
            let payload = {
                "participants": [this.username],
                "room_name": "",
                "is_group": false,
            }
            if (type === 'direct') {
                payload.participants.push(this.directUsername);
            }

            if (type === 'group') {
                payload.participants.push(...this.groupUsernameList);
                payload.is_group = true;
                payload.room_name = this.roomName
            }

            this.$store.dispatch('room/newRoom', payload)
              .catch(error => {
                  console.log('error')
                  console.log(error.message)
              })
        },
        userListInputHandler(event) {
            if ([188, 13].includes(event.keyCode)) {
                this.groupUsernameList.push(this.groupUsername.replace(',', ''))
                this.groupUsername = ""
            }
        }
    },
    computed: mapState({
        username: state => state.account.username,
    })
}
</script>

<style lang="scss" scoped>
.form_container {

    &:last-of-type {
        margin-top: 1.5rem;
    }

    .form_button {
        display: block;
        margin-top: .8rem;
        width: 150px;
    }
}
</style>