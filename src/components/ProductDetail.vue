<template>
  <div v-if="product" class="container text-lg-start p-5">
    <h3><b>{{ product.name }}</b></h3>
    <hr>
    <div class="row">
      <div class="col-md-4">
        <img class="h-50" v-if="product.image" :src="require('@/assets/' + product.image)">
      </div>
      <div class="col-md-6">
        <b>{{ product.price }}</b><br><br>
        Description:
        <i>{{ product.description }}</i><br>
        <button class="btn btn-primary" @click="addToCart">Add</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRoute } from "vue-router";
import { addToCart1 } from "../cartHelper"; // Import the addToCart function from your cart helper file
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

export default {
  name: "ProductDetail",
  setup() {
    const route = useRoute();
    const product = ref(null);

    onMounted(async () => {
      const productId = route.params.id;
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        product.value = productSnapshot.data();
      }
    });

    const addToCart = async () => {
     
      // Thêm thông tin sản phẩm vào giỏ hàng trên Firebase
      try {
        await addDoc(collection(db, "cart"), { product: product.value });
        console.log("Đã thêm sản phẩm vào giỏ hàng trên Firebase");
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    
      // Call the addToCart function imported from your cart helper file
      // Pass the current product to addToCart function
      addToCart1(product.value);
    };

    return {
      product,
      addToCart,
    };
  },
};
</script>
