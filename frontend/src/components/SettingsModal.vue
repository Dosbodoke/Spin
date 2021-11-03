<template>
<Modal :modalActive="modalActive"
       @close="toggleModal()">
    <template v-slot:title>
        <h1>Settings</h1>
    </template>
    <template v-slot:content>
        <div>teste</div>
    </template>
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