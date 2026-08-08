let modal;

document.addEventListener("DOMContentLoaded", () => {
    modal = new bootstrap.Modal(document.getElementById('formModal'));
    renderTable();

    document.getElementById("searchInput").addEventListener("keyup", (e) => {
        renderTable(e.target.value);
    });

    document.getElementById("dataForm").addEventListener("submit", savePasien);
});

function renderTable(searchQuery = "") {
    const data = getData("pasien");
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const filteredData = data.filter(p => 
        p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.rm.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">Tidak ada data pasien</td></tr>`;
        return;
    }

    filteredData.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="badge bg-secondary">${p.rm}</span></td>
            <td class="fw-bold">${p.nama}</td>
            <td>${p.umur} Thn</td>
            <td>${p.gender}</td>
            <td>${p.hp}</td>
            <td>${p.alamat}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-warning text-white" onclick="editData('${p.id}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteData('${p.id}')"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openModal() {
    document.getElementById("dataForm").reset();
    document.getElementById("formId").value = "";
    
    // Auto generate RM
    const pasien = getData("pasien");
    const nextRM = `RM-${String(pasien.length + 1).padStart(3, '0')}`;
    document.getElementById("formRM").value = nextRM;
    
    document.getElementById("modalTitle").innerText = "Tambah Pasien";
    modal.show();
}

function savePasien(e) {
    e.preventDefault();
    
    const id = document.getElementById("formId").value || Date.now().toString();
    const newData = {
        id: id,
        rm: document.getElementById("formRM").value,
        nama: document.getElementById("formNama").value,
        umur: document.getElementById("formUmur").value,
        gender: document.getElementById("formGender").value,
        hp: document.getElementById("formHP").value,
        alamat: document.getElementById("formAlamat").value
    };

    let data = getData("pasien");
    const existingIndex = data.findIndex(p => p.id === id);

    if (existingIndex >= 0) {
        data[existingIndex] = newData;
        logActivity(newData.nama, "-", "Update Data Pasien", "Selesai");
    } else {
        data.push(newData);
        logActivity(newData.nama, "-", "Registrasi Pasien Baru", "Selesai");
    }

    saveData("pasien", data);
    modal.hide();
    renderTable();
}

function editData(id) {
    const data = getData("pasien").find(p => p.id === id);
    if (!data) return;

    document.getElementById("formId").value = data.id;
    document.getElementById("formRM").value = data.rm;
    document.getElementById("formNama").value = data.nama;
    document.getElementById("formUmur").value = data.umur;
    document.getElementById("formGender").value = data.gender;
    document.getElementById("formHP").value = data.hp;
    document.getElementById("formAlamat").value = data.alamat;

    document.getElementById("modalTitle").innerText = "Edit Pasien";
    modal.show();
}

function deleteData(id) {
    if (confirm("Yakin ingin menghapus data pasien ini?")) {
        let data = getData("pasien");
        const pas = data.find(p => p.id === id);
        data = data.filter(p => p.id !== id);
        saveData("pasien", data);
        if(pas) logActivity(pas.nama, "-", "Hapus Data Pasien", "Selesai");
        renderTable();
    }
}