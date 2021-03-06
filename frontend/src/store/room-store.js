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
            state.rooms.push(...rooms)
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
            state.messages.push(message)
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
        newRoom(context, data) {
            return new Promise ((resolve, reject) => {
                getAPI.post(`api/rooms/${context.rootState.account.username}/`, data, {
                    headers: {Authorization: 'Bearer ' + context.rootState.account.accessToken},
                })
                  .then(response => {
                    context.commit('updateRooms', {"rooms": [response.data]})
                    resolve()
                  })
                  .catch(error => {
                      reject(error)
                  })
            })
        },
        async getMessages(context) {
            let accessToken = context.rootState.account.accessToken
            let response = await getAPI.get(`api/rooms/${context.state.currentRoomId}/messages`, {
                headers: {Authorization: 'Bearer ' + accessToken}
            })
            await context.commit('updateMessages', {
                'messages': await response.data
            })
            return response
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
        },
        pushNewRoom(context, room) {
            context.commit('updateRooms', {
                rooms: [room]
            })
        }
    },
    modules: {
    }
  }

export { roomStore }