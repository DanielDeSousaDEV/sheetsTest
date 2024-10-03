let form = document.querySelector('form')
let resultDiv = document.querySelector('result')

/**
 * @type(import("xlsx").IUtils)
 */
XLSX.utils

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    let form = event.target

    let fileInput = form.querySelector('input')

    let reader = new FileReader()
    
    reader.onload = (e)=>{
        let data = new Uint8Array(e.target.result)

        /**
         * @type(import("xlsx").IWorkBook)
         */
        let wbUser = XLSX.read(data, {
            type: 'array'
        })

        let sheetName = wbUser.SheetNames[0]

        /**
         * @type(import("xlsx").IWorkSheet)
         */
        let sheet1 = wbUser.Sheets[sheetName]

        let userJsonData = XLSX.utils.sheet_to_json(sheet1)
        
        console.log(userJsonData)

        displayData(sheet1)
        

        //nos recebemos que dados do evalbee?
        //  o item que o aluno marcou
        //  as questões que o aluno acertou

        // XLSX.writeFile(wbUser, "VaiDarCerto.xlsx")
    }
    
    reader.readAsArrayBuffer(fileInput.files[0])
})

/**
 * 
 * @param {import("xlsx").IWorkSheet} Sheet 
 */
function displayData(Sheet){
    let htmlTable = XLSX.utils.sheet_to_html(Sheet)
    console.log(htmlTable);
    
    resultDiv.innerHTML = htmlTable
}