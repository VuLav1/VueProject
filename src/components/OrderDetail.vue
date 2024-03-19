<template>
  <div class="order-detail">
    <h2>Chi tiết đơn hàng</h2>
    <table class="order-table">
      <tbody>
        <tr>
          <td><strong>Mã đơn hàng:</strong></td>
          <td>{{ order.orderId }}</td>
        </tr>
        <tr>
          <td><strong>Hình:</strong></td>
          <td>
            <img
              v-if="order.imageUrl"
              :src="require('@/assets/' + order.imageUrl)"
              alt="Product Image"
              style="width: 50px; height: 50px"
            />
          </td>
        </tr>
        <tr>
          <td><strong>Ngày đặt hàng:</strong></td>
          <td>{{ order.orderDate }}</td>
        </tr>
        <tr>
          <td><strong>Tên khách hàng:</strong></td>
          <td>{{ order.customerName }}</td>
        </tr>
        <tr>
          <td><strong>Địa chỉ giao hàng:</strong></td>
          <td>{{ order.shippingAddress }}</td>
        </tr>
        <tr>
          <td><strong>Tên sản phẩm:</strong></td>
          <td>{{ order.productName }}</td>
        </tr>
        <tr>
          <td><strong>Số lượng:</strong></td>
          <td>{{ order.quantity }}</td>
        </tr>
        <tr>
          <td><strong>Giá tiền:</strong></td>
          <td>{{ order.price }}</td>
        </tr>
        <tr>
          <td><strong>Mô tả sản phẩm:</strong></td>
          <td>{{ order.productDescription }}</td>
        </tr>
        <tr>
          <td><strong>Trạng thái đơn hàng:</strong></td>
          <td>{{ order.orderStatus }}</td>
        </tr>
        <tr>
          <td><strong>Phương thức thanh toán:</strong></td>
          <td>{{ order.paymentMethod }}</td>
        </tr>
        <!-- Thêm các trường thông tin khác của đơn hàng vào đây -->
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRoute } from "vue-router";

export default {
  name: "OrderDetail",
  setup() {
    const route = useRoute();

    const order = ref([]);

    onMounted(async () => {
      const orderId = route.params.id;
      const orderRef = doc(db, "orders", orderId);
      const orderSnapshot = await getDoc(orderRef);
      if (orderSnapshot.exists()) {
        order.value = orderSnapshot.data();
      }
    });

    return {
      order,
    };
  },
};
</script>

<style scoped>
.order-detail {
  max-width: 800px;
  margin: 0 auto;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table td,
.order-table th {
  padding: 8px;
  border: 1px solid #ddd;
}

.order-table th {
  background-color: #f2f2f2;
}
.order-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.order-table tbody tr:hover {
  background-color: #f2f2f2;
}

/* Hiệu ứng hover */
.order-table tbody tr:hover {
  background-color: #f5f5f5;
}

/* Hiệu ứng chuyển động */
.order-table tbody tr {
  transition: background-color 0.3s ease;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden; /* Đảm bảo border-radius được áp dụng */
}
.order-table tbody tr:hover td {
  background-color: #f5f5f5;
}

.order-table td,
.order-table th {
  padding: 12px 16px;
}
.order-table tbody td {
  color: #555;
}
</style>
