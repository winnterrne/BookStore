
//////////////
const url = new URLSearchParams(window.location.search);
const id = url.get("id");

fetch("book.json")
  .then((res) => res.json())
  .then((books) => {
    const book = books.find((item) => item.id == id);
    if (!book) return;

    const decreaseBtn = document.getElementById("decreaseBtn");
    const increaseBtn = document.getElementById("increaseBtn");
    const quantityInput = document.getElementById("quantityInput");

    // Hai nút theo HTML
    const addToCartBtn = document.querySelector(".btn-left");  // Thêm vào giỏ
    const buyNowBtn = document.querySelector(".btn-right");    // Mua ngay

    // Hàm kiểm tra đăng nhập
function checkLogin() {
  const user = localStorage.getItem("bookstore_user");
  if (!user) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "login.html";
    return false;
  }
  return true;
}


    // 🛒 Thêm vào giỏ hàng
    addToCartBtn.addEventListener("click", () => {
      if (!checkLogin()) return; // chưa đăng nhập thì chuyển login

      const quantity = parseInt(quantityInput.value);
      let cart = JSON.parse(localStorage.getItem("bookstore_cart")) || [];

      const existing = cart.find((item) => item.id == book.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: book.id,
          title: book.title,
          price: book.price,
          image: book.image,
          quantity: quantity,
        });
      }

      localStorage.setItem("bookstore_cart", JSON.stringify(cart));
      alert("Đã thêm vào giỏ hàng 🛒");
    });

    // 🛍️ Mua ngay
    buyNowBtn.addEventListener("click", () => {
      if (!checkLogin()) return;
      alert("Đã Thêm Đơn Hàng");
      window.location.href = "history.html";
    });

    // ====== TĂNG GIẢM SỐ LƯỢNG ======
    decreaseBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) quantityInput.value = value - 1;
    });

    increaseBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  });

  //////////////////////////////
    const hoverText = document.querySelector(".book-user .hover-text");
  const cartIcon = document.querySelector(".search-shopping");

  function updateUserUI(user) {
    if (user) {
      hoverText.innerHTML = `
                <div class="user-greeting">Xin chào, Đức Trần</div>
                <a href="profile.html">Thông tin khách</a>
                <a href="lichsudonhang.html">Lịch sử giỏ hàng</a>
                <a href="#" id="logoutBtn">Đăng Xuất</a>
            `;
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("bookstore_user");
          window.location.reload();
        });
      }
    } else {
      hoverText.innerHTML = `
                <a href="register.html">Đăng Ký</a>
                <a href="login.html">Đăng Nhập</a>
            `;
    }
  }

  const user = JSON.parse(localStorage.getItem("bookstore_user"));
  updateUserUI(user);

  // Nếu click giỏ hàng mà chưa login
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      const user = JSON.parse(localStorage.getItem("bookstore_user"));
      if (!user) {
        e.preventDefault();
        alert("Bạn phải đăng nhập trước khi vào giỏ hàng!");
        window.location.href = "login.html";
      }
    });
  }



    const searchInput = document.getElementById("searchInput");
  const searchIcon = document.querySelector(".searchIconn");

  function doSearch() {
    const query = searchInput.value.trim();

    if (query !== "") {
      window.location.href = "page2.html";
    }
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      doSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        doSearch();
      }
    });
  }