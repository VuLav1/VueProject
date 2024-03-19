<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <LoginChat v-if="!showChatView" @login="getUsername" />
        <Chat v-if="showChatView" :username="username"/>
    </div>
</template>

<script>
// @ is an alias to /src
import LoginChat from "@/components/LoginChat.vue";
import Chat from "@/components/Chat.vue";
export default {
    name: "LoginView",
    components: {
        LoginChat,
        Chat
    },
    data(){
        return{
            showChatView: false,
            username: "",
        }
    },
    methods: {
        getUsername(username){
            this.username = username;
            this.showChatView = true;
        }
    },
};
</script>