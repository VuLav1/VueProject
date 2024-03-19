<template>
    <div>
        <h2>Chat View</h2>
        <h2>Xin chào {{ username }}</h2>
        <ul>ss
            <li v-for="msg in messages" :key="msg">
                <span>{{ msg.username }}: </span>
                <span>{{ msg.message }}</span>
            </li>
            <input type="text" v-model="message">
            <button @click="sendMessage">Gửi</button>
        </ul>
    </div>
</template>



<script>
import { database, ref, push, onValue } from "../firebase";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Chat",
    props: ["username"],
    data() {
        return {
            message: "",
            messages: [],
        }
    },
    mounted() {
        this.getMessage();
    },
    methods: {
        sendMessage() {
            console.log("sendMessage")
            push(ref(database, "message"), {
                username: this.username,
                message: this.message
            }).then(() => {
                // Xóa giá trị của message sau khi gửi tin nhắn thành công
                this.message = "";
            }).catch((error) => {
                console.error("Lỗi khi gửi tin nhắn: ", error);
            });
        },
        getMessage() {
            onValue(ref(database, "message"), (data) => {
                if (data.exists()) {
                    this.messages = [];
                    data.forEach((d) => {
                        this.messages.push(d.val())
                    })
                } else {
                    console.log("No data available");
                }
            })
        }

    }
};
</script>
<style></style>