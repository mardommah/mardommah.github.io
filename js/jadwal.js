let modal;

document.addEventListener("DOMContentLoaded", () => {
    modal = new bootstrap.Modal(document.getElementById('formModal'));
    loadDokterSelect();
    renderTable();
});

function loadDokterSelect() {
    const dokter = getData("dokter");
    const formDokter = document.getElementById("formDokter");
    const filterDokter = document.getElementById("filterDokter");

    formDokter.innerHTML = '<option value="">Pilih Dokter</option>';
    filterDokter.innerHTML = '<option value="">Semua Dokter</option>';

    dokter.forEach(d => {
        const option1 = document.createElement("option");
        option1.value = d.id;
        option1.textContent = d.nama;
        formDokter.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = d.id;
        option2.textContent = d.nama;
        filterDokter.appendChild(option2);
    });
}

function renderTable(filterValue = "") {
    const data = getData("jadwal");
    const dokter = getData("dokter");
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const filter = document.getElementById("filterDokter").value || filterValue;
    const filteredData = filter ? data.filter(j => j.dokterId === filter) : data;

    if (filteredData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">Tidak ada jadwal</td></tr>`;
        return;
    }

    filteredData.forEach(j => {
        const dokterData = dokter.find(d => d.id === j.dokterId);
        const dokterNama = dokterData ? dokterData.nama : "-";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${dokterNama}</td>
            <td>${j.hari}</td>
            <td>${j.jamMulai}</td>
            <td>${j.jamSelesai}</td>
            <td>${j.ruangan}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-warning text-white" onclick="editData('${j.id}')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteData('${j.id}')"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openModal() {
    document.getElementById("dataForm").reset();
    document.getElementById("formId").value = "";
    document.getElementById("modalTitle").innerText = "Tambah Jadwal";
    modal.show();
}

function saveJadwal(e) {
    e.preventDefault();

    const id = document.getElementById("formId").value || Date.now().toString();
    const dokterId = document.getElementById("formDokter").value;
    const dokter = getData("dokter").find(d => d.id === dokterId);

    const newData = {
        id: id,
        dokterId: dokterId,
        hari: document.getElementById("formHari").value,
        jamMulai: document.getElementById("formJamMulai").value,
        jamSelesai: document.getElementById("formJamSelesai").value,
        ruangan: document.getElementById("formRuangan").value
    };

    let data = getData("jadwal");
    const existingIndex = data.findIndex(j => j.id === id);

    if (existingIndex >= 0) {
        data[existingIndex] = newData;
        if(dokter) logActivity("-", dokter.nama, "Update Jadwal Praktek", "Selesai");
    } else {
        data.push(newData);
        if(dokter) logActivity("-", dokter.nama, "Tambah Jadwal Praktek", "Selesai");
    }

    saveData("jadwal", data);
    modal.hide();
    renderTable();
}

function editData(id) {
    const data = getData("jadwal").find(j => j.id === id);
    if (!data) return;

    document.getElementById("formId").value = data.id;
    document.getElementById("formDokter").value = data.dokterId;
    document.getElementById("formHari").value = data.hari;
    document.getElementById("formJamMulai").value = data.jamMulai;
    document.getElementById("formJamSelesai").value = data.jamSelesai;
    document.getElementById("formRuangan").value = data.ruangan;

    document.getElementById("modalTitle").innerText = "Edit Jadwal";
    modal.show();
}

function deleteData(id) {
    if (confirm("Yakin ingin menghapus jadwal ini?")) {
        let data = getData("jadwal");
        const jadwal = data.find(j => j.id === id);
        data = data.filter(j => j.id !== id);
        saveData("jadwal", data);
        const dokter = getData("dokter").find(d => d.id === jadwal?.dokterId);
        if(dokter) logActivity("-", dokter.nama, "Hapus Jadwal Praktek", "Selesai");
        renderTable();
    }
}

document.getElementById("dataForm")?.addEventListener("submit", saveJadwal);
