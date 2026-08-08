// Helper functions for LocalStorage
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Initial seed data if localStorage is empty
const seedData = {
    pasien: [
        { id: "1", rm: "RM-001", nama: "Budi Santoso", umur: 34, gender: "Laki-laki", alamat: "Jl. Merdeka No. 10", hp: "08123456789" },
        { id: "2", rm: "RM-002", nama: "Siti Rahma", umur: 28, gender: "Perempuan", alamat: "Jl. Mawar No. 5", hp: "08987654321" },
        { id: "3", rm: "RM-003", nama: "Agus Pratama", umur: 45, gender: "Laki-laki", alamat: "Jl. Melati No. 12", hp: "08523456789" }
    ],
    dokter: [
        { id: "1", nama: "dr. Andi Wijaya, Sp.PD", spesialisasi: "Penyakit Dalam", hp: "08111111111", status: "Aktif" },
        { id: "2", nama: "dr. Rina Lestari, Sp.A", spesialisasi: "Anak", hp: "08222222222", status: "Aktif" },
        { id: "3", nama: "dr. Eko Prasetyo, Sp.B", spesialisasi: "Bedah", hp: "08333333333", status: "Cuti" }
    ],
    jadwal: [
        { id: "1", dokterId: "1", hari: "Senin", jamMulai: "08:00", jamSelesai: "12:00", ruangan: "Poli Dalam 1" },
        { id: "2", dokterId: "2", hari: "Selasa", jamMulai: "10:00", jamSelesai: "14:00", ruangan: "Poli Anak" }
    ],
    rawatInap: [
        { id: "1", pasienId: "1", dokterId: "1", ruangan: "Melati 101", tglMasuk: "2026-08-01", tglKeluar: "", status: "Aktif" },
        { id: "2", pasienId: "2", dokterId: "2", ruangan: "Mawar 202", tglMasuk: "2026-08-05", tglKeluar: "2026-08-07", status: "Selesai" }
    ],
    rekamMedis: [
        { id: "1", pasienId: "1", dokterId: "1", tanggal: "2026-08-01", diagnosa: "Dyspepsia", tindakan: "Pemberian Antasida", obat: "Omeprazole, Antasida" }
    ],
    aktivitas: [
        { id: "1", waktu: "2026-08-08 09:00", pasien: "Budi Santoso", dokter: "dr. Andi Wijaya, Sp.PD", tipe: "Rekam Medis Baru", status: "Selesai" },
        { id: "2", waktu: "2026-08-08 10:15", pasien: "Siti Rahma", dokter: "dr. Rina Lestari, Sp.A", tipe: "Masuk Rawat Inap", status: "Aktif" }
    ]
};

// Initialize app data if not present
function initStorage() {
    Object.keys(seedData).forEach(key => {
        if (!localStorage.getItem(key)) {
            saveData(key, seedData[key]);
        }
    });
}

// Sidebar toggle handler
document.addEventListener("DOMContentLoaded", () => {
    initStorage();
    
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", event => {
            event.preventDefault();
            document.body.classList.toggle("sb-sidenav-toggled");
            document.getElementById("wrapper").classList.toggle("toggled");
        });
    }

    // Only run dashboard logic on dashboard page (index.html)
    if (document.getElementById("totalPasien")) {
        loadDashboardStats();
        initDashboardCharts();
        loadRecentActivities();
    }
});

// Load statistics count
function loadDashboardStats() {
    const pasien = getData("pasien");
    const dokter = getData("dokter");
    const rawatInap = getData("rawatInap");
    const jadwal = getData("jadwal");

    document.getElementById("totalPasien").innerText = pasien.length;
    document.getElementById("totalDokter").innerText = dokter.length;
    document.getElementById("totalRawatInap").innerText = rawatInap.filter(r => r.status === "Aktif").length;
    document.getElementById("totalJadwal").innerText = jadwal.length;
}

// Initialize charts using Chart.js
function initDashboardCharts() {
    const patientCtx = document.getElementById("patientChart")?.getContext("2d");
    const specialtyCtx = document.getElementById("specialtyChart")?.getContext("2d");

    if (patientCtx) {
        new Chart(patientCtx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt"],
                datasets: [{
                    label: "Registrasi Pasien Baru",
                    data: [10, 15, 8, 22, 18, 25, 30, getData("pasien").length],
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.1)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    if (specialtyCtx) {
        const dokter = getData("dokter");
        const specCounts = {};
        dokter.forEach(d => {
            specCounts[d.spesialisasi] = (specCounts[d.spesialisasi] || 0) + 1;
        });

        new Chart(specialtyCtx, {
            type: "doughnut",
            data: {
                labels: Object.keys(specCounts).length ? Object.keys(specCounts) : ["Umum"],
                datasets: [{
                    data: Object.values(specCounts).length ? Object.values(specCounts) : [1],
                    backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8", "#6c757d", "#e83e8c"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Load recent activities
function loadRecentActivities() {
    const tableBody = document.getElementById("activityBody");
    const aktivitas = getData("aktivitas").slice(-5).reverse(); // Last 5 activities

    if (aktivitas.length > 0 && tableBody) {
        tableBody.innerHTML = "";
        aktivitas.forEach(act => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${act.waktu}</td>
                <td>${act.pasien}</td>
                <td>${act.dokter}</td>
                <td>${act.tipe}</td>
                <td><span class="badge bg-${act.status === "Aktif" ? "warning" : "success"}">${act.status}</span></td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Log new activity helper
function logActivity(pasien, dokter, tipe, status = "Selesai") {
    const list = getData("aktivitas");
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    list.push({ id: Date.now().toString(), waktu: formattedDate, pasien, dokter, tipe, status });
    saveData("aktivitas", list);
}
