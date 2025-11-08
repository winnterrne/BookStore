let myIndex = 0;
carousel();

function carousel() {
  const slides = document.getElementsByClassName("mySlides");
  if(slides.length == 0) return;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > slides.length) myIndex = 1;
  slides[myIndex - 1].style.display = "block";
  setTimeout(carousel, 4000);
}

const searchInput = document.getElementById("searchInput");

if(searchInput){
  searchInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){  // khi nhấn Enter
      e.preventDefault();   // ngăn form submit mặc định
      window.location.href = "page2.html"; // chuyển trang
    }
  });
}
;




document.addEventListener("DOMContentLoaded", () => {
  // Lấy hover menu
  const hoverText = document.querySelector(".book-user .hover-text");

  // Lấy user đã login từ localStorage
  const user = JSON.parse(localStorage.getItem("bookstore_user"));

  if(user) {
    // Thay nội dung hover menu
    hoverText.innerHTML = `
      <span>${user.name}</span>
      <a href="#" id="logoutBtn">Đăng Xuất</a>
    `;

    // Bắt sự kiện Logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("bookstore_user");
      window.location.reload();
    });
  }
});


// updateUI();

// ====== GIỎ HÀNG ======
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Lấy & lưu giỏ hàng
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("bookstore_cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("bookstore_cart", JSON.stringify(cart));
}

function renderCart() {
  if (!cartItems) return;
  const cart = getCart();
  let total = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <tr><td colspan="4" style="text-align:center; padding:20px;">Giỏ hàng trống 🛒</td></tr>
    `;
    if (cartTotal) cartTotal.textContent = "0đ";
    return;
  }

  cart.forEach((item, index) => {
    const subTotal = item.price * item.quantity;
    total += subTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="cart-product">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <strong>${item.title}</strong><br>
          <span class="remove" onclick="removeItem(${index})"></span>
        </div>
      </td>
      <td class="price">${item.price.toLocaleString()}đ</td>
      <td class="qty">
        <button onclick="changeQty(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td class="subtotal">${subTotal.toLocaleString()}đ</td>
    `;
    cartItems.appendChild(row);
  });

  if (cartTotal) cartTotal.textContent = total.toLocaleString() + "đ";
}

function changeQty(index, delta) {
  const cart = getCart();
  if (cart[index].quantity + delta > 0) {
    cart[index].quantity += delta;
    saveCart(cart);
    renderCart();
  }
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Xử lý form đặt hàng
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = getCart();

    if (cart.length === 0) {
      alert(
        "Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi đặt hàng 💛"
      );
      return; // Dừng không cho đặt
    }

     const user = JSON.parse(localStorage.getItem("bookstore_user"));

    // Khởi tạo mảng orders nếu chưa có
    if (!user.orders) user.orders = [];

    // Lấy phương thức thanh toán
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Tạo đơn hàng mới
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      payment: paymentMethod
    };

    // Thêm đơn hàng vào user
    user.orders.push(newOrder);

    // Cập nhật user hiện tại trong localStorage
    localStorage.setItem("bookstore_user", JSON.stringify(user));

    // Cập nhật luôn trong danh sách tất cả user
    let users = JSON.parse(localStorage.getItem("bookstore_users") || "[]");
    const idx = users.findIndex(u => u.email === user.email);
    if (idx >= 0) {
      users[idx] = user;
      localStorage.setItem("bookstore_users", JSON.stringify(users));
    }

    // Xóa giỏ hàng
    localStorage.removeItem("bookstore_cart");

    alert("Đặt hàng thành công 💚 Cảm ơn bạn đã mua sách tại BookStore!");
    window.location.href = "lichsu.html";
    renderCart();
  });
}

// Chạy render khi có trang giỏ hàng
renderCart();

//
function viewBook(id) {
    window.location.href = `book.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const hoverText = document.querySelector(".book-user .hover-text");
    const cartIcon = document.querySelector(".search-shopping");
    const loginBtn = document.getElementById("loginBtn");

    // Kiểm tra user đã login chưa
    function updateUserUI(user) {
        if(user && hoverText){
            hoverText.innerHTML = `
                <span>${user.name}</span>
                <a href="#" id="logoutBtn">Đăng Xuất</a>
            `;
            document.getElementById("logoutBtn").addEventListener("click", e => {
                e.preventDefault();
                localStorage.removeItem("bookstore_user");
                window.location.reload();
            });
        } else if(hoverText) {
            hoverText.innerHTML = `
                <a href="register.html">Đăng Ký</a>
                <a href="login.html">Đăng Nhập</a>
            `;
        }
    }

    // Khi load trang
    const user = JSON.parse(localStorage.getItem("bookstore_user"));
    updateUserUI(user);

    // Click vào giỏ hàng
    if(cartIcon){
        cartIcon.addEventListener("click", e => {
            const user = JSON.parse(localStorage.getItem("bookstore_user"));
            if(!user){
                e.preventDefault();
                alert("Bạn phải đăng nhập trước khi vào giỏ hàng!");
                window.location.href = "login.html";
            }
        });
    }

    // Click login → auto đăng nhập
    if(loginBtn){
        loginBtn.addEventListener("click", e => {
            e.preventDefault();
            const fakeUser = { name: "Người dùng", email: "demo@example.com" };
            localStorage.setItem("bookstore_user", JSON.stringify(fakeUser));
            updateUserUI(fakeUser);
            alert("Đăng nhập thành công!");
            window.location.href = "index.html";
        });
    }
});

      // Xử lý nút xác nhận đơn hàng
      document
        .querySelector(".btn-confirm")
        .addEventListener("click", function () {
          if (confirm("Bạn có chắc chắn muốn xác nhận đơn hàng này?")) {
            alert("Đơn hàng đã được xác nhận thành công!");
            // Có thể chuyển hướng hoặc cập nhật trạng thái ở đây
          }
        });



