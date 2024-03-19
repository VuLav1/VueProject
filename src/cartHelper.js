// File: cartHelper.js
// Đây là một tệp helper để thêm sản phẩm vào giỏ hàng

// Import các dependencies cần thiết
import { ref } from "vue";

// Tạo một biến để lưu trữ danh sách sản phẩm trong giỏ hàng
const cartItems = ref([]);


// Hàm thêm sản phẩm vào giỏ hàng
export function addToCart1(product) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = cartItems.value.find(item => item.productId === product.productId);

  // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào
    cartItems.value.push({ ...product, quantity: 1 });
  }

  // In ra thông báo để kiểm tra
  console.log("Sản phẩm đã được thêm vào giỏ hàng:", product);
}


// Export các biến và hàm cần thiết để sử dụng ở nơi khác trong ứng dụng
export { cartItems };
