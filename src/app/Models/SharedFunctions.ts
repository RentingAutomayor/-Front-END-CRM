export class SharedFunctions {
    formatNumber(numTmp: string): string {
        let numRev = this.reverseString(numTmp);
        console.log(numRev);
        let numberFormated = this.format(numRev);
        console.log("[numberFormated]" + numberFormated);
        return numberFormated;        
    }

    private reverseString(num: string): string {
        return num.split("").reverse().join("");
    }

    private format(numReverse: string): string {
        let arrayNum = numReverse.split("");
        let numTmp = "";
        let cont = 0;
        for (let i = 0; i < arrayNum.length; i++) {
            cont++;
            if (cont == 3) {
                numTmp += arrayNum[i] + '.';
                cont = 0;
            } else {
                numTmp += arrayNum[i];
            }
        }

        let numFormated = numTmp.split("").reverse();
        if (numFormated[0] == '.') {
            numFormated[0] = '';
        }

        return numFormated.join("");
    }

    validateEmail(email:string):boolean{
        let emailOk:boolean;
        emailOk = false;

        if(email.trim() != ""){
            let expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;           
            console.log("[Email a validar]: "+email);
            if(expr.test(email)){
                emailOk = true;
            }else{
                emailOk = false;
            }
        }else{
            emailOk = false;
        }
       
        return emailOk;
    }

    validateCellphone(cellphone:string):boolean{
        let cellPhoneOk : boolean;
        cellPhoneOk = false;
        console.log("[celular a evaluar]: "+cellphone);
        if(cellphone.toString().trim() != ""){
            if(isNaN(parseInt(cellphone))){
                cellPhoneOk = false;
            }else{
                console.log("[longitud del celular]: "+cellphone.toString().length);
                if(cellphone.toString().length != 10){
                    cellPhoneOk = false;
                }else{
                    cellPhoneOk = true;
                }                
            }
        }else{
            cellPhoneOk = false;
        }

        return cellPhoneOk;
    }

    static prepareDataToCSV(data:any){
        const csvRows = [];     
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(';'));

        for(const row of data){
            const values = headers.map(header => {
                const escaped = (''+row[header]).replace(/"/g,'\\"');
                let valueFormatted = this.formatDataToExport(escaped);
                return `"${valueFormatted}"`;
            });

            //console.log(values.join(';'));
            csvRows.push(values.join(';'));
        }
       
        //console.log(csvRows);
        return csvRows.join('\n');
    }

    static downloadCSVFile(data,fileName){       
        const blob = new Blob([data], {type:'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden','');
        a.setAttribute('href',url);
        const fileNameCsv = fileName+'.csv';
        a.setAttribute('download',fileNameCsv);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    private static  formatDataToExport(info):any{
        var dataFormmated = "";
        dataFormmated = info.toUpperCase();
        dataFormmated = dataFormmated.replace(/Á/g,'A');
        dataFormmated = dataFormmated.replace(/É/g,'E');
        dataFormmated = dataFormmated.replace(/Í/g,'I');
        dataFormmated = dataFormmated.replace(/Ó/g,'O');
        dataFormmated = dataFormmated.replace(/Ú/g,'U');
        dataFormmated = dataFormmated.replace(/Ñ/g,'N');

        if(dataFormmated == "NULL"){
            dataFormmated = "";
        }

        return dataFormmated;
    }
}