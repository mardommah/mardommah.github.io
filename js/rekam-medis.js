let modal;

document.addEventListener("DOMContentLoaded", () => {
    modal = new bootstrap.Modal(document.getElementById('formModal'));
    loadSelects();
    renderTable();
});

function loadSelects() {
    const pasien = getData("pasien");
    const dokter = getData("dokter");
    const formPasien = document.getElementById("formPasien");
    const formDokter = document.getElementById("formDokter");
    const filterPasien = document.getElementById("filterPasien");

    formPasien.innerHTML = '<option value="">Pilih Pasien</option>';
    formDokter.innerHTML = '<option value="">Pilih Dokter</option>';
    filterPasien.innerHTML = '<option value="">Semua Pasien</option>';

    pasien.forEach(p => {
        const option1 = document.createElement("option");
        option1.value = p.id;
        option1.textContent = `${p.nama} (${p.rm})`;
        formPasien.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = p.id;
        option2.textContent = p.nama;
        filterPasien.appendChild(option2);
    });

    dokter.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = d.nama;
        formDokter.appendChild(option);
    });
}

function renderTable() {
    const data = getData("rekamMedis");
    const pasien = getData("pasien");
    const dokter = getData("dokter");
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const filter = document.getElementById("filterPasien").value;
    const filteredData = filter ? data.filter(r => r.pasienId === filter) : data;

    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">Tidak ada rekam medis</td></tr>`;
        return;
    }

    filteredData.forEach(r => {
        const pasienData = pasien.find(p => p.id === r.pasienId);
        const dokterData = dokter.find(d => d.id === r.dokterId);
        const pasienNama = pasienData ? pasienData.nama : "-";
        const dokterNama = dokterData ? dokterData.nama : "-";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${r.tanggal}</td>
            <td class="fw-bold">${pasienNama}</td>
            <td>${dokterNama}</td>
            <td>${r.diagnosa}</td>
            <td>${r.tindakan}</td>
            <td>${r.obat}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-info text-white" onclick="viewDetail('${r.id}')"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-sm btn-warning text-white" onclick="editData('${r.id}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteData('${r.id}')"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openModal() {
    document.getElementById("dataForm").reset();
    document.getElementById("formId").value = "";
    document.getElementById("formTanggal").value = new Date().toISOString().split('T')[0];
    document.getElementById("modalTitle").innerText = "Tambah Rekam Medis";
    modal.show();
}

function saveRekamMedis(e) {
    e.preventDefault();

    const id = document.getElementById("formId").value || Date.now().toString();
    const pasienId = document.getElementById("formPasien").value;
    const dokterId = document.getElementById("formDokter").value;
    const pasienData = getData("pasien").find(p => p.id === pasienId);
    const dokterData = getData("dokter").find(d => d.id === dokterId);

    const newData = {
        id: id,
        pasienId: pasienId,
        dokterId: dokterId,
        tanggal: document.getElementById("formTanggal").value,
        diagnosa: document.getElementById("formDiagnosa").value,
        tindakan: document.getElementById("formTindakan").value,
        obat: document.getElementById("formObat").value
    };

    let data = getData("rekamMedis");
    const existingIndex = data.findIndex(r => r.id === id);

    if (existingIndex >= 0) {
        data[existingIndex] = newData;
        if(pasienData && dokterData) logActivity(pasienData.nama, dokterData.nama, "Update Rekam Medis", "Selesai");
    } else {
        data.push(newData);
        if(pasienData && dokterData) logActivity(pasienData.nama, dokterData.nama, "Rekam Medis Baru", "Selesai");
    }

    saveData("rekamMedis", data);
    modal.hide();
    renderTable();
}

function editData(id) {
    const data = getData("rekamMedis").find(r => r.id === id);
    if (!data) return;

    document.getElementById("formId").value = data.id;
    document.getElementById("formPasien").value = data.pasienId;
    document.getElementById("formDokter").value = data.dokterId;
    document.getElementById("formTanggal").value = data.tanggal;
    document.getElementById("formDiagnosa").value = data.diagnosa;
    document.getElementById("formTindakan").value = data.tindakan;
    document.getElementById("formObat").value = data.obat;

    document.getElementById("modalTitle").innerText = "Edit Rekam Medis";
    modal.show();
}

function viewDetail(id) {
    const data = getData("rekamMedis").find(r => r.id === id);
    const pasien = getData("pasien").find(p => p.id === data.pasienId);
    const dokter = getData("dokter").find(d => d.id === data.dokterId);
    
    alert(`Detail Rekam Medis\n\nPasien: ${pasien?.nama || '-'}\nDokter: ${dokter?.nama || '-'}\nTanggal: ${data.tanggal}\nDiagnosa: ${data.diagnosa}\nTindakan: ${data.tindakan}\nObat: ${data.obat}`);
}

function deleteData(id) {
    if (confirm("Yakin ingin menghapus rekam medis ini?")) {
        let data = getData("rekamMedis");
        const rekam = data.find(r => r.id === id);
        data = data.filter(r => r.id !== id);
        saveData("rekamMedis", data);
        const pasien = getData("pasien").find(p => p.id === rekam?.pasienId);
        if(pasien) logActivity(pasien.nama, "-", "Hapus Rekam Medis", "Selesai");
        renderTable();
    }
}

document.getElementById("dataForm")?.addEventListener("submit", saveRekamMedis);
