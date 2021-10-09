import { getAPI } from '@/axios-api'

const roomStore = {
    namespaced: true,
    state: {
        rooms: [],
        messages: [],
        currentRoomId: null,
    },
    mutations: {
        updateRooms(state, { rooms }) {
            state.rooms = rooms
        },
        updateMessages(state, { messages }) {
            state.messages = messages
        },
        updateCurrentRoom(state, { roomId }) {
            state.currentRoomId = roomId
        },
        updateMessages(state, { messages }) {
            state.messages = messages
        }
    },
    actions: {
        async getRooms(context) {
            let accessToken = context.rootState.account.accessToken
            let username = context.rootState.account.username
            let response = await getAPI.get(`api/rooms/${username}`, {
                headers: {Authorization: 'Bearer ' + accessToken}
            })
            context.commit('updateRooms', {
                "rooms": await response.data,
            })
        },
        async getMessages(context) {
            console.log('waiting getMessages')
            let accessToken = context.rootState.account.accessToken
            let response = await getAPI.get(`api/rooms/${context.state.currentRoomId}/messages`, {
                headers: {Authorization: 'Bearer ' + accessToken}
            })
            context.commit('updateMessages', {
                'messages': await response.data
            })
        },
        updateRoomId(context, data) {
            context.commit('updateCurrentRoom', {
                "roomId": data.roomId,
            })
        }

    },
    modules: {
    }
  }

export { roomStore }