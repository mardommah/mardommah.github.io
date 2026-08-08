let modal;

document.addEventListener("DOMContentLoaded", () => {
    modal = new bootstrap.Modal(document.getElementById('formModal'));
    renderTable();

    document.getElementById("searchInput").addEventListener("keyup", (e) => {
        renderTable(e.target.value);
    });

    document.getElementById("dataForm").addEventListener("submit", saveDokter);
});

function renderTable(searchQuery = "") {
    const data = getData("dokter");
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const filteredData = data.filter(d => 
        d.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.spesialisasi.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">Tidak ada data dokter</td></tr>`;
        return;
    }

    filteredData.forEach(d => {
        let statusBadge = "success";
        if(d.status === "Cuti") statusBadge = "warning";
        if(d.status === "Non-aktif") statusBadge = "danger";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${d.nama}</td>
            <td>${d.spesialisasi}</td>
            <td>${d.hp}</td>
            <td><span class="badge bg-${statusBadge}">${d.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-warning text-white" onclick="editData('${d.id}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteData('${d.id}')"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openModal() {
    document.getElementById("dataForm").reset();
    document.getElementById("formId").value = "";
    document.getElementById("modalTitle").innerText = "Tambah Dokter";
    modal.show();
}

function saveDokter(e) {
    e.preventDefault();
    
    const id = document.getElementById("formId").value || Date.now().toString();
    const newData = {
        id: id,
        nama: document.getElementById("formNama").value,
        spesialisasi: document.getElementById("formSpesialisasi").value,
        hp: document.getElementById("formHP").value,
        status: document.getElementById("formStatus").value
    };

    let data = getData("dokter");
    const existingIndex = data.findIndex(d => d.id === id);

    if (existingIndex >= 0) {
        data[existingIndex] = newData;
        logActivity("-", newData.nama, "Update Data Dokter", "Selesai");
    } else {
        data.push(newData);
        logActivity("-", newData.nama, "Registrasi Dokter Baru", "Selesai");
    }

    saveData("dokter", data);
    modal.hide();
    renderTable();
}

function editData(id) {
    const data = getData("dokter").find(d => d.id === id);
    if (!data) return;

    document.getElementById("formId").value = data.id;
    document.getElementById("formNama").value = data.nama;
    document.getElementById("formSpesialisasi").value = data.spesialisasi;
    document.getElementById("formHP").value = data.hp;
    document.getElementById("formStatus").value = data.status;

    document.getElementById("modalTitle").innerText = "Edit Dokter";
    modal.show();
}

function deleteData(id) {
    if (confirm("Yakin ingin menghapus data dokter ini? (Jadwal terkait mungkin akan terdampak)")) {
        let data = getData("dokter");
        const dok = data.find(d => d.id === id);
        data = data.filter(d => d.id !== id);
        saveData("dokter", data);
        if(dok) logActivity("-", dok.nama, "Hapus Data Dokter", "Selesai");
        renderTable();
    }
}