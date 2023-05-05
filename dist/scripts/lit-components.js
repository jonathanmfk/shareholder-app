// Import here your LitElement components (non critical for starting up)

window.loadCellsPage = page => {
if (page==='detail') { return import('../pages/detail-page/detail-page.js'); };
}