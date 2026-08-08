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

    formPasien.innerHTML = '<option value="">Pilih Pasien</option>';
    formDokter.innerHTML = '<option value="">Pilih Dokter</option>';

    pasien.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = `${p.nama} (${p.rm})`;
        formPasien.appendChild(option);
    });

    dokter.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = d.nama;
        formDokter.appendChild(option);
    });
}

function renderTable() {
    const data = getData("rawatInap");
    const pasien = getData("pasien");
    const dokter = getData("dokter");
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">Tidak ada data rawat inap</td></tr>`;
        return;
    }

    data.forEach(r => {
        const pasienData = pasien.find(p => p.id === r.pasienId);
        const dokterData = dokter.find(d => d.id === r.dokterId);
        const pasienNama = pasienData ? pasienData.nama : "-";
        const dokterNama = dokterData ? dokterData.nama : "-";
        const statusBadge = r.status === "Aktif" ? "warning" : "success";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${pasienNama}</td>
            <td>${dokterNama}</td>
            <td>${r.ruangan}</td>
            <td>${r.tglMasuk}</td>
            <td>${r.tglKeluar || "-"}</td>
            <td><span class="badge bg-${statusBadge}">${r.status}</span></td>
            <td>
                <div class="action-buttons">
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
    document.getElementById("formTglKeluar").value = "";
    document.getElementById("modalTitle").innerText = "Daftar Rawat Inap";
    modal.show();
}

function saveRawatInap(e) {
    e.preventDefault();

    const id = document.getElementById("formId").value || Date.now().toString();
    const pasienId = document.getElementById("formPasien").value;
    const dokterId = document.getElementById("formDokter").value;
    const pasienData = getData("pasien").find(p => p.id === pasienId);

    const newData = {
        id: id,
        pasienId: pasienId,
        dokterId: dokterId,
        ruangan: document.getElementById("formRuangan").value,
        tglMasuk: document.getElementById("formTglMasuk").value,
        tglKeluar: document.getElementById("formTglKeluar").value,
        status: document.getElementById("formStatus").value
    };

    let data = getData("rawatInap");
    const existingIndex = data.findIndex(r => r.id === id);

    if (existingIndex >= 0) {
        data[existingIndex] = newData;
        if(pasienData) logActivity(pasienData.nama, "-", "Update Rawat Inap", "Selesai");
    } else {
        data.push(newData);
        if(pasienData) logActivity(pasienData.nama, "-", "Masuk Rawat Inap", "Aktif");
    }

    saveData("rawatInap", data);
    modal.hide();
    renderTable();
}

function editData(id) {
    const data = getData("rawatInap").find(r => r.id === id);
    if (!data) return;

    document.getElementById("formId").value = data.id;
    document.getElementById("formPasien").value = data.pasienId;
    document.getElementById("formDokter").value = data.dokterId;
    document.getElementById("formRuangan").value = data.ruangan;
    document.getElementById("formTglMasuk").value = data.tglMasuk;
    document.getElementById("formTglKeluar").value = data.tglKeluar;
    document.getElementById("formStatus").value = data.status;

    document.getElementById("modalTitle").innerText = "Edit Rawat Inap";
    modal.show();
}

function deleteData(id) {
    if (confirm("Yakin ingin menghapus data rawat inap ini?")) {
        let data = getData("rawatInap");
        const rawat = data.find(r => r.id === id);
        data = data.filter(r => r.id !== id);
        saveData("rawatInap", data);
        const pasien = getData("pasien").find(p => p.id === rawat?.pasienId);
        if(pasien) logActivity(pasien.nama, "-", "Hapus Data Rawat Inap", "Selesai");
        renderTable();
    }
}

document.getElementById("dataForm")?.addEventListener("submit", saveRawatInap);
