<template>
  <div class="row">
    <div class="col-lg-4" v-for="product in products" :key="product.id">
      <div class="card-deck mt-3">
        <div class="card">
          <img
            v-if="product.image"
            :src="require('@/assets/' + product.image)"
            style="width: 50px; height: 50px"
          />
          <div class="card-body text-center">
            <h4 class="card-title">{{ product.name }}</h4>
            <p class="card-text">{{ product.price }}</p>
            <button class="btn btn-primary">See</button>
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
      router.push({ name: "productDetail", params: { id: productId } });
    };
    return {
      products,
      viewproductDetail,
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