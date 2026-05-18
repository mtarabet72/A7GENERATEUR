// ===== DONNÉES GLOBALES =====
let templates = [];
let currentTemplateId = null;
let configuration = {
    defaultUnit: "pièce",
    defaultTemplate: null,
    enablePassword: false,
    password: null,
    autoSave: false
};
let modalAction = null;
let productQueue = [];
let productBase = [];
let productHistory = [];

// ===== INITIALISATION =====
function initApp() {
    loadTemplates();
    loadConfiguration();
    loadQueue();
    loadBase();
    loadHistory();
    openTab(null, "Saisie");
    updateTemplateList();
    updateDefaultTemplateSelect();
    updateAllCounters();
    setupDropZone();
    setupKeyboardShortcuts();
}

// ===== FONCTIONS POUR LES ONGLETS =====
function openTab(event, tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(tab => tab.classList.remove("active"));
    
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(button => button.classList.remove("active"));
    
    document.getElementById(tabName).classList.add("active");
    
    if (event && event.target) {
        event.target.classList.add("active");
    } else {
        document.querySelector(`[onclick*="${tabName}"]`).classList.add("active");
    }
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
            fields: {
                price: { x: 105, y: 120, fontSize: 72, align: "center", color: "#FF6600" },
                unit: { x: 105, y: 180, fontSize: 24, align: "center", color: "#F5E6C8" },
                gencode: { x: 105, y: 250, fontSize: 16, align: "center", color: "#FFFFFF" },
                loyaltyPercent: { x: 105, y: 270, fontSize: 14, align: "center", color: "#FFFFFF" }
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
    const templateSelect = document.getElementById("templateSelect");
    
    templateList.innerHTML = "";
    templateSelect.innerHTML = '<option value="Auto">Auto</option>';
    
    templates.forEach(template => {
        // Liste
        const item = document.createElement("div");
        item.className = "template-item";
        if (template.id === currentTemplateId) item.classList.add("active");
        item.textContent = template.name;
        item.onclick = () => selectTemplate(template.id);
        templateList.appendChild(item);
        
        // Select
        const option = document.createElement("option");
        option.value = template.id;
        option.textContent = template.name;
        templateSelect.appendChild(option);
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
    
    // Charger les positions
    document.getElementById("posPriceX").value = template.fields.price.x;
    document.getElementById("posPriceY").value = template.fields.price.y;
    document.getElementById("posPriceFontSize").value = template.fields.price.fontSize;
    
    document.getElementById("posUnitX").value = template.fields.unit.x;
    document.getElementById("posUnitY").value = template.fields.unit.y;
    document.getElementById("posUnitFontSize").value = template.fields.unit.fontSize;
    
    document.getElementById("posGencodeX").value = template.fields.gencode.x;
    document.getElementById("posGencodeY").value = template.fields.gencode.y;
    document.getElementById("posGencodeFontSize").value = template.fields.gencode.fontSize;
    
    document.getElementById("posLoyaltyX").value = template.fields.loyaltyPercent.x;
    document.getElementById("posLoyaltyY").value = template.fields.loyaltyPercent.y;
    document.getElementById("posLoyaltyFontSize").value = template.fields.loyaltyPercent.fontSize;
}

function addTemplate() {
    const newId = `template_${Date.now()}`;
    const newTemplate = {
        id: newId,
        name: `Template ${templates.length + 1}`,
        fields: JSON.parse(JSON.stringify(templates[0].fields))
    };
    
    templates.push(newTemplate);
    saveTemplates();
    currentTemplateId = newId;
    updateTemplateList();
    loadTemplate(newId);
    openTab(null, "Templates");
}

function duplicateTemplate() {
    if (!currentTemplateId) return;
    
    const template = templates.find(t => t.id === currentTemplateId);
    if (!template) return;
    
    const newId = `template_${Date.now()}`;
    const newTemplate = {
        id: newId,
        name: `${template.name} (Copie)`,
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
        fields: {
            price: {
                x: parseInt(document.getElementById("posPriceX").value) || 105,
                y: parseInt(document.getElementById("posPriceY").value) || 120,
                fontSize: parseInt(document.getElementById("posPriceFontSize").value) || 72,
                align: "center",
                color: document.getElementById("colorPrice").value
            },
            unit: {
                x: parseInt(document.getElementById("posUnitX").value) || 105,
                y: parseInt(document.getElementById("posUnitY").value) || 180,
                fontSize: parseInt(document.getElementById("posUnitFontSize").value) || 24,
                align: "center",
                color: document.getElementById("colorUnit").value
            },
            gencode: {
                x: parseInt(document.getElementById("posGencodeX").value) || 105,
                y: parseInt(document.getElementById("posGencodeY").value) || 250,
                fontSize: parseInt(document.getElementById("posGencodeFontSize").value) || 16,
                align: "center",
                color: "#FFFFFF"
            },
            loyaltyPercent: {
                x: parseInt(document.getElementById("posLoyaltyX").value) || 105,
                y: parseInt(document.getElementById("posLoyaltyY").value) || 270,
                fontSize: parseInt(document.getElementById("posLoyaltyFontSize").value) || 14,
                align: "center",
                color: "#FFFFFF"
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
    
    document.getElementById("defaultUnitInput").value = configuration.defaultUnit;
    document.getElementById("enablePasswordCheck").checked = configuration.enablePassword;
    document.getElementById("autoSaveCheck").checked = configuration.autoSave;
}

function saveConfiguration() {
    configuration.defaultUnit = document.getElementById("defaultUnitInput").value;
    configuration.defaultTemplate = document.getElementById("defaultTemplateInput").value;
    configuration.enablePassword = document.getElementById("enablePasswordCheck").checked;
    configuration.autoSave = document.getElementById("autoSaveCheck").checked;
    
    localStorage.setItem("a4Configuration", JSON.stringify(configuration));
    showAlert("Configuration sauvegardée avec succès !", "success");
}

// ===== FONCTIONS POUR LA FILE D'ATTENTE =====
function addToQueue() {
    const gencode = document.getElementById("gencodeInput").value;
    const price = document.getElementById("priceInput").value;
    const unit = document.getElementById("unitSelect").value;
    const loyalty = document.getElementById("loyaltyPercentInput").value;
    const template = document.getElementById("templateSelect").value;
    
    if (!gencode || !price) {
        showAlert("Veuillez remplir au moins le code produit et le prix.", "error");
        return;
    }
    
    const product = {
        id: Date.now(),
        gencode: gencode,
        price: parseFloat(price),
        unit: unit,
        loyalty: parseFloat(loyalty) || 0,
        template: template,
        colors: {
            designation: document.getElementById("colorDesignation").value,
            price: document.getElementById("colorPrice").value,
            unit: document.getElementById("colorUnit").value
        },
        timestamp: new Date().toISOString()
    };
    
    productQueue.push(product);
    saveQueue();
    updateQueueDisplay();
    clearForm();
    showAlert("Produit ajouté à la file !", "success");
}

function loadQueue() {
    const saved = localStorage.getItem("a4Queue");
    if (saved) {
        productQueue = JSON.parse(saved);
    }
}

function saveQueue() {
    localStorage.setItem("a4Queue", JSON.stringify(productQueue));
}

function updateQueueDisplay() {
    const queueList = document.getElementById("queueList");
    const badge = document.getElementById("fileBadge");
    const fileCount = document.getElementById("fileCount");
    
    badge.textContent = productQueue.length;
    fileCount.textContent = productQueue.length;
    
    if (productQueue.length === 0) {
        queueList.innerHTML = '<p class="empty-message">Aucun produit dans la file d\'attente</p>';
        return;
    }
    
    queueList.innerHTML = "";
    productQueue.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "queue-item";
        item.innerHTML = `
            <div class="item-info">
                <div class="item-code">${product.gencode}</div>
                <div class="item-details">${product.price.toFixed(2)} DH · ${product.unit} · Fidélité: ${product.loyalty}%</div>
            </div>
            <div class="item-actions">
                <button class="button" onclick="generateSinglePDF(${index})">📄 PDF</button>
                <button class="button-secondary" onclick="editQueueItem(${index})">✏️</button>
                <button class="button-danger" onclick="removeFromQueue(${index})">🗑️</button>
            </div>
        `;
        queueList.appendChild(item);
    });
}

function removeFromQueue(index) {
    productQueue.splice(index, 1);
    saveQueue();
    updateQueueDisplay();
    showAlert("Produit retiré de la file.", "success");
}

function clearQueue() {
    modalAction = () => {
        productQueue = [];
        saveQueue();
        updateQueueDisplay();
        showAlert("File d'attente vidée.", "success");
    };
    showModal("Vider la file", "Êtes-vous sûr de vouloir vider toute la file d'attente ?");
}

// ===== FONCTIONS POUR LA BASE DE DONNÉES =====
function loadBase() {
    const saved = localStorage.getItem("a4Base");
    if (saved) {
        productBase = JSON.parse(saved);
    }
}

function saveBase() {
    localStorage.setItem("a4Base", JSON.stringify(productBase));
}

function saveToBase() {
    const gencode = document.getElementById("gencodeInput").value;
    const price = document.getElementById("priceInput").value;
    
    if (!gencode || !price) {
        showAlert("Veuillez remplir au moins le code produit et le prix.", "error");
        return;
    }
    
    const product = {
        id: Date.now(),
        gencode: gencode,
        price: parseFloat(price),
        unit: document.getElementById("unitSelect").value,
        loyalty: parseFloat(document.getElementById("loyaltyPercentInput").value) || 0,
        timestamp: new Date().toISOString()
    };
    
    productBase.push(product);
    saveBase();
    updateBaseDisplay();
    showAlert("Produit sauvegardé dans la base !", "success");
}

function updateBaseDisplay() {
    const baseList = document.getElementById("baseList");
    const baseCount = document.getElementById("baseCount");
    
    baseCount.textContent = productBase.length;
    
    if (productBase.length === 0) {
        baseList.innerHTML = '<p class="empty-message">Aucune donnée dans la base</p>';
        return;
    }
    
    baseList.innerHTML = "";
    productBase.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "base-item";
        item.innerHTML = `
            <div class="item-info">
                <div class="item-code">${product.gencode}</div>
                <div class="item-details">${product.price.toFixed(2)} DH · ${product.unit}</div>
            </div>
            <div class="item-actions">
                <button class="button" onclick="loadFromBase(${index})">📋 Charger</button>
                <button class="button-danger" onclick="removeFromBase(${index})">🗑️</button>
            </div>
        `;
        baseList.appendChild(item);
    });
}

function loadFromBase(index) {
    const product = productBase[index];
    document.getElementById("gencodeInput").value = product.gencode;
    document.getElementById("priceInput").value = product.price;
    document.getElementById("unitSelect").value = product.unit;
    document.getElementById("loyaltyPercentInput").value = product.loyalty;
    updatePreview();
    openTab(null, "Saisie");
    showAlert("Données chargées depuis la base !", "success");
}

function removeFromBase(index) {
    productBase.splice(index, 1);
    saveBase();
    updateBaseDisplay();
    showAlert("Produit retiré de la base.", "success");
}

function clearBase() {
    modalAction = () => {
        productBase = [];
        saveBase();
        updateBaseDisplay();
        showAlert("Base de données vidée.", "success");
    };
    showModal("Vider la base", "Êtes-vous sûr de vouloir vider toute la base de données ?");
}

// ===== FONCTIONS POUR L'HISTORIQUE =====
function loadHistory() {
    const saved = localStorage.getItem("a4History");
    if (saved) {
        productHistory = JSON.parse(saved);
    }
}

function saveHistory() {
    localStorage.setItem("a4History", JSON.stringify(productHistory));
}

function addToHistory(product) {
    productHistory.unshift({
        ...product,
        timestamp: new Date().toISOString()
    });
    
    // Limiter l'historique à 100 éléments
    if (productHistory.length > 100) {
        productHistory = productHistory.slice(0, 100);
    }
    
    saveHistory();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById("historyList");
    
    if (productHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">Aucun élément dans l\'historique</p>';
        return;
    }
    
    historyList.innerHTML = "";
    productHistory.forEach((product, index) => {
        const date = new Date(product.timestamp);
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML = `
            <div class="item-info">
                <div class="item-code">${product.gencode}</div>
                <div class="item-details">${product.price.toFixed(2)} DH · ${date.toLocaleString()}</div>
            </div>
            <div class="item-actions">
                <button class="button" onclick="loadFromHistory(${index})">📋 Recharger</button>
            </div>
        `;
        historyList.appendChild(item);
    });
}

function loadFromHistory(index) {
    const product = productHistory[index];
    document.getElementById("gencodeInput").value = product.gencode;
    document.getElementById("priceInput").value = product.price;
    document.getElementById("unitSelect").value = product.unit;
    document.getElementById("loyaltyPercentInput").value = product.loyalty;
    updatePreview();
    openTab(null, "Saisie");
    showAlert("Données rechargées depuis l'historique !", "success");
}

function clearHistory() {
    modalAction = () => {
        productHistory = [];
        saveHistory();
        updateHistoryDisplay();
        showAlert("Historique vidé.", "success");
    };
    showModal("Vider l'historique", "Êtes-vous sûr de vouloir vider tout l'historique ?");
}

// ===== FONCTIONS DE PRÉVISUALISATION =====
function updatePreview() {
    const previewContent = document.getElementById("previewContent");
    previewContent.innerHTML = "";
    
    const gencode = document.getElementById("gencodeInput").value;
    const price = parseFloat(document.getElementById("priceInput").value);
    const unit = document.getElementById("unitSelect").value;
    const loyalty = document.getElementById("loyaltyPercentInput").value;
    
    if (!price) {
        previewContent.innerHTML = '<p class="preview-placeholder">— CODE —</p>';
        return;
    }
    
    const templateId = document.getElementById("templateSelect").value;
    let template;
    
    if (templateId === "Auto") {
        template = templates[0];
    } else {
        template = templates.find(t => t.id === templateId) || templates[0];
    }
    
    const colorPrice = document.getElementById("colorPrice").value;
    const colorUnit = document.getElementById("colorUnit").value;
    
    // Prix
    const priceElement = document.createElement("div");
    priceElement.textContent = `${price.toFixed(2)}`;
    priceElement.style.position = "absolute";
    priceElement.style.left = `${template.fields.price.x}mm`;
    priceElement.style.top = `${template.fields.price.y}mm`;
    priceElement.style.fontSize = `${template.fields.price.fontSize}px`;
    priceElement.style.fontWeight = "bold";
    priceElement.style.color = colorPrice;
    priceElement.style.textAlign = "center";
    priceElement.style.transform = "translateX(-50%)";
    previewContent.appendChild(priceElement);
    
    // Unité
    const unitElement = document.createElement("div");
    unitElement.textContent = unit;
    unitElement.style.position = "absolute";
    unitElement.style.left = `${template.fields.unit.x}mm`;
    unitElement.style.top = `${template.fields.unit.y}mm`;
    unitElement.style.fontSize = `${template.fields.unit.fontSize}px`;
    unitElement.style.color = colorUnit;
    unitElement.style.textAlign = "center";
    unitElement.style.transform = "translateX(-50%)";
    previewContent.appendChild(unitElement);
    
    // Gencode
    if (gencode) {
        const gencodeElement = document.createElement("div");
        gencodeElement.textContent = gencode;
        gencodeElement.style.position = "absolute";
        gencodeElement.style.left = `${template.fields.gencode.x}mm`;
        gencodeElement.style.top = `${template.fields.gencode.y}mm`;
        gencodeElement.style.fontSize = `${template.fields.gencode.fontSize}px`;
        gencodeElement.style.color = "#FFFFFF";
        gencodeElement.style.textAlign = "center";
        gencodeElement.style.transform = "translateX(-50%)";
        previewContent.appendChild(gencodeElement);
    }
    
    // Fidélité
    if (loyalty && parseFloat(loyalty) > 0) {
        const loyaltyElement = document.createElement("div");
        loyaltyElement.textContent = `Fidélité: ${loyalty}%`;
        loyaltyElement.style.position = "absolute";
        loyaltyElement.style.left = `${template.fields.loyaltyPercent.x}mm`;
        loyaltyElement.style.top = `${template.fields.loyaltyPercent.y}mm`;
        loyaltyElement.style.fontSize = `${template.fields.loyaltyPercent.fontSize}px`;
        loyaltyElement.style.color = "#FFFFFF";
        loyaltyElement.style.textAlign = "center";
        loyaltyElement.style.transform = "translateX(-50%)";
        previewContent.appendChild(loyaltyElement);
    }
}

// ===== GÉNÉRATION PDF =====
async function generateA4Poster() {
    const gencode = document.getElementById("gencodeInput").value;
    const price = parseFloat(document.getElementById("priceInput").value);
    
    if (!price) {
        showAlert("Veuillez saisir au moins un prix.", "error");
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait"
    });
    
    const unit = document.getElementById("unitSelect").value;
    const loyalty = document.getElementById("loyaltyPercentInput").value;
    
    const templateId = document.getElementById("templateSelect").value;
    let template;
    
    if (templateId === "Auto") {
        template = templates[0];
    } else {
        template = templates.find(t => t.id === templateId) || templates[0];
    }
    
    // Fond noir
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, "F");
    
    // Prix
    doc.setFontSize(template.fields.price.fontSize);
    doc.setTextColor(template.fields.price.color);
    doc.text(`${price.toFixed(2)}`, template.fields.price.x, template.fields.price.y, {
        align: "center"
    });
    
    // Unité
    doc.setFontSize(template.fields.unit.fontSize);
    doc.setTextColor(template.fields.unit.color);
    doc.text(unit, template.fields.unit.x, template.fields.unit.y, {
        align: "center"
    });
    
    // Gencode
    if (gencode) {
        doc.setFontSize(template.fields.gencode.fontSize);
        doc.setTextColor(255, 255, 255);
        doc.text(gencode, template.fields.gencode.x, template.fields.gencode.y, {
            align: "center"
        });
    }
    
    // Fidélité
    if (loyalty && parseFloat(loyalty) > 0) {
        doc.setFontSize(template.fields.loyaltyPercent.fontSize);
        doc.setTextColor(255, 255, 255);
        doc.text(`Fidélité: ${loyalty}%`, template.fields.loyaltyPercent.x, template.fields.loyaltyPercent.y, {
            align: "center"
        });
    }
    
    const fileName = `A4_${gencode || 'affichette'}_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
    doc.save(fileName);
    
    // Ajouter à l'historique
    addToHistory({
        gencode: gencode,
        price: price,
        unit: unit,
        loyalty: parseFloat(loyalty) || 0
    });
    
    showAlert(`PDF généré avec succès : ${fileName}`, "success");
}

function generateSinglePDF(index) {
    const product = productQueue[index];
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait"
    });
    
    let template;
    if (product.template === "Auto") {
        template = templates[0];
    } else {
        template = templates.find(t => t.id === product.template) || templates[0];
    }
    
    // Fond noir
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, "F");
    
    // Prix
    doc.setFontSize(template.fields.price.fontSize);
    doc.setTextColor(product.colors.price);
    doc.text(`${product.price.toFixed(2)}`, template.fields.price.x, template.fields.price.y, {
        align: "center"
    });
    
    // Unité
    doc.setFontSize(template.fields.unit.fontSize);
    doc.setTextColor(product.colors.unit);
    doc.text(product.unit, template.fields.unit.x, template.fields.unit.y, {
        align: "center"
    });
    
    // Gencode
    if (product.gencode) {
        doc.setFontSize(template.fields.gencode.fontSize);
        doc.setTextColor(255, 255, 255);
        doc.text(product.gencode, template.fields.gencode.x, template.fields.gencode.y, {
            align: "center"
        });
    }
    
    // Fidélité
    if (product.loyalty > 0) {
        doc.setFontSize(template.fields.loyaltyPercent.fontSize);
        doc.setTextColor(255, 255, 255);
        doc.text(`Fidélité: ${product.loyalty}%`, template.fields.loyaltyPercent.x, template.fields.loyaltyPercent.y, {
            align: "center"
        });
    }
    
    const fileName = `A4_${product.gencode}_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
    doc.save(fileName);
    
    addToHistory(product);
    showAlert(`PDF généré : ${fileName}`, "success");
}

