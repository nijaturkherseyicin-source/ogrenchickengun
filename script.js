// Katıl Butonu Fonksiyonu
function klanaKatil(klanAdi) {
    alert("🚀 " + klanAdi.toUpperCase() + " klanına başvurun başarıyla iletildi!");
}

// Alt Menü Kaydırma Fonksiyonu
function sayfaKaydir(elementId) {
    var hedef = document.getElementById(elementId);
    if (hedef) {
        hedef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- CANLI SUNUCU SAYAÇLARI ---

// 1. Sunucu: türk gel
setInterval(function() {
    var sayac1 = document.getElementById('sayac-turkgel');
    if (sayac1) {
        var rastgeleOyuncu = Math.floor(Math.random() * 16) + 3;
        sayac1.innerText = rastgeleOyuncu + "/20";
    }
}, 4000);

// 2. Sunucu: türkiye
var saniye = 0;
setInterval(function() {
    var sayac2 = document.getElementById('sayac-turkiye');
    if (!sayac2) return;

    saniye++;

    if (saniye === 5) {
        sayac2.innerText = "17/20";
    } else if (saniye === 10) {
        sayac2.innerText = "20/20";
        sayac2.classList.add("dolu");
    } else if (saniye === 15) {
        sayac2.innerText = "12/20";
        sayac2.classList.remove("dolu");
        saniye = 0;
    }
}, 1000);

// --- AYARLAR MODAL (AÇILIR PENCERE) FONKSİYONLARI ---

function ayarlariAc() {
    document.getElementById('ayarlar-modal').style.display = "block";
}

function ayarlariKapat() {
    document.getElementById('ayarlar-modal').style.display = "none";
}

// Pencere dışına tıklanınca kapatma
window.onclick = function(event) {
    var modal = document.getElementById('ayarlar-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Tema Değiştirme (Karanlık / Aydınlık Mod)
function temaDegistir() {
    var switchButon = document.getElementById('tema-switch');
    if (!switchButon.checked) {
        document.body.classList.add('light-theme'); // Beyaz mod aktif
    } else {
        document.body.classList.remove('light-theme'); // Karanlık mod aktif
    }
}
// Ad sorma ve yorum ekleme fonksiyonu
function adSorVeYorumYaz() {
    // Önce kullanıcı adını alalım
    var isim = prompt("Lütfen adını gir:");
    
    if (isim !== null && isim !== "") {
        // Yorum alanını değiştirelim
        var alan = document.getElementById('input-alani');
        alan.innerHTML = `
            <input type="text" id="yorum-yazma-kutusu" placeholder="Yorumunu buraya yaz...">
            <button class="action-btn" onclick="yorumuGonder('${isim}')">Gönder</button>
        `;
    }
}

// Yorumu listeye ekleme
function yorumuGonder(isim) {
    var input = document.getElementById('yorum-yazma-kutusu');
    var liste = document.getElementById('yorum-listesi');
    
    if (input.value.trim() !== "") {
        var yeniYorum = document.createElement('div');
        yeniYorum.className = 'user-comment';
        yeniYorum.innerHTML = `
            <span class="comment-author">${isim}</span>
            <span class="comment-text">${input.value}</span>
        `;
        liste.appendChild(yeniYorum);
        
        // Kutuyu temizle
        input.value = "";
    }
}
// --- YORUMLAR İÇİN KALICI KAYIT SİSTEMİ (En alta ekle) ---

// Sayfa açıldığında tarayıcıdaki kayıtlı yorumları ekrana geri getirir
window.onload = function() {
    var kaydedilenYorumlar = localStorage.getItem('chickenGunYorumlar');
    if (kaydedilenYorumlar) {
        var liste = document.getElementById('yorum-listesi');
        if (liste) {
            liste.innerHTML = kaydedilenYorumlar;
        }
    }
};

// Yorum kutusuna tıklanınca isim soran fonksiyon
function adSorVeYorumYaz() {
    var isim = prompt("Adını gir (Oyuncu veya gerçek adın):");
    
    if (isim !== null && isim !== "") {
        var alan = document.getElementById('input-alani');
        // İsmi aldıktan sonra yorum yazma kutusunu getirir
        alan.innerHTML = `
            <input type="text" id="yorum-yazma-kutusu" placeholder="Yorumunu yaz...">
            <button class="action-btn" onclick="yorumuGonder('${isim}')">Gönder</button>
        `;
    }
}

// Sayfa açıldığında eski yorumları yükle
window.onload = function() {
    var kaydedilenYorumlar = localStorage.getItem('chickenGunYorumlar');
    if (kaydedilenYorumlar) {
        document.getElementById('yorum-listesi').innerHTML = kaydedilenYorumlar;
    }
};

// Yorum kutusuna tıklanınca isim soran fonksiyon
function adSorVeYorumYaz() {
    // Önce kayıtlı bir isim var mı diye bak
    var kaydedilenIsim = localStorage.getItem('kullaniciAdi');
    
    if (kaydedilenIsim) {
        // İsim varsa direkt yorum kutusunu göster
        yorumKutusunuGoster(kaydedilenIsim);
    } else {
        // İsim yoksa sor
        var isim = prompt("Lütfen adını gir (Kalıcı olarak kaydedilecek):");
        if (isim !== null && isim !== "") {
            localStorage.setItem('kullaniciAdi', isim); // İsmi kaydet
            yorumKutusunuGoster(isim);
        }
    }
}

// İsim girildikten sonra yorum kutusunu ekrana getiren yardımcı fonksiyon
function yorumKutusunuGoster(isim) {
    var alan = document.getElementById('input-alani');
    alan.innerHTML = `
        <input type="text" id="yorum-yazma-kutusu" placeholder="Yorumunu yaz... (GERİ SİLİNMEZ)">
        <button class="action-btn" onclick="yorumuGonder('${isim}')">Gönder</button>
    `;
}

// Yorumu listeye ekle ve kaydet
function yorumuGonder(isim) {
    var input = document.getElementById('yorum-yazma-kutusu');
    var liste = document.getElementById('yorum-listesi');
    
    if (input.value.trim() !== "") {
        var yeniYorum = document.createElement('div');
        yeniYorum.className = 'user-comment';
        yeniYorum.innerHTML = `
            <span class="comment-author">${isim}</span>
            <span class="comment-text">${input.value}</span>
        `;
        liste.appendChild(yeniYorum);
        localStorage.setItem('chickenGunYorumlar', liste.innerHTML);
        input.value = "";
    }
}

