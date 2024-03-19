
<template>
  <div class="container">
    <h2 class="text-center">Quản lý đơn hàng</h2>

    <!-- Hiển thị danh sách đơn hàng -->
    <table class="order-table mb-3">
      <thead>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Tên khách hàng</th>
          <th>Địa chỉ giao hàng</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá tiền</th>
          <th>Mô tả sản phẩm</th>
          <th>Trạng thái đơn hàng</th>
          <th>Phương thức thanh toán</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="order-item">
          <td>{{ order.id }}</td>
          <td>{{ order.buyerInfo.name }}</td>
          <td>{{ order.buyerInfo.address }}</td>
          <td>
            <ul>
              <li v-for="item in order.items" :key="item.id">
                <img
                  v-if="item.image"
                  :src="require('@/assets/' + item.image)"
                  alt="Product Image"
                  style="width: 50px; height: 50px"
                />
                {{ item.name }}
              </li>
            </ul>
          </td>
          <td  v-for="item in order.items" :key="item.id">{{ item.quantity }}</td>
          <td>{{ order.items.price }}</td>
          <td>{{ order.productDescription }}</td>
          <td>{{ order.orderStatus }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>
            <button
              @click="editOrder(order)"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#editOrderModal"
            >
              Sửa
            </button>
            <button @click="deleteOrder(order.id)" class="btn btn-danger">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form sửa đơn hàng -->
    <div v-if="editingOrder" class="edit-order-form">
      <h2>Sửa đơn hàng</h2>
      <!-- Các trường nhập sửa đơn hàng -->
      <div class="row">
        <div class="col-md-4">
          <label for="editOrderDate">Ngày đặt hàng:</label>
          <input
            type="date"
            id="editOrderDate"
            v-model="editingOrder.orderDate"
          />
        </div>
        <div class="col-md-4">
          <label for="editShippingAddress">Địa chỉ giao hàng:</label>
          <input
            type="text"
            id="editShippingAddress"
            v-model="editingOrder.shippingAddress"
          />
        </div>
        <div class="col-md-4">
          <label for="editOrderStatus">Trạng thái đơn hàng:</label>
          <input
            type="text"
            id="editOrderStatus"
            v-model="editingOrder.orderStatus"
          />
        </div>
      </div>
      <button @click="updateOrder">Cập nhật</button>
      <button @click="cancelEdit" class="cancel-btn">Hủy</button>
    </div>

    <!-- Form thêm đơn hàng mới -->
    <div v-else class="add-order-form">
      <h2>Thêm đơn hàng mới</h2>
      <div class="row">
        <div class="col-md-4">
          <label for="newOrderId">Mã đơn hàng:</label>
          <input type="text" id="newOrderId" v-model="newOrder.orderId" />
        </div>
        <div class="col-md-4">
          <label for="newImageUrl">Hình Ảnh:</label>
          <input type="text" id="newImageUrl" v-model="newOrder.imageUrl" />
        </div>
        <div class="col-md-4">
          <label for="newOrderDate">Ngày đặt hàng:</label>
          <input type="date" id="newOrderDate" v-model="newOrder.orderDate" />
        </div>
        <div class="col-md-4">
          <label for="newCustomerName">Tên khách hàng:</label>
          <input
            type="text"
            id="newCustomerName"
            v-model="newOrder.customerName"
          />
        </div>
        <div class="col-md-4">
          <label for="newShippingAddress">Địa chỉ giao hàng:</label>
          <input
            type="text"
            id="newShippingAddress"
            v-model="newOrder.shippingAddress"
          />
        </div>
        <div class="col-md-4">
          <label for="newProductName">Tên sản phẩm:</label>
          <input
            type="text"
            id="newProductName"
            v-model="newOrder.productName"
          />
        </div>
        <div class="col-md-4">
          <label for="newQuantity">Số lượng:</label>
          <input type="number" id="newQuantity" v-model="newOrder.quantity" />
        </div>
        <div class="col-md-4">
          <label for="newPrice">Giá tiền:</label>
          <input type="number" id="newPrice" v-model="newOrder.price" />
        </div>
        <div class="col-md-4">
          <label for="newProductDescription">Mô tả sản phẩm:</label>
          <input
            type="text"
            id="newProductDescription"
            v-model="newOrder.productDescription"
          />
        </div>
        <div class="col-md-4">
          <label for="newOrderStatus">Trạng thái đơn hàng:</label>
          <input
            type="text"
            id="newOrderStatus"
            v-model="newOrder.orderStatus"
          />
        </div>
        <div class="col-md-4">
          <label for="newPaymentMethod">Phương thức thanh toán:</label>
          <input
            type="text"
            id="newPaymentMethod"
            v-model="newOrder.paymentMethod"
          />
        </div>
      </div>
      <!-- Các trường nhập thêm đơn hàng -->

      <button
        @click="addOrder"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#addOrderModal"
      >
        Thêm
      </button>
    </div>
  </div>
</template>
  
  
    
  <script>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default {
  setup() {
    const orders = ref([]);
    const newOrder = ref({
      orderId: "",
      orderDate: "",
      customerName: "",
      shippingAddress: "",
      productName: "",
      quantity: 0,
      price: 0,
      productDescription: "",
      orderStatus: "",
      paymentMethod: "",
      imageUrl: "",
    });
    const editingOrder = ref(null);

    onMounted(async () => {
      let orderCollection = await getDocs(collection(db, "orders"));
      orders.value = orderCollection.docs.map((order) => ({
        ...order.data(),
        id: order.id,
      }));
    });

    const addOrder = async () => {
      try {
        const docRef = await addDoc(collection(db, "orders"), newOrder.value);
        orders.value.push({ ...newOrder.value, id: docRef.id });
        resetNewOrder();
      } catch (error) {
        console.error("Lỗi khi thêm đơn hàng: ", error);
      }
    };

    const editOrder = (order) => {
      editingOrder.value = { ...order };
    };

    const updateOrder = async () => {
      try {
        const orderRef = doc(db, "orders", editingOrder.value.id);
        await updateDoc(orderRef, editingOrder.value);

        // Update orders list after successful update
        orders.value = orders.value.map((order) => {
          if (order.id === editingOrder.value.id) {
            return editingOrder.value;
          }
          return order;
        });

        editingOrder.value = null;
      } catch (error) {
        console.error("Lỗi khi cập nhật đơn hàng: ", error);
      }
    };

    const cancelEdit = () => {
      editingOrder.value = null;
    };

    const deleteOrder = async (orderId) => {
      try {
        await deleteDoc(doc(db, "orders", orderId));
        orders.value = orders.value.filter((order) => order.id !== orderId);
      } catch (error) {
        console.error("Lỗi khi xóa đơn hàng: ", error);
      }
    };

    const resetNewOrder = () => {
      newOrder.value = {
        orderId: "",
        orderDate: "",
        customerName: "",
        shippingAddress: "",
        productName: "",
        quantity: 0,
        price: 0,
        productDescription: "",
        orderStatus: "",
        paymentMethod: "",
        imageUrl: "", // Đặt lại trường đường dẫn hình ảnh
      };
    };

    return {
      orders,
      newOrder,
      editingOrder,
      addOrder,
      editOrder,
      updateOrder,
      deleteOrder,
      cancelEdit,
    };
  },
};
</script>
<style scoped>
ul{
  list-style-type: none;
  padding: 0;
}
.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

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

.order-actions {
  display: flex;
  align-items: center;
}

.edit-order-form,
.add-order-form {
  /* max-width: px; */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.edit-order-form h2,
.add-order-form h2 {
  margin-bottom: 20px;
}

.edit-order-form label,
.add-order-form label {
  display: block;
  margin-bottom: 10px;
}

.edit-order-form input[type="text"],
.add-order-form input[type="text"],
.edit-order-form input[type="number"],
.add-order-form input[type="number"],
.edit-order-form input[type="date"],
.add-order-form input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 10px;
}

.edit-order-form button,
.add-order-form button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.edit-order-form button:hover,
.add-order-form button:hover {
  background-color: #45a049;
}
</style>