function generateAllPDF() {
    if (productQueue.length === 0) {
        showAlert("La file d'attente est vide.", "error");
        return;
    }
    
    productQueue.forEach((product, index) => {
        setTimeout(() => {
            generateSinglePDF(index);
        }, index * 500);
    });
    
    showAlert(`Génération de ${productQueue.length} PDF en cours...`, "success");
}

// ===== FONCTIONS EXCEL =====
function exportFileToExcel() {
    if (productQueue.length === 0) {
        showAlert("La file d'attente est vide.", "error");
        return;
    }
    
    const data = [
        ["Code", "Prix (DH)", "Unité", "Fidélité (%)", "Template", "Date"],
        ...productQueue.map(p => [
            p.gencode,
            p.price,
            p.unit,
            p.loyalty,
            p.template,
            new Date(p.timestamp).toLocaleString()
        ])
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "File A4");
    XLSX.writeFile(wb, `file_a4_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`);
}

function exportBaseToExcel() {
    if (productBase.length === 0) {
        showAlert("La base de données est vide.", "error");
        return;
    }
    
    const data = [
        ["Code", "Prix (DH)", "Unité", "Fidélité (%)", "Date"],
        ...productBase.map(p => [
            p.gencode,
            p.price,
            p.unit,
            p.loyalty,
            new Date(p.timestamp).toLocaleString()
        ])
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Base A4");
    XLSX.writeFile(wb, `base_a4_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`);
}

function exportHistoryToExcel() {
    if (productHistory.length === 0) {
        showAlert("L'historique est vide.", "error");
        return;
    }
    
    const data = [
        ["Code", "Prix (DH)", "Unité", "Fidélité (%)", "Date"],
        ...productHistory.map(p => [
            p.gencode,
            p.price,
            p.unit,
            p.loyalty,
            new Date(p.timestamp).toLocaleString()
        ])
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Historique A4");
    XLSX.writeFile(wb, `historique_a4_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`);
}

function exportAllToExcel() {
    const data = [
        ["Source", "Code", "Prix (DH)", "Unité", "Fidélité (%)", "Date"],
        ...productQueue.map(p => ["File", p.gencode, p.price, p.unit, p.loyalty, new Date(p.timestamp).toLocaleString()]),
        ...productBase.map(p => ["Base", p.gencode, p.price, p.unit, p.loyalty, new Date(p.timestamp).toLocaleString()]),
        ...productHistory.map(p => ["Historique", p.gencode, p.price, p.unit, p.loyalty, new Date(p.timestamp).toLocaleString()])
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Données A4");
    XLSX.writeFile(wb, `export_complet_a4_${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`);
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
            
            let importCount = 0;
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (row[0] && row[1]) {
                    const product = {
                        id: Date.now() + i,
                        gencode: row[0],
                        price: parseFloat(row[1]),
                        unit: row[2] || "pièce",
                        loyalty: parseFloat(row[3]) || 0,
                        template: row[4] || "Auto",
                        colors: {
                            designation: "#FFFFFF",
                            price: "#FF6600",
                            unit: "#F5E6C8"
                        },
                        timestamp: new Date().toISOString()
                    };
                    productQueue.push(product);
                    importCount++;
                }
            }
            
            saveQueue();
            updateQueueDisplay();
            showAlert(`${importCount} produits importés avec succès !`, "success");
        } catch (error) {
            showAlert("Erreur lors de l'import Excel : " + error.message, "error");
        }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = "";
}

// ===== FONCTIONS UTILITAIRES =====
function clearForm() {
    document.getElementById("gencodeInput").value = "";
    document.getElementById("priceInput").value = "";
    document.getElementById("loyaltyPercentInput").value = "";
    document.getElementById("gencodeInput").focus();
    updatePreview();
}

function resetColors() {
    document.getElementById("colorDesignation").value = "#FFFFFF";
    document.getElementById("colorPrice").value = "#FF6600";
    document.getElementById("colorUnit").value = "#F5E6C8";
    updatePreview();
}

function applyColors() {
    updatePreview();
    showAlert("Couleurs appliquées !", "success");
}

function focusGencode() {
    document.getElementById("gencodeInput").focus();
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        addToQueue();
    }
}

