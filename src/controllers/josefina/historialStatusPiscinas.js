const net = require('net');
const readline = require('readline');
const { arregloTagsStatusPiscinasFJOS } = require('../../helpers/arregloTags');
const HistorialPS = require('../../models/historialPS')


const historialPSFJOS = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));

    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsStatusPiscinasFJOS()}},"ClientCookie":"myReadTagRequest1"}\n`;
            client.write(tagReadCommand);

            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if(ex.QualityCode == 192) {
                            piscina = new HistorialPS({
                                date: fechaActualUTC.getTime(),
                                finca: ex.Name.slice(0, 7),
                                piscina: ex.Name.slice(14, 17), 
                                estado: ex.Value == 0 ? 'APAGADO' : 'ENCENDIDO'
                            });
                            await piscina.save();

                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
