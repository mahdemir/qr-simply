const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Generate QR code
const generateQRCode = (url, size, colorCode, colorBg) => {
    const qrcode = new QRCode('qrcode', {
      text: url,
      width: size,
      height: size,
      colorDark: colorCode,
      colorLight: colorBg
    });
  };

  // Clear QR code and save button
  const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-link');
    if (saveBtn) {
      saveBtn.remove();
    }
  };
  
  // Show spinner
  const showSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
  };
  
  // Hide spinner
  const hideSpinner = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
  };
  
  // Create save button to download QR code as image
  const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList =
      'bg-blue-500 rounded w-1/3 m-auto text-white py-3 px-4 mt-5 hover:bg-blue-800';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
  };

// When submit button pressed
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  let colorCode = document.getElementById('colorCode').value
  let colorBg = document.getElementById('colorBg').value
  
  // Validate url
  if (url === '') {
    alert('Please enter a URL or Text');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size, colorCode, colorBg);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

hideSpinner();

// Listen to submit button
form.addEventListener('submit', onGenerateSubmit);
