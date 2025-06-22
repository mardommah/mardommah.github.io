// document = browser

// ambil id di kode html
let teksParagrafId = document.getElementById("teks")


// tambahkan konten ke dalam tag id teks
teksParagrafId.innerHTML = "<h1>Kalkulator Sederhana</h1>"

// // menulis langsung ke browser
// document.writeln("test")


// manipulasi event via DOM

// 1. ambil value id
// let idTombol = document.getElementById("tampil")

// //2. siapkan event listener
// function tampilTeks(){
//     alert("Selamat Datang di Website ini")
// }

// // 3. eksekusi dengan event listener
// idTombol.addEventListener("click", tampilTeks)


// ambil id masing - masing
let angka1 = document.getElementById("nomor1")
let angka2 = document.getElementById("nomor2")
let tampilHasil = document.getElementById("tampilHasil")
let totalJmlh = document.getElementById("totalJumlah")

// buatkan listener event
function hitungTotalNilai(){
    let hitung = Number(angka1.value) + Number(angka2.value)
    totalJmlh.innerHTML = "Hasil: " + hitung
}

// isi nilai dengan listener
tampilHasil.addEventListener("click", hitungTotalNilai)


let angka1Pengurangan = document.getElementById("nomor1Pengurangan")
let angka2Pengurangan = document.getElementById("nomor2Pengurangan")
let tampilHasilPengurangan = document.getElementById("tampilHasilPengurangan")
let totalJmlhPengurangan = document.getElementById("totalJumlahPengurangan")

function hitungTotalNilaiPengurangan(){
    let hitung = Number(angka1Pengurangan.value) - Number(angka2Pengurangan.value)
    totalJmlhPengurangan.innerHTML = "Hasil: " + hitung
}

tampilHasilPengurangan.addEventListener("click", hitungTotalNilaiPengurangan)


let angka1Pembagian = document.getElementById("nomor1Pembagian")
let angka2Pembagian = document.getElementById("nomor2Pembagian")
let tampilHasilPembagian = document.getElementById("tampilHasilPembagian")
let totalJmlhPembagian = document.getElementById("totalJumlahPembagian")

function hitungTotalNilaiPembagian(){
    let hitung = Number(angka1Pembagian.value) / Number(angka2Pembagian.value)
    totalJmlhPembagian.innerHTML = "Hasil: " + hitung
}

tampilHasilPembagian.addEventListener("click", hitungTotalNilaiPembagian)



const toggleSwitch = document.getElementById('mode');

// dark mode in html tag add data-bs-theme dark toggle theme

toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
});