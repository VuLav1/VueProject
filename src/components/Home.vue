<template>
  <div>
    <h2>Danh sách đơn hàng</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Tên khách hàng</th>
          <th>Tên sản phẩm</th>
          <th>Phương thức thanh toán</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.buyerInfo.name }}</td>
          <td ><span v-for="item in order.items" :key="item.id">{{ item.name + ',' }}</span></td>
          <td>{{ order.buyerInfo.payment }}</td>
          <td @click="viewOrderDetail(order.id)"><span class="badge text-bg-primary"><i class="bi bi-printer"></i></span></td>
        </tr>
      </tbody>
    </table>
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
    const orders = ref([]);

    onMounted(async () => {
      let ordersCollection = await getDocs(collection(db, "orders"));
      ordersCollection.forEach((order) => {
        orders.value.push({ ...order.data(), id: order.id });
      });
    });
    const viewOrderDetail = (orderId) => {
      router.push({ name: "OrderDetail", params: { id: orderId } });
    };
    return {
      orders,
      viewOrderDetail,
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