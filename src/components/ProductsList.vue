<template>
  <div class="row">
    <div class="col-lg-4" v-for="product in products" :key="product.id">
      <div class="card-deck mt-3">
        <div class="card">
          <img
            v-if="product.image"
            :src="require('@/assets/' + product.image)"
            style="height: 400px"
          />
          <div class="card-body text-center">
            <h4 class="card-title">{{ product.name }}</h4>
            <p class="card-text">{{ product.price }} <u>đ</u></p>
            <button class="btn btn-primary"  @click="viewproductDetail(product.id)">See</button>
            <button class="btn btn-primary ms-1" @click="addProductToCart">AddtoCart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 
 
 <script>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "vue-router";
// import { useStore} from "vuex"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  setup() {
    const router = useRouter();
    const products = ref([]);
    onMounted(async () => {
      let productsCollection = await getDocs(collection(db, "products"));
      productsCollection.forEach((product) => {
        products.value.push({ ...product.data(), id: product.id });
      });
    });
    const viewproductDetail = (productId) => {
      router.push({ name: "ProductDetail", params: { id: productId } });
    };
    // const store = useStore();
    const productId = "your_product_id"; // ID của sản phẩm
    const userId = "user_id"; // ID của người dùng (có thể lấy từ store hoặc từ auth)

    // Hàm thêm sản phẩm vào giỏ hàng
    const addProductToCart = async () => {
      try {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
        const cartRef = db.collection("carts").doc(userId);
        const cartSnapshot = await cartRef.get();
        if (cartSnapshot.exists) {
          // Nếu giỏ hàng của người dùng đã tồn tại
          const cartData = cartSnapshot.data();
          const items = cartData.items || [];

          // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
          const existingItemIndex = items.findIndex(item => item.productId === productId);

          if (existingItemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
            items[existingItemIndex].quantity += 1;
          } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
            items.push({ productId, quantity: 1 });
          }

          // Cập nhật giỏ hàng trong Firestore
          await cartRef.update({ items });
        } else {
          // Nếu giỏ hàng của người dùng chưa tồn tại, tạo mới giỏ hàng
          await cartRef.set({ items: [{ productId, quantity: 1 }] });
        }

        // Thông báo thành công hoặc cập nhật UI nếu cần
        console.log("Đã thêm sản phẩm vào giỏ hàng thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    };

    return {
      products,
      viewproductDetail,
      addProductToCart
    };
    
  },
};
</script>
 <style>
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.order-table th {
  background-color: #f2f2f2;
}
</style>