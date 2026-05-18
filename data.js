// ===== DONNÉES GLOBALES =====
let templates = [];
let currentTemplateId = null;
let configuration = {
  defaultSector: "Food",
  defaultPicto: "1+1=3",
  defaultTemplate: null,
  enablePassword: false,
  password: null
};
let modalAction = null;

// ===== INITIALISATION =====
function initApp() {
  loadTemplates();
  loadConfiguration();
  openTab("Saisie");
  selectPicto(document.querySelector('.picto-option[data-value="1+1=3"]'));
  updateTemplateList();
  updateDefaultTemplateSelect();
}

// ===== FONCTIONS POUR LES ONGLETS =====
function openTab(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(tab => tab.classList.remove("active"));

  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach(button => button.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

// ===== FONCTIONS POUR LES TEMPLATES =====
function loadTemplates() {
  const savedTemplates = localStorage.getItem("a4Templates");
  if (savedTemplates) {
    templates = JSON.parse(savedTemplates);
  } else {
    templates = [{
      id: "default",
      name: "Template par défaut",
      designationFR: "Désignation FR",
      designationAR: "التسمية العربية",
      fields: {
        designationFR: { x: 105, y: 50, fontSize: 20, align: "center" },
        designationAR: { x: 105, y: 80, fontSize: 20, align: "center" },
        gencode: { x: 105, y: 120, fontSize: 16, align: "center" },
        oldPrice: { x: 180, y: 50, fontSize: 24, align: "right" },
        promoPrice: { x: 180, y: 80, fontSize: 24, align: "right" },
        picto: { x: 20, y: 20, width: 40, height: 40 },
        loyaltyPercent: { x: 105, y: 160, fontSize: 16, align: "center" },
        difference: { x: 180, y: 120, fontSize: 18, align: "right" }
      }
    }];
    saveTemplates();
  }
  if (templates.length > 0) {
    currentTemplateId = templates[0].id;
    loadTemplate(currentTemplateId);
  }
}

function saveTemplates() {
  localStorage.setItem("a4Templates", JSON.stringify(templates));
}

function updateTemplateList() {
  const templateList = document.getElementById("templateList");
  templateList.innerHTML = "";
  templates.forEach(template => {
    const item = document.createElement("div");
    item.className = "template-item";
    if (template.id === currentTemplateId) item.classList.add("active");
    item.textContent = template.name;
    item.onclick = () => selectTemplate(template.id);
    templateList.appendChild(item);
  });
}

function selectTemplate(templateId) {
  currentTemplateId = templateId;
  loadTemplate(templateId);
  updateTemplateList();
}

function loadTemplate(templateId) {
  const template = templates.find(t => t.id === templateId);
  if (!template) return;

  document.getElementById("templateNameInput").value = template.name;
  document.getElementById("templateDesignationFRInput").value = template.designationFR;
  document.getElementById("templateDesignationARInput").value = template.designationAR;

  document.getElementById("posDesignationFRX").value = template.fields.designationFR.x;
  document.getElementById("posDesignationFRY").value = template.fields.designationFR.y;
  document.getElementById("posDesignationFRFontSize").value = template.fields.designationFR.fontSize;

  document.getElementById("posDesignationARX").value = template.fields.designationAR.x;
  document.getElementById("posDesignationARY").value = template.fields.designationAR.y;
  document.getElementById("posDesignationARFontSize").value = template.fields.designationAR.fontSize;

  document.getElementById("posGencodeX").value = template.fields.gencode.x;
  document.getElementById("posGencodeY").value = template.fields.gencode.y;
  document.getElementById("posGencodeFontSize").value = template.fields.gencode.fontSize;

  document.getElementById("posOldPriceX").value = template.fields.oldPrice.x;
  document.getElementById("posOldPriceY").value = template.fields.oldPrice.y;
  document.getElementById("posOldPriceFontSize").value = template.fields.oldPrice.fontSize;

  document.getElementById("posPromoPriceX").value = template.fields.promoPrice.x;
  document.getElementById("posPromoPriceY").value = template.fields.promoPrice.y;
  document.getElementById("posPromoPriceFontSize").value = template.fields.promoPrice.fontSize;

  document.getElementById("posPictoX").value = template.fields.picto.x;
  document.getElementById("posPictoY").value = template.fields.picto.y;
  document.getElementById("posPictoWidth").value = template.fields.picto.width;
  document.getElementById("posPictoHeight").value = template.fields.picto.height;

  document.getElementById("posLoyaltyX").value = template.fields.loyaltyPercent.x;
  document.getElementById("posLoyaltyY").value = template.fields.loyaltyPercent.y;
  document.getElementById("posLoyaltyFontSize").value = template.fields.loyaltyPercent.fontSize;

  document.getElementById("posDifferenceX").value = template.fields.difference.x;
  document.getElementById("posDifferenceY").value = template.fields.difference.y;
  document.getElementById("posDifferenceFontSize").value = template.fields.difference.fontSize;
}

function addTemplate() {
  const newId = `template_${Date.now()}`;
  const newTemplate = {
    id: newId,
    name: `Template ${templates.length + 1}`,
    designationFR: "Nouvelle désignation FR",
    designationAR: "التسمية الجديدة",
    fields: JSON.parse(JSON.stringify(templates[0].fields))
  };
  templates.push(newTemplate);
  saveTemplates();
  currentTemplateId = newId;
  updateTemplateList();
  loadTemplate(newId);
  openTab("Templates");
}

function duplicateTemplate() {
  if (!currentTemplateId) return;
  const template = templates.find(t => t.id === currentTemplateId);
  if (!template) return;

  const newId = `template_${Date.now()}`;
  const newTemplate = {
    id: newId,
    name: `${template.name} (Copie)`,
    designationFR: template.designationFR,
    designationAR: template.designationAR,
    fields: JSON.parse(JSON.stringify(template.fields))
  };
  templates.push(newTemplate);
  saveTemplates();
  currentTemplateId = newId;
  updateTemplateList();
  loadTemplate(newId);
}

function saveTemplate() {
  if (!currentTemplateId) return;
  const templateIndex = templates.findIndex(t => t.id === currentTemplateId);
  if (templateIndex === -1) return;

  templates[templateIndex] = {
    id: currentTemplateId,
    name: document.getElementById("templateNameInput").value,
    designationFR: document.getElementById("templateDesignationFRInput").value,
    designationAR: document.getElementById("templateDesignationARInput").value,
    fields: {
      designationFR: {
        x: parseInt(document.getElementById("posDesignationFRX").value) || 105,
        y: parseInt(document.getElementById("posDesignationFRY").value) || 50,
        fontSize: parseInt(document.getElementById("posDesignationFRFontSize").value) || 20,
        align: "center"
      },
      designationAR: {
        x: parseInt(document.getElementById("posDesignationARX").value) || 105,
        y: parseInt(document.getElementById("posDesignationARY").value) || 80,
        fontSize: parseInt(document.getElementById("posDesignationARFontSize").value) || 20,
        align: "center"
      },
      gencode: {
        x: parseInt(document.getElementById("posGencodeX").value) || 105,
        y: parseInt(document.getElementById("posGencodeY").value) || 120,
        fontSize: parseInt(document.getElementById("posGencodeFontSize").value) || 16,
        align: "center"
      },
      oldPrice: {
        x: parseInt(document.getElementById("posOldPriceX").value) || 180,
        y: parseInt(document.getElementById("posOldPriceY").value) || 50,
        fontSize: parseInt(document.getElementById("posOldPriceFontSize").value) || 24,
        align: "right"
      },
      promoPrice: {
        x: parseInt(document.getElementById("posPromoPriceX").value) || 180,
        y: parseInt(document.getElementById("posPromoPriceY").value) || 80,
        fontSize: parseInt(document.getElementById("posPromoPriceFontSize").value) || 24,
        align: "right"
      },
      picto: {
        x: parseInt(document.getElementById("posPictoX").value) || 20,
        y: parseInt(document.getElementById("posPictoY").value) || 20,
        width: parseInt(document.getElementById("posPictoWidth").value) || 40,
        height: parseInt(document.getElementById("posPictoHeight").value) || 40
      },
      loyaltyPercent: {
        x: parseInt(document.getElementById("posLoyaltyX").value) || 105,
        y: parseInt(document.getElementById("posLoyaltyY").value) || 160,
        fontSize: parseInt(document.getElementById("posLoyaltyFontSize").value) || 16,
        align: "center"
      },
      difference: {
        x: parseInt(document.getElementById("posDifferenceX").value) || 180,
        y: parseInt(document.getElementById("posDifferenceY").value) || 120,
        fontSize: parseInt(document.getElementById("posDifferenceFontSize").value) || 18,
        align: "right"
      }
    }
  };
  saveTemplates();
  updateTemplateList();
  showAlert("Template sauvegardé avec succès !", "success");
}

function deleteTemplate() {
  if (!currentTemplateId) return;
  if (templates.length <= 1) {
    showAlert("Vous ne pouvez pas supprimer le dernier template.", "error");
    return;
  }

  modalAction = () => {
    templates = templates.filter(t => t.id !== currentTemplateId);
    saveTemplates();
    currentTemplateId = templates[0].id;
    loadTemplate(currentTemplateId);
    updateTemplateList();
    updateDefaultTemplateSelect();
    showAlert("Template supprimé avec succès !", "success");
  };
  showModal("Supprimer le template", "Êtes-vous sûr de vouloir supprimer ce template ? Cette action est irréversible.");
}

function exportTemplates() {
  const data = JSON.stringify(templates, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "templates_a4.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importTemplates(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedTemplates = JSON.parse(e.target.result);
      templates = [...templates, ...importedTemplates];
      saveTemplates();
      updateTemplateList();
      showAlert("Templates importés avec succès !", "success");
    } catch (error) {
      showAlert("Erreur lors de l'import : " + error.message, "error");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function updateDefaultTemplateSelect() {
  const select = document.getElementById("defaultTemplateInput");
  select.innerHTML = "";
  templates.forEach(template => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.name;
    select.appendChild(option);
  });
  if (configuration.defaultTemplate) {
    select.value = configuration.defaultTemplate;
  }
}

// ===== FONCTIONS POUR LA CONFIGURATION =====
function loadConfiguration() {
  const savedConfig = localStorage.getItem("a4Configuration");
  if (savedConfig) {
    configuration = JSON.parse(savedConfig);
  }
  document.getElementById("defaultSectorInput").value = configuration.defaultSector;
  document.getElementById("defaultPictoInput").value = configuration.defaultPicto;
  document.getElementById("enablePasswordCheck").checked = configuration.enablePassword;
}

function saveConfiguration() {
  configuration.defaultSector = document.getElementById("defaultSectorInput").value;
  configuration.defaultPicto = document.getElementById("defaultPictoInput").value;
  configuration.defaultTemplate = document.getElementById("defaultTemplateInput").value;
  configuration.enablePassword = document.getElementById("enablePasswordCheck").checked;
  localStorage.setItem("a4Configuration", JSON.stringify(configuration));
  showAlert("Configuration sauvegardée avec succès !", "success");
}

// ===== FONCTIONS POUR LES PICTOS =====
function selectPicto(element) {
  const pictos = document.querySelectorAll(".picto-option");
  pictos.forEach(picto => picto.classList.remove("selected"));
  element.classList.add("selected");
  document.getElementById("pictoInput").value = element.getAttribute("data-value");
}

// ===== LOGIQUE DE CALCUL =====
function calculateDifference(oldPrice, promoPrice, sector) {
  const difference = oldPrice - promoPrice;
  if (sector === "Food") {
    return difference >= 5 ? difference.toFixed(2) : null;
  } else if (sector === "NonFood") {
    return difference >= (0.10 * oldPrice) ? difference.toFixed(2) : null;
  }
  return null;
}

// ===== FONCTIONS POUR L'EXPORT/IMPORT EXCEL =====
function exportToExcel() {
  const data = [
    ["Gencode", "Désignation FR", "Désignation AR", "Prix Barré (DH)", "Prix Promo (DH)", "Fidélité (%)", "Secteur", "Picto", "Différence (DH)"],
    [
      document.getElementById("gencodeInput").value || "",
      document.getElementById("designationFRInput").value || "",
      document.getElementById("designationARInput").value || "",
      document.getElementById("oldPriceInput").value || "",
      document.getElementById("promoPriceInput").value || "",
      document.getElementById("loyaltyPercentInput").value || "",
      document.getElementById("sectorSelect").value || "",
      document.getElementById("pictoInput").value || "",
      calculateDifference(
        parseFloat(document.getElementById("oldPriceInput").value) || 0,
        parseFloat(document.getElementById("promoPriceInput").value) || 0,
        document.getElementById("sectorSelect").value
      ) || ""
    ]
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Affichettes A4");
  XLSX.writeFile(wb, `affichettes_a4_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`);
}

function importFromExcel(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      if (jsonData.length > 1) {
        const row = jsonData[1];
        document.getElementById("gencodeInput").value = row[0] || "";
        document.getElementById("designationFRInput").value = row[1] || "";
        document.getElementById("designationARInput").value = row[2] || "";
        document.getElementById("oldPriceInput").value = row[3] || "";
        document.getElementById("promoPriceInput").value = row[4] || "";
        document.getElementById("loyaltyPercentInput").value = row[5] || "";
        document.getElementById("sectorSelect").value = row[6] || "Food";
        document.getElementById("pictoInput").value = row[7] || "1+1=3";
        selectPicto(document.querySelector(`.picto-option[data-value="${row[7] || "1+1=3"}"]`));
      }
      showAlert("Données importées avec succès !", "success");
    } catch (error) {
      showAlert("Erreur lors de l'import Excel : " + error.message, "error");
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
}

// ===== FONCTIONS POUR LA PRÉVISUALISATION ET GÉNÉRATION PDF =====
function previewA4Poster() {
  const previewContent = document.getElementById("previewContent");
  previewContent.innerHTML = "";

  const gencode = document.getElementById("gencodeInput").value || "N/A";
  const designationFR = document.getElementById("designationFRInput").value || "Désignation FR";
  const designationAR = document.getElementById("designationARInput").value || "التسمية العربية";
  const oldPrice = parseFloat(document.getElementById("oldPriceInput").value) || 0;
  const promoPrice = parseFloat(document.getElementById("promoPriceInput").value) || 0;
  const loyaltyPercent = document.getElementById("loyaltyPercentInput").value || "0";
  const picto = document.getElementById("pictoInput").value;
  const sector = document.getElementById("sectorSelect").value;
  const difference = calculateDifference(oldPrice, promoPrice, sector);

  const template = templates.find(t => t.id === currentTemplateId) || templates[0];

  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "210mm";
  container.style.height = "297mm";
  container.style.backgroundColor = "white";
  container.style.border = "1px solid #ccc";

  const frElement = document.createElement("div");
  frElement.textContent = designationFR;
  frElement.style.position = "absolute";
  frElement.style.left = `${template.fields.designationFR.x}mm`;
  frElement.style.top = `${template.fields.designationFR.y}mm`;
  frElement.style.fontSize = `${template.fields.designationFR.fontSize}px`;
  frElement.style.textAlign = template.fields.designationFR.align;
  frElement.style.fontWeight = "bold";
  frElement.style.color = "#000000";
  container.appendChild(frElement);

  const arElement = document.createElement("div");
  arElement.textContent = designationAR;
  arElement.style.position = "absolute";
  arElement.style.left = `${template.fields.designationAR.x}mm`;
  arElement.style.top = `${template.fields.designationAR.y}mm`;
  arElement.style.fontSize = `${template.fields.designationAR.fontSize}px`;
  arElement.style.textAlign = template.fields.designationAR.align;
  arElement.style.fontFamily = "'Arial', sans-serif";
  arElement.style.direction = "rtl";
  arElement.style.color = "#000000";
  container.appendChild(arElement);

  const gencodeElement = document.createElement("div");
  gencodeElement.textContent = `Gencode: ${gencode}`;
  gencodeElement.style.position = "absolute";
  gencodeElement.style.left = `${template.fields.gencode.x}mm`;
  gencodeElement.style.top = `${template.fields.gencode.y}mm`;
  gencodeElement.style.fontSize = `${template.fields.gencode.fontSize}px`;
  gencodeElement.style.textAlign = template.fields.gencode.align;
  gencodeElement.style.color = "#000000";
  container.appendChild(gencodeElement);

  const oldPriceElement = document.createElement("div");
  oldPriceElement.innerHTML = `<s style="color: #ff0000;">Prix barré: ${oldPrice.toFixed(2)} DH</s>`;
  oldPriceElement.style.position = "absolute";
  oldPriceElement.style.left = `${template.fields.oldPrice.x}mm`;
  oldPriceElement.style.top = `${template.fields.oldPrice.y}mm`;
  oldPriceElement.style.fontSize = `${template.fields.oldPrice.fontSize}px`;
  oldPriceElement.style.textAlign = template.fields.oldPrice.align;
  container.appendChild(oldPriceElement);

  const promoPriceElement = document.createElement("div");
  promoPriceElement.innerHTML = `<strong style="color: #00aa00;">Prix promo: ${promoPrice.toFixed(2)} DH</strong>`;
  promoPriceElement.style.position = "absolute";
  promoPriceElement.style.left = `${template.fields.promoPrice.x}mm`;
  promoPriceElement.style.top = `${template.fields.promoPrice.y}mm`;
  promoPriceElement.style.fontSize = `${template.fields.promoPrice.fontSize}px`;
  promoPriceElement.style.textAlign = template.fields.promoPrice.align;
  container.appendChild(promoPriceElement);

  const pictoElement = document.createElement("div");
  pictoElement.textContent = picto;
  pictoElement.style.position = "absolute";
  pictoElement.style.left = `${template.fields.picto.x}mm`;
  pictoElement.style.top = `${template.fields.picto.y}mm`;
  pictoElement.style.width = `${template.fields.picto.width}mm`;
  pictoElement.style.height = `${template.fields.picto.height}mm`;
  pictoElement.style.backgroundColor = "#ff9800";
  pictoElement.style.color = "white";
  pictoElement.style.display = "flex";
  pictoElement.style.alignItems = "center";
  pictoElement.style.justifyContent = "center";
  pictoElement.style.fontWeight = "bold";
  pictoElement.style.fontSize = "12px";
  pictoElement.style.borderRadius = "4px";
  container.appendChild(pictoElement);

  const loyaltyElement = document.createElement("div");
  loyaltyElement.textContent = `Fidélité: ${loyaltyPercent}%`;
  loyaltyElement.style.position = "absolute";
  loyaltyElement.style.left = `${template.fields.loyaltyPercent.x}mm`;
  loyaltyElement.style.top = `${template.fields.loyaltyPercent.y}mm`;
  loyaltyElement.style.fontSize = `${template.fields.loyaltyPercent.fontSize}px`;
  loyaltyElement.style.textAlign = template.fields.loyaltyPercent.align;
  loyaltyElement.style.color = "#000000";
  container.appendChild(loyaltyElement);

  if (difference !== null) {
    const diffElement = document.createElement("div");
    diffElement.textContent = `Économie: ${difference} DH`;
    diffElement.style.position = "absolute";
    diffElement.style.left = `${template.fields.difference.x}mm`;
    diffElement.style.top = `${template.fields.difference.y}mm`;
    diffElement.style.fontSize = `${template.fields.difference.fontSize}px`;
    diffElement.style.textAlign = template.fields.difference.align;
    diffElement.style.color = "#0000ff";
    diffElement.style.fontWeight = "bold";
    container.appendChild(diffElement);
  }

  previewContent.appendChild(container);
}

async function generateA4Poster() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "mm",
    format: "a4"
  });

  const gencode = document.getElementById("gencodeInput").value || "N/A";
  const designationFR = document.getElementById("designationFRInput").value || "Désignation FR";
  const designationAR = document.getElementById("designationARInput").value || "التسمية العربية";
  const oldPrice = parseFloat(document.getElementById("oldPriceInput").value) || 0;
  const promoPrice = parseFloat(document.getElementById("promoPriceInput").value) || 0;
  const loyaltyPercent = document.getElementById("loyaltyPercentInput").value || "0";
  const picto = document.getElementById("pictoInput").value;
  const sector = document.getElementById("sectorSelect").value;
  const difference = calculateDifference(oldPrice, promoPrice, sector);

  const template = templates.find(t => t.id === currentTemplateId) || templates[0];

  doc.setFontSize(template.fields.designationFR.fontSize);
  doc.text(designationFR, template.fields.designationFR.x, template.fields.designationFR.y, {
    align: template.fields.designationFR.align
  });

  doc.setFontSize(template.fields.designationAR.fontSize);
  doc.text(designationAR, template.fields.designationAR.x, template.fields.designationAR.y, {
    align: template.fields.designationAR.align
  });

  doc.setFontSize(template.fields.gencode.fontSize);
  doc.text(`Gencode: ${gencode}`, template.fields.gencode.x, template.fields.gencode.y, {
    align: template.fields.gencode.align
  });

  doc.setFontSize(template.fields.oldPrice.fontSize);
  doc.setTextColor(255, 0, 0);
  doc.text(`Prix barré: ${oldPrice.toFixed(2)} DH`, template.fields.oldPrice.x, template.fields.oldPrice.y, {
    align: template.fields.oldPrice.align
  });
  doc.setDrawColor(255, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(
    template.fields.oldPrice.x - 5,
    template.fields.oldPrice.y + 2,
    template.fields.oldPrice.x + doc.getTextWidth(`Prix barré: ${oldPrice.toFixed(2)} DH`) + 5,
    template.fields.oldPrice.y + 2
  );
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(template.fields.promoPrice.fontSize);
  doc.setTextColor(0, 170, 0);
  doc.text(`Prix promo: ${promoPrice.toFixed(2)} DH`, template.fields.promoPrice.x, template.fields.promoPrice.y, {
    align: template.fields.promoPrice.align
  });
  doc.setTextColor(0, 0, 0);

  doc.setFillColor(255, 152, 0);
  doc.rect(
    template.fields.picto.x,
    template.fields.picto.y,
    template.fields.picto.width,
    template.fields.picto.height,
    "F"
  );
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text(
    picto,
    template.fields.picto.x + template.fields.picto.width / 2,
    template.fields.picto.y + template.fields.picto.height / 2,
    { align: "center", baseline: "middle" }
  );
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(template.fields.loyaltyPercent.fontSize);
  doc.text(`Fidélité: ${loyaltyPercent}%`, template.fields.loyaltyPercent.x, template.fields.loyaltyPercent.y, {
    align: template.fields.loyaltyPercent.align
  });

  if (difference !== null) {
    doc.setFontSize(template.fields.difference.fontSize);
    doc.setTextColor(0, 0, 255);
    doc.text(`Économie: ${difference} DH`, template.fields.difference.x, template.fields.difference.y, {
      align: template.fields.difference.align
    });
    doc.setTextColor(0, 0, 0);
  }

  const fileName = `A4_${template.name || "affichette"}_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
  doc.save(fileName);
  showAlert(`PDF généré avec succès : ${fileName}`, "success");
}

// ===== FONCTIONS POUR LA GESTION DU MOT DE PASSE =====
function changePassword() {
  const currentPassword = document.getElementById("currentPasswordInput").value;
  const newPassword = document.getElementById("newPasswordInput").value;
  const confirmPassword = document.getElementById("confirmPasswordInput").value;
  const messageElement = document.getElementById("passwordMessage");

  if (!configuration.enablePassword) {
    messageElement.innerHTML = '<div class="alert alert-error">La protection par mot de passe est désactivée.</div>';
    return;
  }

  if (!currentPassword) {
    messageElement.innerHTML = '<div class="alert alert-error">Veuillez saisir le mot de passe actuel.</div>';
    return;
  }

  if (currentPassword !== configuration.password) {
    messageElement.innerHTML = '<div class="alert alert-error">Mot de passe actuel incorrect.</div>';
    return;
  }

  if (!newPassword) {
    messageElement.innerHTML = '<div class="alert alert-error">Veuillez saisir un nouveau mot de passe.</div>';
    return;
  }

  if (newPassword !== confirmPassword) {
    messageElement.innerHTML = '<div class="alert alert-error">Les nouveaux mots de passe ne correspondent pas.</div>';
    return;
  }

  configuration.password = newPassword;
  localStorage.setItem("a4Configuration", JSON.stringify(configuration));
  messageElement.innerHTML = '<div class="alert alert-success">Mot de passe changé avec succès !</div>';
  document.getElementById("currentPasswordInput").value = "";
  document.getElementById("newPasswordInput").value = "";
  document.getElementById("confirmPasswordInput").value = "";
}

function savePasswordSettings() {
  configuration.enablePassword = document.getElementById("enablePasswordCheck").checked;
  localStorage.setItem("a4Configuration", JSON.stringify(configuration));
  showAlert("Paramètres de sécurité sauvegardés avec succès !", "success");
}

// ===== FONCTIONS UTILITAIRES =====
function showModal(title, message) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  modalAction = null;
}

function confirmModalAction() {
  if (modalAction) {
    modalAction();
  }
  closeModal();
}

function showAlert(message, type) {
  const alertElement = document.createElement("div");
  alertElement.className = `alert alert-${type}`;
  alertElement.textContent = message;

  const activeTab = document.querySelector(".tab-content.active");
  if (activeTab) {
    const firstSection = activeTab.querySelector(".section");
    if (firstSection) {
      firstSection.insertBefore(alertElement, firstSection.firstChild);
    } else {
      activeTab.insertBefore(alertElement, activeTab.firstChild);
    }
  }

  setTimeout(() => {
    alertElement.remove();
  }, 5000);
}

// ===== INITIALISATION AU CHARGEMENT =====
window.onload = initApp;