<template>
<div id="sidebar">
    <div class="profile">
        <div class="contact">
            <img src="" alt="" class="contact__img">
            <div class="contact__info">
                <div class="contact__info__name">{{ username }}</div>
                <p class="contact__info__status">STATUS PLACEHOLDER TO SEE WHAT HAPPENS WHEN IS TOO BIG BLA BLA BLA BLA BLA BLA</p>
            </div>
        </div>
        <div class="profile__settings">
            <font-awesome-icon :icon="icons.faUserCog" class="profile__icon"></font-awesome-icon>
            <span>Settings</span>
        </div>
        <div>
            <label for="addContact">
                <font-awesome-icon :icon="icons.faUserPlus" class="profile__icon"></font-awesome-icon>
            </label>
            <input type="text" placeholder="Contact Username" id="addContact" v-model="addFriendUsername" @keypress.enter="addContact">
        </div>
    </div>
    <div v-for="friend in friends"
        :key="friend.id"
        class="contact"
        @click="chatContact(friend.id)"
        >
        <img src="" alt="" class="contact__img">
        <div class="contact__info">
            <div class="contact__info__name">{{ friend.username }}</div>
            <p class="contact__info__status">STATUS PLACEHOLDER TO SEE WHAT HAPPENS WHEN IS TOO BIG BLA BLA BLA BLA BLA BLA</p>
        </div> 
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { faUserPlus, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getAPI } from '@/axios-api'

export default {
    name: 'ChatSidebar',
    components: {
        FontAwesomeIcon,
    },
    data () {
        return {
            addFriendUsername: '',
            icons: {
                'faUserPlus': faUserPlus,
                'faUserCog': faUserCog,
            },
            friends: []
        }
    },
    async created () {
        const contact = await this.getContact()
        this.friends = contact.friends
        this.connection = new WebSocket(
            'ws://'
            + window.location.hostname
            + ':8000/ws/chat/'
            + contact.id
            + '/'
        )

        this.connection.onopen = (event) => {
        }

        this.connection.onmessage = (event) => {
            console.log(event.data)
            console.log('message on ChatSidebar')
            console.log('user:', this.username)
        }

        this.connection.onclose = (event) => {
        }
    },
    methods: {
        async getContact() {
            let response = await getAPI.get(`api/contact/${this.username}/`, {
                headers: {Authorization: 'Bearer ' + this.accessToken}
            })
            return await response.data
        },
        async addContact () {
            let response = await getAPI.get(`api/contact/${this.username}/`, {
                headers: {Authorization: 'Bearer ' + this.accessToken}
            })
            console.log(await response.data)
        },
        chatContact(contactId) {
            this.$emit('chatContact', contactId)
        },
    },
    computed: mapState({
        username: state => state.account.username,
        accessToken: state => state.account.accessToken,
    })
}

</script>

<style lang="scss" scoped>

#sidebar {
    width: 300px;
    background-color: #37475e;

    &>* {
        padding: 10px;
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