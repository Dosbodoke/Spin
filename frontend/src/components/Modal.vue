<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
            <div v-show="modalActive" class="modal-inner">
                <div class="header">
                    <slot name="title"/>
                    <font-awesome-icon :icon="icons.faTimesCircle" class="close"  @click="this.$emit('close')"></font-awesome-icon>
                </div>
                <div class="content">
                    <slot name="content" />
                </div>
            </div>
        </transition>
    </div>
  </transition>
</template>

<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name: "Modal",
    components: {
        FontAwesomeIcon,
    },
    props: {modalActive: {
        required: true,
        type: Boolean,
        default: false,
    }},
    data () {
        return {
            icons: {
                'faTimesCircle': faTimesCircle,
            },
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity .3s cubic-bezier(.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all .3s cubic-bezier(.52, 0.02, 0.19, 1.02) .15s;
}

.modal-animation-inner-leave-active {
    transition: all .3s cubic-bezier(.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-animation-inner-leave-to {
    transform: scale(0.8);
}

.modal {
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7);

    .modal-inner {
        position: relative;
        max-height: 90%;
        overflow-y: auto;
        max-width: 640px;
        width: 80%;
        background-color: #323232;
        padding: 1rem;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: .5rem;
            border-bottom: 2px solid #ffffff;
            font-size: 1.3rem;
        }

        .close {
            cursor: pointer;
            width: 45px;
            height: 45px;
            color: hsla(0, 100%, 58%, 0.615);

            &:hover {
                color: hsla(0, 100%, 58%, 0.915);
            }
        }
    }
}
</style>