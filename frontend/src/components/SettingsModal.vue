<template>
<Modal :modalActive="modalActive"
       @close="toggleModal()">
<h1>settings</h1>
</Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
    name: "SettingsModal",
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