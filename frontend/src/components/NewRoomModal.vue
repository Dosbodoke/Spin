<template>
<Modal :modalActive="modalActive"
       @close="toggleModal()">
<h1>room</h1>
</Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
    name: "NewRoomModal",
    components: {
        Modal,
    },
    data() {
        return {
            modalActive: false,
        }
    },
    methods: {
        toggleModal() {
            this.modalActive = !this.modalActive
        }
    }
}
</script>

<style>

</style>