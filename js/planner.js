// --- planner.js ---
const dataMenuMakanan = [
    { id: 1, nama: "Nasi Putih", kategori: "Makanan Pokok", kalori: 180, harga: 5000, gambar: "assets/nasi-putih.jpg" },
    { id: 2, nama: "Nasi Goreng Spesial", kategori: "Makanan Pokok", kalori: 450, harga: 18000, gambar: "assets/nasi-goreng-spesial.jpg" },
    { id: 3, nama: "Mie Goreng Jawa", kategori: "Makanan Pokok", kalori: 380, harga: 16000, gambar: "assets/mie-goreng-jawa.jpg" },
    { id: 4, nama: "Spaghetti Aglio Olio", kategori: "Makanan Pokok", kalori: 420, harga: 28000, gambar: "assets/spaghetti-aglio-olio.jpg" },
    { id: 5, nama: "Kentang Panggang", kategori: "Makanan Pokok", kalori: 220, harga: 15000, gambar: "assets/kentang-panggang.jpg" },
    { id: 6, nama: "Roti Gandum (2 lembar)", kategori: "Makanan Pokok", kalori: 160, harga: 8000, gambar: "assets/roti-gandum.jpg" },
    { id: 7, nama: "Ayam Goreng Tepung", kategori: "Lauk-Pauk", kalori: 300, harga: 17000, gambar: "assets/ayam-goreng-tepung.jpg" },
    { id: 8, nama: "Ayam Bakar Madu", kategori: "Lauk-Pauk", kalori: 280, harga: 20000, gambar: "assets/ayam-bakar-madu.jpg" },
    { id: 9, nama: "Rendang Daging Sapi", kategori: "Lauk-Pauk", kalori: 380, harga: 32000, gambar: "assets/rendang-daging-sapi.jpg" },
    { id: 10, nama: "Tempe Orek", kategori: "Lauk-Pauk", kalori: 150, harga: 8000, gambar: "assets/tempe-orek.jpg" },
    { id: 11, nama: "Tahu Goreng", kategori: "Lauk-Pauk", kalori: 120, harga: 6000, gambar: "assets/tahu-goreng.jpg" },
    { id: 12, nama: "Ikan Nila Bakar", kategori: "Lauk-Pauk", kalori: 250, harga: 22000, gambar: "assets/ikan-nila-bakar.jpg" },
    { id: 13, nama: "Telur Dadar", kategori: "Lauk-Pauk", kalori: 190, harga: 7000, gambar: "assets/telur-dadar.jpg" },
    { id: 14, nama: "Beef Steak Sirloin", kategori: "Lauk-Pauk", kalori: 420, harga: 45000, gambar: "assets/beef-steak-sirloin.jpg" },
    { id: 15, nama: "Tumis Kangkung", kategori: "Sayur", kalori: 90, harga: 9000, gambar: "assets/tumis-kangkung.jpg" },
    { id: 16, nama: "Sayur Asem", kategori: "Sayur", kalori: 70, harga: 8000, gambar: "assets/sayur-asem.jpg" },
    { id: 17, nama: "Capcay Kuah", kategori: "Sayur", kalori: 110, harga: 13000, gambar: "assets/capcay-kuah.jpg" },
    { id: 18, nama: "Salad Sayur Segar", kategori: "Sayur", kalori: 80, harga: 14000, gambar: "assets/salad-sayur-segar.jpg" },
    { id: 19, nama: "Gado-Gado", kategori: "Sayur", kalori: 280, harga: 16000, gambar: "assets/gado-gado.jpg" },
    { id: 20, nama: "Pisang (1 buah)", kategori: "Buah", kalori: 105, harga: 5000, gambar: "assets/pisang.jpg" },
    { id: 21, nama: "Apel Fuji (1 buah)", kategori: "Buah", kalori: 95, harga: 7000, gambar: "assets/apel-fuji.jpg" },
    { id: 22, nama: "Semangka (1 potong)", kategori: "Buah", kalori: 60, harga: 6000, gambar: "assets/semangka.jpg" },
    { id: 23, nama: "Fruit Salad Cup", kategori: "Buah", kalori: 140, harga: 17000, gambar: "assets/fruit-salad-cup.jpg" },
    { id: 24, nama: "Es Teh Manis", kategori: "Minuman", kalori: 90, harga: 5000, gambar: "assets/es-teh-manis.jpg" },
    { id: 25, nama: "Air Mineral 600ml", kategori: "Minuman", kalori: 0, harga: 4000, gambar: "assets/air-mineral.jpg" },
    { id: 26, nama: "Jus Alpukat", kategori: "Minuman", kalori: 230, harga: 18000, gambar: "assets/jus-alpukat.jpg" }
];

