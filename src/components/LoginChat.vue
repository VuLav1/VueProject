<template>
    <div>
        <h2>Đăng nhập</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>

            </div>
           
            <p v-if="errMsg">
                {{ errMsg }}
            </p>
            <button @click="Login" type="submit">Đăng nhập </button>

        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
        return {
            // username: '',
            // password: '',
            errorMessage: ''
        };
    },
    methods: {
        Login() {
            this.$emit('login', this.username);
        }
    },
    setup() {
        const username = ref("");
        const email = ref("");
        const errMsg = ref();

        

        
        return {
            email,
            errMsg ,
            
            username,
    
            

        }
    }
}

</script>

<style scoped>
.error-message {
    color: red;
}
</style>