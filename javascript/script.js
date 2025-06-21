// document = browser

// ambil id di kode html
let teksParagrafId = document.getElementById("teks")

// tambahkan konten ke dalam tag id teks
teksParagrafId.innerHTML = "<h1>Test Html</h1>"

// // menulis langsung ke browser
// document.writeln("test")


// manipulasi event via DOM

// 1. ambil value id
let idTombol = document.getElementById("tampil")

//2. siapkan event listener
function tampilTeks(){
    alert("Selamat Datang di Website ini")
}

// 3. eksekusi dengan event listener
idTombol.addEventListener("click", tampilTeks)


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
