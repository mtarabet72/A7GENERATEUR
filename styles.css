/* ===== VARIABLES ===== */
:root {
    --primary-color: #ff9800;
    --primary-dark: #e68a00;
    --secondary-color: #121212;
    --secondary-light: #1e1e1e;
    --text-color: #ffffff;
    --text-secondary: #b3b3b3;
    --border-color: #333333;
    --success-color: #4caf50;
    --error-color: #f44336;
    --accent-red: #ff6600;
    --accent-beige: #F5E6C8;
}

/* ===== RESET ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--secondary-color);
    color: var(--text-color);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    line-height: 1.6;
    overflow-x: hidden;
}

/* ===== HEADER STYLE A7 ===== */
.header {
    background-color: var(--secondary-light);
    padding: 15px 30px;
    border-bottom: 3px solid var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.header-logo {
    display: flex;
    align-items: center;
    gap: 15px;
}

.logo-icon {
    font-size: 40px;
}

.header h1 {
    color: var(--text-color);
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    letter-spacing: 2px;
}

.header p {
    color: var(--text-secondary);
    font-size: 12px;
    margin: 0;
}

.header-status {
    display: flex;
    gap: 15px;
    align-items: center;
}

.status-button {
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    transition: all 0.3s;
}

.status-button:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
}

.status-indicator {
    background-color: var(--accent-red);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
}

/* ===== TABS STYLE A7 ===== */
.tabs {
    display: flex;
    background-color: var(--secondary-color);
    border-bottom: 2px solid var(--border-color);
    overflow-x: auto;
}

.tab-button {
    padding: 15px 25px;
    background-color: transparent;
    color: var(--text-secondary);
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    transition: all 0.3s;
    text-transform: uppercase;
    position: relative;
    white-space: nowrap;
}

.tab-button:hover {
    color: var(--primary-color);
    background-color: rgba(255, 152, 0, 0.1);
}

.tab-button.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
    background-color: rgba(255, 152, 0, 0.05);
}

.tab-button .badge {
    background-color: var(--accent-red);
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
    margin-left: 5px;
}

/* ===== CONTAINER ===== */
.container {
    max-width: 100%;
    height: calc(100vh - 140px);
    overflow: hidden;
}

.tab-content {
    display: none;
    height: 100%;
    animation: fadeIn 0.3s;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* ===== SAISIE LAYOUT (2 COLONNES) ===== */
.saisie-container {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 0;
    height: 100%;
}

.saisie-form {
    background-color: var(--secondary-light);
    overflow-y: auto;
    padding: 20px;
    border-right: 2px solid var(--border-color);
}

.saisie-preview {
    background-color: var(--secondary-color);
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--border-color);
}

.preview-header h2 {
    color: var(--primary-color);
    font-size: 18px;
    margin: 0;
}

/* ===== SECTIONS STYLE A7 ===== */
.section {
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid var(--border-color);
}

.section-title {
    color: var(--text-secondary);
    font-size: 11px;
    margin-bottom: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
}

/* ===== INPUTS STYLE A7 ===== */
.input-hint {
    color: var(--text-secondary);
    font-size: 12px;
    margin-bottom: 8px;
    font-style: italic;
    direction: rtl;
}

.input-with-scan {
    display: flex;
    gap: 10px;
}

.input-with-scan input {
    flex: 1;
}

.scan-button {
    background-color: var(--border-color);
    color: var(--text-color);
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s;
}

.scan-button:hover {
    background-color: var(--primary-color);
}

input[type="text"],
input[type="number"],
select,
textarea {
    width: 100%;
    padding: 12px;
    background-color: var(--secondary-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
}

input::placeholder {
    color: var(--text-secondary);
}

/* ===== COLOR INPUTS ===== */
.color-inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 10px;
}

.color-inputs .form-group {
    margin: 0;
}

.color-inputs label {
    display: block;
    font-size: 10px;
    color: var(--text-secondary);
    margin-bottom: 5px;
    text-transform: uppercase;
    font-weight: bold;
}

input[type="color"] {
    width: 100%;
    height: 40px;
    padding: 0;
    border: 2px solid var(--border-color);
    cursor: pointer;
    border-radius: 4px;
}

.color-buttons,
.save-buttons {
    display: flex;
    gap: 10px;
}

