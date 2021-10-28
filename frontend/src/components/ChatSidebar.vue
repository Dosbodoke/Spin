<template>
<Modal @close="toggleModal()" :modalActive="modalActive">
    <div class="modal-content">
        <h1>this is a Modal Header</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora sunt sit, porro suscipit aspernatur nobis. Fugit blanditiis quia aperiam magni illo delectus cum necessitatibus magnam, reiciendis ipsum laboriosam, natus impedit!</p>
    </div>
</Modal>
<div id="chat__sidebar">
    <div class="profile">
        <div class="contact">
            <img src="" alt="" class="contact__img">
            <div class="contact__info">
                <div class="contact__info__name">{{ username }}</div>
                <p class="contact__info__status">STATUS PLACEHOLDER TO SEE WHAT HAPPENS WHEN IS TOO BIG BLA BLA BLA BLA BLA BLA</p>
            </div>
        </div>
        <div class="profile__settings" @click="toggleModal()">
            <font-awesome-icon :icon="icons.faUserCog" class="profile__icon"></font-awesome-icon>
            <span>Settings</span>
        </div>
        <div>
            <label for="addContact">
                <font-awesome-icon :icon="icons.faUserPlus" class="profile__icon"></font-awesome-icon>
            </label>
            <input type="text" placeholder="Contact Username" v-model="addFriendUsername">
        </div>
    </div>
    <div v-for="room in rooms"
         :key="room.id"
         :ref="'room_' + room.id"
         class="contact"
         @click="connectToRoom(room.id)"
         :class="room.id == currentRoomId ? 'active' : ''">
        <img src="" alt="" class="contact__img">
        <div class="contact__info">
            <div class="contact__info__name">{{ getRoomName(room) }}</div>
            <p class="contact__info__status">STATUS PLACEHOLDER TO SEE WHAT HAPPENS WHEN IS TOO BIG BLA BLA BLA BLA BLA BLA</p>
        </div> 
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { faUserPlus, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

export default {
    name: 'ChatSidebar',
    components: {
        FontAwesomeIcon,
        Modal
    },
    data () {
        return {
            addFriendUsername: '',
            modalActive: ref(false),
            icons: {
                'faUserPlus': faUserPlus,
                'faUserCog': faUserCog,
            },
        }
    },
    async created () {
        this.getRooms()
        this.connection = new WebSocket(
            'ws://'
            + window.location.hostname
            + ':8000/ws/chat/'
            + this.username
            + '/'
        )

        this.connection.onopen = (event) => {
        }

        this.connection.onmessage = (event) => {
            console.log('message on ChatSidebar')
            console.log(event.data)
        }

        this.connection.onclose = (event) => {
        }
    },
    methods: {
        toggleModal() {
            this.modalActive = !this.modalActive
        },
        getRooms() {
            this.$store.dispatch('room/getRooms')
        },
        connectToRoom(contactId) {
            this.$emit('connectToRoom', contactId)
        },
        getRoomName(room) {
            if ( room.is_group === true ){
                return room.room_name
            } 

            return room.participants.find(user => user.username != this.username).username
        }
    },
    computed: mapState({
        username: state => state.account.username,
        accessToken: state => state.account.accessToken,
        rooms: state => state.room.rooms,
        currentRoomId: state => state.room.currentRoomId
    })
}

</script>

<style lang="scss" scoped>

#chat__sidebar {
    width: 300px;
    background-color: #37475e;

    &>* {
        padding: 10px;
    }

    .active {
        background: #485f80;
    }

    .contact {
        display: flex;
        align-items: center;
        gap: 10px;

        &__img {
            min-width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 0;
            background-color: red;
        }

        &__info {
            overflow: hidden;

            &__name {
                line-height: 100%;
            }

            &__status {
                color: rgba($color: #ffffff, $alpha: .6);
                margin: 0;
                font-size: .75rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        &:hover {
            background-color: #485f80;
            cursor: pointer;
        }
    }

    .profile {
        background-color: #1a212c;

        .contact:hover{
            background-color: #1a212c;
            cursor: default;
        }

        &__settings {
            margin-top: 10px;
            cursor: pointer;
        }

        &__icon {
            padding-right: 10px;
        }

        #addContact {
            color: rgb(255, 255, 255);
            background-color: transparent;
            border: 0;
            outline: none;

            &:focus {
                border-bottom: 2px solid #fff;
            }
        }
    }
}

</style>