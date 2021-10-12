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
            state.messages = messages.reverse()
        },
        appendMessage(state, { message }) {
            console.log(state.messages)
            console.log('appendMessage')
            console.log(message)
            state.messages.push(message)
            console.log(state.messages)

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
            let accessToken = context.rootState.account.accessToken
            let response = await getAPI.get(`api/rooms/${context.state.currentRoomId}/messages`, {
                headers: {Authorization: 'Bearer ' + accessToken}
            })
            context.commit('updateMessages', {
                'messages': await response.data
            })
        },
        async postMessage(context, data) {
            let accessToken = context.rootState.account.accessToken
            let response = await getAPI.post(`api/rooms/${context.state.currentRoomId}/messages/`, data ,{
                headers: {Authorization: 'Bearer ' + accessToken},
            })
            return await response.data
        },
        updateRoomId(context, data) {
            context.commit('updateCurrentRoom', {
                "roomId": data.roomId,
            })
        },
        addMessage(context, message_json) {
            const message = JSON.parse(message_json)
            context.commit('appendMessage', {
                'message': message
            })
        }
    },
    modules: {
    }
  }

export { roomStore }