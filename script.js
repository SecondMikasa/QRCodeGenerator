const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

const onGenerateSubmit = (e) => {
    e.preventDefault()

    clearUI()

    const url = document.getElementById('url').value
    const size = document.getElementById('size').value

    //console.log(url, size)

    if (url === '') {
        alert("Please enter a URL")
    } else {
        showSpinner()
        setTimeout(() => {
            hideSpinner()
            generateQRCode(url, size)

            //Waiting for the url to be generated
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src
                createSaveBtn(saveUrl)
            }, 100)
            
        }, 1000)
        
    }
}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size
    })
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block'
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none'
}

const clearUI = () => {
    qr.innerHTML = ''
    const saveBtn = document.getElementById('save-link')
    if (saveBtn) {
        saveBtn.remove()
    }
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a')
    link.id = 'save-link'
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold rounded py-2 w-1/3 m-auto my-5'
    link.href = saveUrl
    link.download = 'qrcode'
    link.innerHTML = 'Download Image'
    document.getElementById('generated-qr').appendChild(link)
}

hideSpinner()

form.addEventListener('submit', onGenerateSubmit)