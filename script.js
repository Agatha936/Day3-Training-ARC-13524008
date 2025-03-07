$(document).ready(function() {
    // Fungsi untuk memuat produk di halaman utama
    function loadProducts(kategori = 'all') {
        $.getJSON('cosmetics.json', function(data) {
            let content = '';
            $.each(data.product, function(i, product) {
                if (kategori === 'all' || product.kategori.toLowerCase() === kategori) {
                    content += `
                        <section class="swiper-slide">
                            <div class="home__content grid">
                                <div class="home__group">
                                    <img src="${product.gambar}" alt="${product.nama}" class="home__img" height="450px">
                                    <div class="home__indicator"></div>
                                </div>
                                <div class="home__data">
                                    <h3 class="home__subtitle">${product.nama}</h3>
                                    <h1 class="home__title">${product.made}</h1>
                                    <p class="home__description">${product.deskripsi}</p>
                                    <div class="home__buttons">
                                        <a href="details6.html?product=${product.nama}" class="button">Buy Now</a>
                                        <a href="details6.html?product=${product.nama}" class="button--link button--flex">View Details <i class="bx bx-right-arrow-alt button__icon"></i></a>
                                    </div>
                                </div>
                            </div>
                        </section>`;
                }
            });
            $('#product').html(content);
        });
    }

    // Fungsi untuk memuat detail produk di halaman details6.html
    function loadProductDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product');

        if (productName) {
            $.getJSON('cosmetics.json', function(data) {
                const product = data.product.find(p => p.nama === productName);
                if (product) {
                    const productDetails = `
                        <div class="product__images">
                            <div class="product__img">
                                <img src="${product.gambar}" alt="${product.nama}">
                            </div>
                            ${product.gambar2 ? `<div class="product__img"><img src="${product.gambar2}" alt="${product.nama}"></div>` : ''}
                            ${product.gambar3 ? `<div class="product__img"><img src="${product.gambar3}" alt="${product.nama}"></div>` : ''}
                        </div>
                        <div class="product__info">
                            <h2>${product.nama}</h2>
                            <p class="details__subtitle">${product.made}</p>
                            <p class="details__description">${product.deskripsi}</p>
                            <p class="details__price">$${product.harga} <span class="discount__percentage">${product.discount}% off</span></p>
                            <p class="details__other">${product.other}</p>
                            <p class="details__detail">${product.detail}</p>
                        </div>`;
                    $('#productDetails').html(productDetails);
                }
            });
        }
    }

    // Jalankan fungsi sesuai halaman
    if (window.location.pathname.includes('details6.html')) {
        loadProductDetails();
    } else {
        loadProducts();

        $('.nav__link').on('click', function(e) {
            $('.nav__link').removeClass('active-link');
            $(this).addClass('active-link');

            let kategori = $(this).text().trim().toLowerCase();
            $('span').text(kategori.toUpperCase());

            loadProducts(kategori);
        });
    }
});