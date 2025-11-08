const url = new URLSearchParams(window.location.search);
const id = url.get("id");

fetch("book.json")
  .then((res) => res.json())
  .then((books) => {
    const book = books.find((item) => item.id == id);
    if (!book) return;

    // ----- Hiển thị thông tin sách -----
    document.querySelector(".img-book img").src = book.image;
    document.querySelector(".namebook h1").innerText = book.title;
    document.querySelector(".author .sytle-author").innerText =
      " " + book.author;

    document.querySelector(".prodcut-price").innerText =
      book.price.toLocaleString() + " VND";
    document.querySelector(".old-price").innerText =
      book.oldPrice.toLocaleString() + " VND";
    document.querySelector(".sale-price").innerText = book.discount + "%";

    document.querySelector(
      "#description .content-book"
    ).innerHTML = `<p style="white-space: pre-line; line-height: 29px ">${book.description}</p>`;

    const detailItems = document.querySelectorAll(
      "#details li span:last-child"
    );
    detailItems[0].innerText = book.author;
    detailItems[1].innerText = book.translator;
    detailItems[2].innerText = book.publisher;
    detailItems[3].innerText = book.size;
    detailItems[4].innerText = book.pages;
    detailItems[5].innerText = book.published_year;

    // Xử lý nút tăng/giảm số lượng 
    const decreaseBtn = document.getElementById("decreaseBtn");
    const increaseBtn = document.getElementById("increaseBtn");
    const quantityInput = document.getElementById("quantityInput");
    const addToCartBtn = document.querySelector(".button-action"); // bé đang dùng class này

    increaseBtn.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseBtn.addEventListener("click", () => {
      let current = parseInt(quantityInput.value);
      if (current > 1) quantityInput.value = current - 1;
    });

    // Thêm vào giỏ hàng 
    addToCartBtn.addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value);
      let cart = JSON.parse(localStorage.getItem("bookstore_cart")) || [];

      // Kiểm tra sản phẩm đã có trong giỏ chưa
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
  });

  