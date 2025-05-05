/**
 * Gera matrícula no formato = "YYYYSSNNNNN-TT"
 * Onde:
 *  YYYY = Ano Atual
 *  SS = Semestre Atual (01 or 02)
 *  NNNNN = Número aleatório entre 10000 and 99999
 *  TT = Tipo Sufixo (-01 for professor, -02 for aluno, -03 for adm)
 */
function gerarMatricula(tipo) {
    const now = new Date();
    const year = now.getFullYear();

    // Determina semestre: Jan-Jun = 01, Jul-Dez = 02
    const month = now.getMonth() + 1; // getMonth() é baseado em zero
    const semester = month <= 6 ? "01" : "02";

    // Gera número aleatório entre 10000 e 99999
    const randomNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    // Determina o sufixo com base no tipo
    let suffix = "";
    switch (tipo) {
        case "professor":
            suffix = "-01";
            break;
        case "aluno":
            suffix = "-02";
            break;
        case "adm":
            suffix = "-03";
            break;
        default:
            throw new Error("Tipo inválido. Deve ser 'professor', 'aluno' ou 'adm'.");
    }

    return `${year}${semester}${randomNum}${suffix}`;
}

module.exports = { gerarMatricula };
