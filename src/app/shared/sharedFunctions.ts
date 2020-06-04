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
}