/* ===== BUTTONS STYLE A7 ===== */
.button,
.button-secondary,
.button-main,
.button-danger {
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.button {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.button:hover {
    background-color: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 152, 0, 0.4);
}

.button-secondary {
    background-color: var(--border-color);
    color: var(--text-color);
}

.button-secondary:hover {
    background-color: #444444;
}

.button-main {
    width: 100%;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    padding: 16px;
    font-size: 15px;
    margin: 20px 0;
}

.button-main:hover {
    background-color: var(--primary-dark);
    box-shadow: 0 6px 12px rgba(255, 152, 0, 0.4);
    transform: translateY(-2px);
}

.button-danger {
    background-color: var(--error-color);
    color: var(--text-color);
}

.button-danger:hover {
    background-color: #d32f2f;
}

/* ===== IMPORT SECTION ===== */
.import-section {
    margin-top: 20px;
}

.drop-zone {
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
}

.drop-zone:hover {
    border-color: var(--primary-color);
    background-color: rgba(255, 152, 0, 0.05);
}

.drop-zone p {
    color: var(--text-secondary);
    font-size: 14px;
    margin: 0;
}

/* ===== PREVIEW STYLE ===== */
.preview-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 20px;
}

.preview {
    width: 210mm;
    height: 297mm;
    background-color: #000000;
    border: 2px solid var(--border-color);
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
    transform-origin: top center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-placeholder {
    color: #333333;
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
}

/* ===== QUEUE LIST ===== */
.queue-list,
.base-list,
.history-list {
    margin-top: 20px;
}

.queue-item,
.base-item,
.history-item {
    background-color: var(--secondary-light);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
}

.queue-item:hover,
.base-item:hover,
.history-item:hover {
    border-color: var(--primary-color);
    background-color: rgba(255, 152, 0, 0.05);
}

.item-info {
    flex: 1;
}

.item-code {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
}

.item-details {
    color: var(--text-secondary);
    font-size: 13px;
}

.item-actions {
    display: flex;
    gap: 10px;
}

.item-actions button {
    padding: 8px 12px;
    font-size: 12px;
}

.empty-message {
    text-align: center;
    color: var(--text-secondary);
    padding: 40px;
    font-size: 14px;
}

/* ===== TOOLBAR ===== */
.file-toolbar,
.base-toolbar,
.history-toolbar,
.template-toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

/* ===== TEMPLATE LIST ===== */
.template-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 10px;
    background-color: var(--secondary-color);
}

.template-item {
    padding: 12px;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 4px;
    margin-bottom: 5px;
}

.template-item:hover {
    background-color: rgba(255, 152, 0, 0.1);
}

.template-item.active {
    background-color: rgba(255, 152, 0, 0.2);
    border-color: var(--primary-color);
}

/* ===== POSITION GROUP ===== */
.position-group {
    margin-bottom: 15px;
}

.position-group label {
    display: block;
    color: var(--text-secondary);
    font-size: 12px;
    margin-bottom: 8px;
    font-weight: bold;
}

/* ===== GRID LAYOUTS ===== */
.grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

/* ===== MODAL ===== */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.modal.active {
    display: flex;
}

.modal-content {
    background-color: var(--secondary-light);
    padding: 30px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    border: 2px solid var(--primary-color);
}

.modal-content h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 20px;
}

.modal-content p {
    margin-bottom: 20px;
    color: var(--text-color);
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

/* ===== ALERTS ===== */
.alert {
    padding: 12px 20px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-size: 14px;
    animation: slideIn 0.3s;
}

@keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.alert-success {
    background-color: rgba(76, 175, 80, 0.2);
    color: var(--success-color);
    border: 1px solid var(--success-color);
}

.alert-error {
    background-color: rgba(244, 67, 54, 0.2);
    color: var(--error-color);
    border: 1px solid var(--error-color);
}

/* ===== AIDE CONTENT ===== */
.aide-content {
    line-height: 1.8;
}

.aide-content h3 {
    color: var(--primary-color);
    margin: 20px 0 10px;
}

.aide-content ul {
    margin-left: 20px;
}

.aide-content li {
    margin-bottom: 10px;
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: var(--secondary-color);
}

::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1400px) {
    .saisie-container {
        grid-template-columns: 380px 1fr;
    }
}

@media (max-width: 1200px) {
    .saisie-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }
    
    .saisie-form {
        border-right: none;
        border-bottom: 2px solid var(--border-color);
        max-height: 50vh;
    }
    
    .preview {
        transform: scale(0.6);
    }
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 15px;
        padding: 15px;
    }
    
    .header-status {
        width: 100%;
        justify-content: space-between;
    }
    
    .grid-2,
    .grid-3 {
        grid-template-columns: 1fr;
    }
    
    .color-inputs {
        grid-template-columns: 1fr;
    }
    
    .preview {
        transform: scale(0.4);
    }
}
