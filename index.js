

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // 1. USER LOGIN / HOVER MENU
    // =========================
    const hoverText = document.querySelector(".book-user .hover-text");
    const cartIcon = document.querySelector(".search-shopping");

    function updateUserUI(user) {
        if(user){
            hoverText.innerHTML = `
                <p>Xin chào, Đức Trần</p>
                <a href="profile.html">Thông tin khách</a>
                <a href="lichsudonhang.html">Lịch sử giỏ hàng</a>
                <a href="#" id="logoutBtn">Đăng Xuất</a>
            `;
            const logoutBtn = document.getElementById("logoutBtn");
            if(logoutBtn){
                logoutBtn.addEventListener("click", e => {
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

    // =========================
    // 2. FAKE LOGIN (login.html)
    // =========================
    const loginBtn = document.getElementById("loginBtnn");
    if(loginBtn){
        loginBtn.addEventListener("click", e => {
            e.preventDefault();
            const fakeUser = { name: "User", email: "demo@example.com" };
            localStorage.setItem("bookstore_user", JSON.stringify(fakeUser));
            alert("Đăng Nhập Thành Công");
            window.location.href = "index.html"; // trở về index
        });
    }

    // =========================
    // 3. PAYMENT OPTION SELECT
    // =========================
    const options = document.querySelectorAll('.payment-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // =========================
    // 4. MODAL TÌM KIẾM NÂNG CAO
    // =========================
    const modal = document.querySelector('.js-modal');
    const openBtn = document.querySelector('.open-modal-btn');
    const closeBtn = document.querySelector('.js-modal-close');
    if(openBtn && modal){
        openBtn.addEventListener('click', () => modal.classList.add('show'));
    }
    if(closeBtn && modal){
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
        modal.addEventListener('click', e => {
            if(e.target === modal) modal.classList.remove('show');
        });
    }

    const searchBtn = document.querySelector('.btn-search');
    if(searchBtn){
        searchBtn.addEventListener('click', () => {
            window.location.href="page2.html";
        });
    }

    // =========================
    // 5. PHÂN TRANG NHẢY MÀU
    // =========================
    const pages = document.querySelectorAll('.pagination .page');
    const prevBtn = document.querySelector('.pagination .prev');
    const nextBtn = document.querySelector('.pagination .next');

    function setActive(index){
        pages.forEach(p => p.classList.remove('active'));
        pages[index].classList.add('active');
    }

    pages.forEach((btn, idx) => {
        btn.addEventListener('click', () => setActive(idx));
    });

    if(prevBtn){
        prevBtn.addEventListener('click', () => {
            let current = [...pages].findIndex(p => p.classList.contains('active'));
            if(current > 0) setActive(current - 1);
        });
    }
    if(nextBtn){
        nextBtn.addEventListener('click', () => {
            let current = [...pages].findIndex(p => p.classList.contains('active'));
            if(current < pages.length - 1) setActive(current + 1);
        });
    }

    // =========================
    // 6. SEARCH INPUT ENTER + ICON
    // =========================
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.querySelector(".search-search");

    function doSearch(){
        const query = searchInput.value.trim();
        if(query !== ""){
            window.location.href = "page2.html";
        }
    }

    if(searchInput){
        searchInput.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                e.preventDefault();
                doSearch();
            }
        });
    }
    if(searchIcon){
        searchIcon.addEventListener("click", doSearch);
    }

    // =========================
    // 7. VIEW BOOK
    // =========================
    window.viewBook = function(id){
        window.location.href = `book.html?id=${id}`;
    };

    // =========================
    // 8. ORDER FORM
    // =========================
    const orderForm = document.getElementById("orderForm");
    if(orderForm){
        orderForm.addEventListener("submit", e => {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem("bookstore_cart")) || [];

            if(cart.length === 0){
                alert("Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi đặt hàng 💛");
                return;
            }

            localStorage.removeItem("bookstore_cart");
            alert("Đặt hàng thành công 💚 Cảm ơn bạn đã mua sách tại BookStore!");
            window.location.href = "lichsu.html";
        });
    }

    // =========================
    // 9. XÁC NHẬN ĐƠN HÀNG
    // =========================
    const confirmBtn = document.querySelector(".btn-confirm");
    if(confirmBtn){
        confirmBtn.addEventListener("click", () => {
            if(confirm("Bạn có chắc chắn muốn xác nhận đơn hàng này?")){
                alert("Đơn hàng đã được xác nhận thành công!");
            }
        });
    }

    let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll(".mySlides");

    // Ẩn tất cả ảnh
    slides.forEach(slide => slide.style.display = "none");

    slideIndex++;

    // Nếu vượt số ảnh → quay về ảnh đầu
    if (slideIndex > slides.length) slideIndex = 1;

    // Hiện ảnh hiện tại
    slides[slideIndex - 1].style.display = "block";

    // Gọi lại sau 3 giây
    setTimeout(showSlides, 3000);
}


});
