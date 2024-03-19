<template>
  <div class="container">
    <h2>Giỏ hàng của bạn</h2>
    <div v-if="cartItems.length === 0">
      <p>Giỏ hàng của bạn trống.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>Giá: {{ item.price }}</p>
        <p>Số lượng: {{ item.quantity }}</p>
        <!-- Các thông tin khác của sản phẩm -->
      </div>
      <button @click="openCheckoutModal">Thanh toán</button>
    </div>

    <div :class="{ 'is-active': isModalOpen }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <!-- Form nhập thông tin người mua -->
        <form @submit.prevent="checkout">
          <!-- Các trường nhập thông tin người mua -->
          <input
            type="text"
            v-model="buyerInfo.name"
            placeholder="Tên người mua"
          />
          <input
            type="email"
            v-model="buyerInfo.email"
            placeholder="Email người mua"
          />
          <input
            type="text"
            v-model="buyerInfo.address"
            placeholder="Địa chỉ"
          />
          <select v-model="buyerInfo.payment" name="payment">
            <option value="Bank transfer payment">Bank transfer payment</option>
            <option value="Cash payment">Cash payment</option>
          </select>
          <!-- Các trường thông tin khác nếu cần -->

          <!-- Hiển thị thông tin giỏ hàng -->
          <div v-for="item in cartItems" :key="item.id">
            <h3>{{ item.name }}</h3>
            <p>Số lượng: {{ item.quantity }}</p>
            <!-- Các thông tin khác của sản phẩm -->
          </div>

          <!-- Nút xác nhận thanh toán -->
          <button type="submit">Thanh toán</button>
        </form>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closeModal"
      ></button>
    </div>
  </div>
</template>
  
  <script>
import { computed, ref } from "vue";
import { cartItems } from "../cartHelper"; // Import the cartItems from your cart helper file
import { db } from "../firebase"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore"; // Import necessary Firestore methods

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cart",
  setup() {
    // Sử dụng computed property để theo dõi thay đổi trong giỏ hàng
    const items = computed(() => cartItems.value);
    const isModalOpen = ref(false); // Biến để kiểm soát trạng thái của modal
    const buyerInfo = ref({}); // Thông tin người mua

    // Mở modal thanh toán
    const openCheckoutModal = () => {
      isModalOpen.value = true;
    };
    // Đóng modal
    const closeModal = () => {
      isModalOpen.value = false;
    };
    // Hàm xử lý khi người dùng nhấp vào nút thanh toán trong modal
    const checkout = async () => {
      // Tạo một đối tượng chứa dữ liệu giỏ hàng để đưa lên Firebase
      const cartData = {
        items: cartItems.value,
        buyerInfo: buyerInfo.value,
        // Các trường thông tin khác của giỏ hàng nếu cần
      };

      try {
        // Thêm dữ liệu giỏ hàng vào Firestore
        const docRef = await addDoc(collection(db, "orders"), cartData);
        console.log("Giỏ hàng đã được đưa lên Firebase với ID:", docRef.id);

        // Đóng modal sau khi thanh toán thành công
        closeModal();
      } catch (error) {
        console.error("Lỗi khi đưa dữ liệu giỏ hàng lên Firebase:", error);
      }
    };

    return {
      cartItems: items,
      isModalOpen,
      buyerInfo,
      openCheckoutModal,
      closeModal,
      checkout,
    };
  },
};
</script>
  

  