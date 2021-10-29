<template>
<SettingsModal ref="settingsmodal"/>
<NewRoomModal ref="newroommodal"/>
<div id="chat__sidebar">
    <div class="profile">
        <div class="contact">
            <img src="" alt="" class="contact__img">
            <div class="contact__info">
                <div class="contact__info__name">{{ username }}</div>
                <p class="contact__info__status">STATUS PLACEHOLDER TO SEE WHAT HAPPENS WHEN IS TOO BIG BLA BLA BLA BLA BLA BLA</p>
            </div>
        </div>
        <div class="profile__button profile__settings" @click="activateModal('settingsmodal')">
            <font-awesome-icon :icon="icons.faUserCog" class="profile__button__icon"></font-awesome-icon>
            <span>Settings</span>
        </div>
        <div class="profile__button newRoom" @click="activateModal('newroommodal')">
            <font-awesome-icon :icon="icons.faUserPlus" class="profile__button__icon"></font-awesome-icon>
            <span>Join New Room</span>
        </div>
    </div>
    <div v-for="room in rooms"
         :key="room.id"
         :ref="'room_' + room.id"
         class="contact"
         @click="this.$emit('connectroom', room.id)"
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
import SettingsModal from "@/components/SettingsModal.vue";
import NewRoomModal from "@/components/NewRoomModal.vue"

export default {
    name: 'ChatSidebar',
    emits: ["connectroom"],
    components: {
        FontAwesomeIcon,
        NewRoomModal,
        SettingsModal,
    },
    data () {
        return {
            addFriendUsername: '',
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
        activateModal(modal) {
            this.$refs[modal].toggleModal()
        },
        getRooms() {
            this.$store.dispatch('room/getRooms')
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

        &__button {
            cursor: pointer;

            &__icon {
                width: 2rem;
            }
        }
    }

    .new_room {
        color: rgb(255, 255, 255);
        background-color: transparent;
        border: 0;
        outline: none;

        &:focus {
            border-bottom: 2px solid #fff;
        }
    }
}

</style>