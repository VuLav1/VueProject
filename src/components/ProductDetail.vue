<template>
  <div class="container text-lg-start p-5">
    <h3><b>{{product.name}}</b></h3>
    <hr>
    <div class="row">
        <div class="col-md-4">
            <img class="h-50"  v-if="product.image"
            :src="require('@/assets/' + product.image)">
        </div>
        <div class="col-md-6">
            <b >{{product.price}}</b><br><br>
            Description:
            <i>{{product.description}}</i><br>
            <button class="btn btn-primary">Add</button>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRoute } from "vue-router";

export default {
  name: "ProductDetail",
  setup() {
    const route = useRoute();
    const product = ref([]);
    onMounted(async () => {
      const productId = route.params.id;
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        product.value = productSnapshot.data();
      }
    });
    return {
      product,
    };
  },
};
</script>