function updateAllCounters() {
    updateQueueDisplay();
    updateBaseDisplay();
    updateHistoryDisplay();
}

function saveData() {
    const data = {
        queue: productQueue,
        base: productBase,
        history: productHistory,
        templates: templates,
        configuration: configuration
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sauvegarde_a4_${new Date().toLocaleDateString().replace(/\//g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAlert("Données sauvegardées !", "success");
}

function restoreData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.queue) {
                    productQueue = data.queue;
                    saveQueue();
                }
                if (data.base) {
                    productBase = data.base;
                    saveBase();
                }
                if (data.history) {
                    productHistory = data.history;
                    saveHistory();
                }
                if (data.templates) {
                    templates = data.templates;
                    saveTemplates();
                }
                if (data.configuration) {
                    configuration = data.configuration;
                    saveConfiguration();
                }
                
                updateAllCounters();
                updateTemplateList();
                showAlert("Données restaurées avec succès !", "success");
            } catch (error) {
                showAlert("Erreur lors de la restauration : " + error.message, "error");
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function enableAutoRestore() {
    showAlert("Fonctionnalité en développement.", "error");
}

function setupDropZone() {
    const dropZone = document.getElementById("dropZone");
    
    dropZone.addEventListener("click", () => {
        document.getElementById("excelFile").click();
    });
    
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--primary-color)";
    });
    
    dropZone.addEventListener("dragleave", () => {
        dropZone.style.borderColor = "var(--border-color)";
    });
    
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--border-color)";
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            document.getElementById("excelFile").files = files;
            importFromExcel({ target: { files: files } });
        }
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        // Ctrl + S : Sauvegarder
        if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            saveData();
        }
        
        // Ctrl + P : Générer PDF
        if (e.ctrlKey && e.key === "p") {
            e.preventDefault();
            generateA4Poster();
        }
    });
}

// ===== MODAL =====
function showModal(title, message) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("modal").classList.add("active");
}

function closeModal() {
    document.getElementById("modal").classList.remove("active");
    modalAction = null;
}

function confirmModalAction() {
    if (modalAction) {
        modalAction();
    }
    closeModal();
}

// ===== ALERTS =====
function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const activeTab = document.querySelector(".tab-content.active");
    const firstSection = activeTab.querySelector(".section");
    
    if (firstSection) {
        firstSection.insertBefore(alert, firstSection.firstChild);
    }
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// ===== INITIALISATION AU CHARGEMENT =====
window.onload = initApp;