let keranjangPilihan = [];
const cardsContainer = document.getElementById('menu-cards-container');
const emptyStateView = document.getElementById('empty-state-view');
const activeStateView = document.getElementById('active-state-view');
const imageGridStack = document.getElementById('selected-image-grid');
const labelTotalCalories = document.getElementById('label-total-calories');
const labelTotalPrice = document.getElementById('label-total-price');
const badgeMenuSeimbang = document.getElementById('badge-menu-seimbang');

function renderMenuCards() {
    cardsContainer.innerHTML = '';
    dataMenuMakanan.forEach(menu => {
        const cardNode = document.createElement('div');
        cardNode.classList.add('menu-row-card');
        
        cardNode.setAttribute('data-category', menu.kategori);
        cardNode.setAttribute('data-id', menu.id);

        cardNode.innerHTML = `
            <img src="${menu.gambar}" alt="${menu.nama}" class="card-img">
            <div class="card-name">${menu.nama}</div>
            <div class="menu-category">${menu.kategori}</div>
            <div class="menu-calories">${menu.kalori} kkal</div>
            <div class="menu-price">Rp ${menu.harga.toLocaleString('id-ID')}</div>
            <div>
                <input type="checkbox" class="card-checkbox" id="check-${menu.id}">
            </div>
        `;

        cardNode.addEventListener('click', function() {
            const checkbox = this.querySelector('.card-checkbox');
            const currentId = parseInt(this.getAttribute('data-id'));
            
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                this.classList.add('selected-card');
                const itemTerpilih = dataMenuMakanan.find(m => m.id === currentId);
                keranjangPilihan.push(itemTerpilih);
            } else {
                this.classList.remove('selected-card');
                keranjangPilihan = keranjangPilihan.filter(m => m.id !== currentId);
            }
            
            kalkulasiRingkasanMenu();
        });

        cardsContainer.appendChild(cardNode);
    });
}

function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const allCards = document.querySelectorAll('.menu-row-card');
            
            allCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'grid'; // Tetap gunakan grid agar tidak berantakan
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function kalkulasiRingkasanMenu() {
    if (keranjangPilihan.length === 0) {
        emptyStateView.classList.remove('hidden');
        activeStateView.classList.add('hidden');
        return;
    }

    emptyStateView.classList.add('hidden');
    activeStateView.classList.remove('hidden');

    imageGridStack.innerHTML = '';
    keranjangPilihan.forEach(item => {
        const imgEl = document.createElement('img');
        imgEl.src = item.gambar;
        imgEl.alt = item.nama;
        imgEl.classList.add('selected-img-item');
        imageGridStack.appendChild(imgEl);
    });

    const akumulasiKalori = keranjangPilihan.reduce((total, item) => total + item.kalori, 0);
    const akumulasiHarga = keranjangPilihan.reduce((total, item) => total + item.harga, 0);
    labelTotalCalories.innerText = akumulasiKalori;
    labelTotalPrice.innerText = akumulasiHarga.toLocaleString('id-ID');

    const daftarKategoriTerpilih = new Set(keranjangPilihan.map(item => item.kategori));
    const pemetaanKategoriDOM = [
        { key: 'Makanan Pokok', elementId: 'item-pokok' },
        { key: 'Lauk-Pauk', elementId: 'item-lauk' },
        { key: 'Sayur', elementId: 'item-sayur' },
        { key: 'Buah', elementId: 'item-buah' },
        { key: 'Minuman', elementId: 'item-minuman' }
    ];

    let jumlahKategoriTerpenuhi = 0;

    pemetaanKategoriDOM.forEach(kat => {
        const liElement = document.getElementById(kat.elementId);
        if (daftarKategoriTerpilih.has(kat.key)) {
            liElement.classList.remove('status-unfulfilled');
            liElement.classList.add('status-fulfilled');
            jumlahKategoriTerpenuhi++;
        } else {
            liElement.classList.remove('status-fulfilled');
            liElement.classList.add('status-unfulfilled');
        }
    });

    if (jumlahKategoriTerpenuhi === 5) {
        badgeMenuSeimbang.classList.remove('hidden');
    } else {
        badgeMenuSeimbang.classList.add('hidden');
    }
}

function initClearAllButton() {
    const btnClearAll = document.getElementById('btn-clear-all');
    if(btnClearAll) {
        btnClearAll.addEventListener('click', () => {
            keranjangPilihan = [];
            
            document.querySelectorAll('.menu-row-card').forEach(card => {
                card.classList.remove('selected-card');
                card.querySelector('.card-checkbox').checked = false;
            });
            
            kalkulasiRingkasanMenu();
        });
    }
}

renderMenuCards();
initFilterTabs();
initClearAllButton();